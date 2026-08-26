# File Format for OK Trainer

OK Trainer doesn't come with any questions built in — all decks are loaded
into the app by importing a `.json` file via the 📥 button at the top. The
app stores the content in the browser, so it stays available offline too.

The built-in `tutorial.json` deck (shown in the app as "Tutorial") also
serves as a live example of this structure — the easiest approach is to
copy it and adapt it.

## Structure

```json
{
  "shortName": "Short name",
  "longName": "Longer descriptive name shown in the app header",
  "language": "en-US",
  "areas": [
    {
      "name": "Area name",
      "maxErrors": 4,
      "subareas": [
        {
          "name": "Subarea name",
          "cards": [
            { "front": "Question text / front side of the card", "back": "Answer text / back side of the card" }
          ]
        }
      ]
    }
  ]
}
```

## Fields

| Field | Required | Description |
|---|---|---|
| `shortName` | yes | Short name of the deck. **It also acts as a unique identifier** — the app uses it to recognize whether a re-imported file is "the same" deck (and, if so, offers to overwrite it, resetting its statistics). Don't use the same `shortName` for two different decks. |
| `longName` | yes | Longer descriptive name, shown in the app header below "OK TRAINER". |
| `language` | yes | Language code for text-to-speech (TTS) in hands-free mode, e.g. `cs-CZ`, `en-US`, `de-DE`. |
| `areas` | yes | Array of areas. Max. **100 areas** (this is just a safety cap to protect the browser's/phone's memory, not a design constraint). |
| `areas[].name` | yes | Name of the area (shown as a button in the top navigation). |
| `areas[].nameTts` | no | Alternative text used exclusively for the text-to-speech announcement of the area's name in handsfree mode (e.g. when switching areas). If omitted, `name` is used. Can contain `{X}` spelling markers, see [Spelling alphabet files](#spelling-alphabet-files-optional) below. |
| `areas[].maxErrors` | no | Enables the pass/fail dot for this area. See [Pass/fail indicator](#passfail-indicator-optional) below. |
| `areas[].subareas` | yes | Array of subareas for the given area. Max. **1000 subareas** per area (again just a memory safety cap). |
| `subareas[].name` | yes | Name of the subarea (shown in the dropdown selector). |
| `subareas[].nameTts` | no | Same as `areas[].nameTts`, but for the subarea's spoken name. If omitted, `name` is used. |
| `subareas[].cards` | yes | Array of cards for the given subarea. At least 1 card. |
| `cards[].front` | yes | Text of the front side (question). |
| `cards[].back` | yes | Text of the back side (answer). |
| `cards[].frontTts` | no | Alternative text used exclusively for the text-to-speech output of the front side in handsfree mode. If provided, TTS uses it instead of `front`. Useful for formats like "S-metr" that would be mispronounced. Example: `front: "S-metr", frontTts: "S metr"`. Can contain `{X}` spelling markers. |
| `cards[].backTts` | no | Alternative text used exclusively for the text-to-speech output of the back side in handsfree mode. If provided, TTS uses it instead of `back`. Useful for answers that need different pronunciation than their displayed text. Example: `back: "NF", backTts: "NF amplifier"` — silent mode shows "NF", handsfree pronounces "en ef amplifier". Can contain `{X}` spelling markers. |

In silent mode (without handsfree), the original `front` and `back` are always shown and spoken; `frontTts`/`backTts` and the `{X}` markers inside them only affect handsfree mode. Any ALL-CAPS run of 2 or more characters (e.g. an abbreviation like `HAREC`) that isn't wrapped in a `{X}` marker is still automatically read out letter by letter in the deck's own language, as a safety net against TTS engines that would otherwise mispronounce it as one word.

## Spelling alphabet files (optional)

A spelling alphabet is a **separate JSON file**, not another field inside a
flashcard deck file. Independently of flashcard decks, the app can import
**spelling alphabet** files — a letter/digit → spoken-word mapping (e.g.
`A` → `Alpha`, `0` → `Zero`) used in handsfree mode for any text marked with
a `{X}` spelling marker (see below). Import them the same way as a deck, via
the 📥 button next to the spelling alphabet selector. A short built-in
international (ITU/NATO) English one ships with the app; a Czech one is
included in the `SpellingAlphabets` folder.

```json
{
  "spellId": "unique-id",
  "spellName": "Name shown in the selector",
  "lang": "en-US",
  "letters": { "A": "Alpha", "0": "Zero", "-": "to" }
}
```

| Field | Required | Description |
|---|---|---|
| `spellId` | yes | Unique identifier, same role as a deck's `shortName`. |
| `spellName` | yes | Name shown in the selector dropdown. |
| `lang` | yes | Language code (BCP-47) used for TTS when spelling with this alphabet, e.g. `en-US`, `cs-CZ`. |
| `letters` | yes | Object mapping each character to the word spoken for it. Characters missing from the map are read out literally as a single character. |

### Marking text for spelling ({X} markers)

Wrap any span of text in curly braces to have it spelled out letter by
letter, using whichever spelling alphabet is currently selected in the app —
independently of both the interface language and the deck's own `language`.
Markers work in `front`, `back`, `frontTts`, `backTts`, and in
`areas[].nameTts`/`subareas[].nameTts`. For example:

```json
{
  "front": "How is the call sign prefix spelled?",
  "back": "DA-DR",
  "backTts": "{DA-DR}"
}
```

In handsfree mode this reads the marked span character by character using the
currently selected alphabet, for example `{OK2ABC}`, `{DA-DR}`, `{73}`, or
`{QRV?}` (a trailing `?` inside the marker is spelled too, e.g. as "Question
mark", if the alphabet maps it). Text outside `{}` is read normally in the
surrounding language. A marker whose content has no letter or digit (pure
punctuation) is read literally instead of being spelled.

Without a `{X}` marker, ALL-CAPS runs of at least two characters (e.g.
`HAREC`) are still automatically read out letter by letter as a fallback, but
in the deck's own language, without using an imported spelling alphabet. To
get pronunciations from an imported alphabet (`Adam`, `Alpha`, `Božena`, …),
wrap the text in `{}`.

### Alternative text for pronunciation (frontTts and backTts)

If a question or answer contains characters or formats that won't be
pronounced correctly (e.g. hyphens, abbreviations, complex text), provide
alternative text for handsfree mode using `frontTts` and `backTts`:

```json
{
  "front": "S-metr",
  "frontTts": "S metr"
}
```

```json
{
  "front": "Amplifier – type?",
  "back": "NF amplifier",
  "backTts": "en ef amplifier"
}
```

`frontTts` is used instead of `front` in handsfree mode, and `backTts`
instead of `back`. `{X}` markers and the automatic ALL-CAPS fallback are
applied normally to text in these fields. In silent mode (without handsfree)
the original `front` and `back` are always shown and spoken as-is — `frontTts`
and `backTts` only affect handsfree mode.

## Pass/fail indicator (optional)

Every area and subarea always shows its **Leitner box occupancy** as 5
small bars — one per box, height = share of that area's/subarea's cards
currently sitting in that box, colored from red (box 1) to green (box 5).
See the main README for how to read them.

For decks that prepare you for a real exam, `areas[].maxErrors` additionally
turns on a colored **dot** next to the area's name that estimates whether
you'd currently pass. It only applies at the area level — a real exam's
minimum is defined per subject, not per subarea, so subareas never show
this dot, no matter what `maxErrors` the parent area has.

`maxErrors` is the same **absolute number of wrong answers the real exam
allows** for that subject (e.g. an exam that requires 16 correct out of 20
questions allows `maxErrors: 4`). The app applies that same absolute error
budget to *all* the cards currently in the area — not just to the smaller
number of questions the real exam draws. Since a deck is typically a much
larger question pool than a single real exam, this makes the indicator
considerably stricter than the real exam's pass percentage: even if the
exam happens to draw mostly the questions you personally find hard, you can
still be confident you'd pass.

Concretely, the app computes a pass threshold as a percentage:

```text
thresholdPct = (1 − maxErrors / totalCardsInArea) × 100
```

`totalCardsInArea` (all cards across all of the area's subareas) is counted
by the app itself — you don't need to supply it. This threshold is compared
against the area's current score: the average Leitner box position across
all of its cards, converted to a 0–100% scale (box 1 = 0%, box 5 = 100%).
Below the threshold the dot is a fixed red, regardless of how close you
are. At or above it, the dot fades from orange (right at the threshold) to
green (at 100%).

Omit `maxErrors` to skip the dot entirely — this is the default for decks
that aren't simulating a graded exam. The 5-bar box occupancy display is
unaffected either way; it's always shown.

## Example (minimal, 2 areas × 2 subareas × 2 cards)

```json
{
  "shortName": "Sample",
  "longName": "Sample deck with two areas",
  "language": "en-US",
  "areas": [
    {
      "name": "First area",
      "subareas": [
        {
          "name": "First subarea",
          "cards": [
            { "front": "Question 1a", "back": "Answer 1a" },
            { "front": "Question 1b", "back": "Answer 1b" }
          ]
        },
        {
          "name": "Second subarea",
          "cards": [
            { "front": "Question 2a", "back": "Answer 2a" },
            { "front": "Question 2b", "back": "Answer 2b" }
          ]
        }
      ]
    },
    {
      "name": "Second area",
      "subareas": [
        {
          "name": "First subarea",
          "cards": [
            { "front": "Question 3a", "back": "Answer 3a" },
            { "front": "Question 3b", "back": "Answer 3b" }
          ]
        },
        {
          "name": "Second subarea",
          "cards": [
            { "front": "Question 4a", "back": "Answer 4a" },
            { "front": "Question 4b", "back": "Answer 4b" }
          ]
        }
      ]
    }
  ]
}
```

## What happens on import

- **New `shortName`** → the app adds the deck right away and switches to it.
- **Existing `shortName`** → the app asks for confirmation; once confirmed,
  it replaces the content and **resets all statistics stored so far** for
  that deck (the new content may have cards ordered or split differently,
  so the old statistics wouldn't match the new content anyway).
- The built-in "Tutorial" deck cannot be deleted or overwritten.

## Common mistakes when writing by hand

- Missing comma between array items.
- Trailing comma after the last element (unlike JS, JSON doesn't allow this).
- Unclosed quotes or curly braces.

If the imported file is invalid, the app rejects it and clearly states what
exactly is wrong and where — just fix the file according to the message and
try importing again.
