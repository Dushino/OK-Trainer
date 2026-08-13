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
| `areas` | yes | Array of areas. Max. **8 areas**. |
| `areas[].name` | yes | Name of the area (shown as a button in the top navigation). |
| `areas[].subareas` | yes | Array of subareas for the given area. Max. **32 subareas** per area. |
| `subareas[].name` | yes | Name of the subarea (shown in the dropdown selector). |
| `subareas[].cards` | yes | Array of cards for the given subarea. At least 1 card. |
| `cards[].front` | yes | Text of the front side (question). |
| `cards[].back` | yes | Text of the back side (answer). |

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
