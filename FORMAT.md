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
| `areas[].maxErrors` | no | Enables the pass/fail progress bar color for this area. See [Pass/fail indicator](#passfail-indicator-optional) below. |
| `areas[].subareas` | yes | Array of subareas for the given area. Max. **1000 subareas** per area (again just a memory safety cap). |
| `subareas[].name` | yes | Name of the subarea (shown in the dropdown selector). |
| `subareas[].cards` | yes | Array of cards for the given subarea. At least 1 card. |
| `cards[].front` | yes | Text of the front side (question). |
| `cards[].back` | yes | Text of the back side (answer). |

## Pass/fail indicator (optional)

For decks that prepare you for a real exam, `areas[].maxErrors` lets the
area's progress bar warn you when you're not yet ready, instead of just
showing a plain 0–100% gradient.

`maxErrors` is the same **absolute number of wrong answers the real exam
allows** for that subject (e.g. an exam that requires 16 correct out of 20
questions allows `maxErrors: 4`). The app applies that same absolute error
budget to *all* the cards currently in the area — not just to the smaller
number of questions the real exam draws. Since a deck is typically a much
larger question pool than a single real exam, this makes the training
threshold considerably stricter than the real exam's pass percentage: even
if the exam happens to draw mostly the questions you personally find hard,
you can still be confident you'd pass.

Concretely, the app computes a pass threshold as a percentage:

```text
thresholdPct = (1 − maxErrors / totalCardsInArea) × 100
```

`totalCardsInArea` (all cards across all of the area's subareas) is counted
by the app itself — you don't need to supply it. Below `thresholdPct` the
area's progress bar is a fixed red, regardless of how close you are. At or
above it, the bar fades from orange (right at the threshold) to green (at
100%), same as the default gradient used for areas without `maxErrors`.

Subarea progress bars never use this red/orange/green coloring, even inside
an area that has `maxErrors` — the real exam's minimum applies to the whole
subject, not to any individual subarea, so coloring a subarea bar by score
would suggest a pass/fail criterion that doesn't actually exist for it. Only
the bar's length (the % itself) reflects a subarea's success rate.

Omit `maxErrors` to keep the old behavior (plain gradient, no threshold) —
this is the default for decks that aren't simulating a graded exam.

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
