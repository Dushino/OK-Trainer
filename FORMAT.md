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
| `areas[].maxErrors` | no | Enables the pass/fail dot for this area. See [Pass/fail indicator](#passfail-indicator-optional) below. |
| `areas[].subareas` | yes | Array of subareas for the given area. Max. **1000 subareas** per area (again just a memory safety cap). |
| `subareas[].name` | yes | Name of the subarea (shown in the dropdown selector). |
| `subareas[].cards` | yes | Array of cards for the given subarea. At least 1 card. |
| `cards[].front` | yes | Text of the front side (question). |
| `cards[].back` | yes | Text of the back side (answer). |
| `cards[].spellBack` | no | If `true`, any ALL-CAPS runs in `back` (e.g. call sign prefixes like `GX`, `DA-DR`) are spelled out letter by letter in handsfree mode, using whichever spelling alphabet is currently selected in the app — independently of both the interface language and this deck's `language`. See [Spelling alphabet files](#spelling-alphabet-files-optional) below. Omit or set to `false` for a normal answer; ALL-CAPS words in it (e.g. an abbreviation like `HAREC`) are still read letter by letter, but in this deck's own language, without needing a separate file. |

## Spelling alphabet files (optional)

A spelling alphabet is a **separate JSON file**, not another field inside a
flashcard deck file. Independently of flashcard decks, the app can import **spelling alphabet**
files — a letter/digit → spoken-word mapping (e.g. `A` → `Alpha`,
`0` → `Zero`) used in handsfree mode for any card with `spellBack: true`.
Import them the same way as a deck, via the 📥 button next to the spelling
alphabet selector. A short built-in international (ITU/NATO) English one
ships with the app; a Czech one is included in the `SpellingAlphabets`
folder.

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
| `letters` | yes | Object mapping each character to the word spoken for it. Characters missing from the map are read out literally as a single character in the surrounding text's language. |

### Marking an answer for spelling

Put `spellBack` **on the individual card**, alongside `front` and `back`, for
example:

```json
{
  "front": "How is the call sign prefix spelled?",
  "back": "DA-DR",
  "spellBack": true
}
```

In handsfree mode, consecutive runs of uppercase letters (including Czech
diacritics), digits, hyphens, and a possible question mark in `back` are then
spelled character by character using the currently selected alphabet, for
example `OK2ABC`, `DA-DR`, `73`, or `QRV?`. All other text in `back` is read in
the deck's language. The field applies only to `back`; it does not spell
`front`.

If `spellBack` is omitted or set to `false`, the spelling alphabet is not used.
Runs of at least two uppercase letters are still changed to letter-by-letter
speech for TTS, such as `HAREC`, but this does not use words from an imported
spelling alphabet. To get pronunciations such as `Adam`, `Alpha`, or `Božena`,
set `spellBack: true`.

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
