# OK Trainer

Česká verze je zde: https://github.com/Dushino/OK-Trainer/blob/main/README-CZ.md

Application: https://dushino.github.io/OK-Trainer/

A flashcard study app: each card shows a question, you answer it in your head (or out loud), flip the card to check whether you were right, and mark whether you knew the answer or not. The app remembers your statistics and shows you the questions you struggle with more often in the next round. This leads to efficient learning.

## Loading flashcards

OK-Trainer doesn't come with fixed content built in — it's a generic engine. On first launch it loads a small built-in tutorial set so you can try it out immediately, but for real studying you import your own flashcard file (a `.json` file) using the import button at the top of the app. You can import several different sets and switch between them at any time; each set keeps its own, separate statistics.

See `FORMAT.md` for the exact file structure if you want to create your own set.

### Spelling alphabet and settings

A spelling alphabet is a separate `.json` file that maps letters and digits to
words used for speech output, for example `A` → `Alpha` or `0` → `Zero`. An
English ITU/NATO alphabet is built in; the Czech file is in the
`SpellingAlphabets` folder. You can import your own alphabet in the same way as
a flashcard set.

Open the settings page by clicking the `⋮` button in the top right. On the
**Settings** page:

1. Under **Spelling alphabet**, open the selector and choose the alphabet you
  want to use.
2. To add your own alphabet, click the import button (`📥`) next to the selector
  and choose its `.json` file.
3. The newly imported alphabet is selected immediately. Click `←` to return to
  the main page.

The selected alphabet is used in handsfree mode for answers whose card has
`"spellBack": true`. This field belongs directly on the card and applies only
to the text in its `back`. In that text, consecutive runs of uppercase letters,
digits, hyphens, and a possible question mark are spelled out character by
character (for example `OK2ABC`, `DA-DR`, `73`, or `QRV?`) using the currently
selected alphabet. Ordinary text outside those runs is read in the deck's language.

Without `spellBack`, ordinary answers are read normally; longer runs of
uppercase letters are automatically changed to letter-by-letter speech, but a
spelling alphabet is not used. To make an answer use words such as "Alpha" or
"Adam", set `spellBack` to `true`. The exact alphabet file format and examples
are in `FORMAT.md`.

## How studying works

1. The app shows the front of a card (the question).
2. You think of — or say — the answer.
3. You flip the card and check it against the correct answer on the back.
4. You mark the card as **known** or **not known**. The app keeps track of this so it can show you the cards you struggle with more often.

## Spaced repetition (the Leitner system)

Behind the scenes, OK Trainer uses the [Leitner system](https://en.wikipedia.org/wiki/Leitner_system) — a well-known spaced-repetition method — to decide how often you see each card. Every card sits in one of **5 boxes**. Answering correctly moves it up a box, so you see it less often; answering **incorrectly sends it straight back to box 1**, no matter how far it had progressed. This keeps the cards you struggle with in front of you far more often than the ones you already know well.

Within a round, the app also makes sure the same card never appears twice in a row whenever that's avoidable, even though cards from lower boxes are mixed in more often overall.

## Topics and subtopics

It's a good idea to group questions into topic areas, which can be further split into subareas. This makes it much easier to study a large body of material — you can focus on one subarea at a time instead of being overwhelmed by the whole set.

## Reading the progress indicators

Next to each area and subarea you'll see **5 small bars**, one per Leitner box. Each bar's height shows what share of that area's or subarea's cards currently sit in that box — the leftmost (red) bar is box 1, the rightmost (green) bar is box 5. A tall bar on the right means most cards there are well learned; a tall bar on the left means most still need work. All 5 bars are always shown, even for an empty box, so you can see the full spread at a glance.

For areas defined with a pass/fail exam minimum (see `maxErrors` in `FORMAT.md`), a colored dot next to the area name gives you a quick read on exam readiness: it's a fixed red below the minimum, and fades from orange to green above it, the same way the bars are colored. The dot's color is driven by a single number — the average box position across all of that area's cards, converted to a 0–100% scale (box 1 = 0%, box 5 = 100%) — read roughly as your current chance of answering a random question from that area correctly on the first try. Areas without a defined exam minimum don't show a dot.

## Interface language

The app's interface (buttons, hints, messages) defaults to English and works that way without downloading anything. If you'd prefer a different language, you can import a language pack the same way you import a flashcard set — a Czech pack is included in the `Languages` folder. Switching the interface language doesn't affect the language of your flashcard content or of the handsfree voice, which are tied to whichever flashcard set you're using.

## Data storage and privacy

The app doesn't use any external storage or server to save your data. All statistics and progress are kept locally, in your browser's storage on the device you're using. This means:

- Nothing is uploaded anywhere.
- If you use the app from a different browser or a different device, your statistics won't be there — progress isn't synced between browsers or devices.

## Installing on your phone

The app can be "installed" on your phone as a quick-access icon, either as an app-like shortcut in your app list or as a home screen shortcut. This isn't a real binary installation — it's just a bookmark-style shortcut with an icon that opens the same web page, giving you faster access. And it works offline too.

### Android (Google Chrome)

1. Open Google Chrome on your phone.
2. Go to <https://dushino.github.io/OK-Trainer/>.
3. Tap the three-dot icon at the top right, next to the address bar.
4. In the menu, choose **Add to Home screen**, then **Create shortcut** (or **Add**).
5. Confirm the name and finish by tapping **Add**.

### Apple devices

The process is similar on iOS/Safari — look for the equivalent "Add to Home Screen" option in the share menu.

### Bookmarking

Alternatively, you can simply bookmark the page in your browser. This works the same way across all browsers and operating systems.

## Fully offline use

If you'd rather not rely on a live internet connection every time, you can download all the files from <https://github.com/Dushino/OK-Trainer> to your phone or computer (this step requires a connection) and then open the downloaded html file with your file manager in a browser (no connection needed after that).

## Handsfree mode

The app can also be used without directly interacting with your phone, via a Bluetooth handsfree. It uses speech synthesis (TTS) on the phone to read each card aloud, and is controlled with your media buttons:

- While the question is shown:
- **Next track** flips the card and reads the answer aloud.
- **Previous track** (while the question side is showing) reads the question again.
- After the answer has been read:
  - **Next track** confirms you knew the answer.
  - **Previous track** confirms you didn't know it.
- Once you finish a set of cards, the app intelligently moves on: if you were studying a single subarea, it moves to the next subarea; if you were studying a whole area, it moves to the next whole area.

Some phone/desktop TTS engines read a word written in ALL CAPS as if it were one (mispronounced) word instead of spelling it out — noticeable on abbreviations like "HAREC". The app always spells such words out letter by letter to avoid that. For decks that flag specific answers as `spellBack` (see `FORMAT.md`), such as call sign prefixes, the app instead spells them out using a dedicated **spelling alphabet** — a letter/digit → spoken-word table (e.g. "A" → "Alpha") that you can pick independently of both the interface language and the deck's own language, the same way you pick a language pack. A short international (ITU/NATO) English one is built in; a Czech one is included in the `SpellingAlphabets` folder and can be imported the same way as a flashcard set.

## Things to know

- The app doesn't account for forgetting. That's both individual and beyond the scope of a simple HTML page — it would need to be a full-fledged application. So even if everything is green a few weeks before the exam, that doesn't mean you won't forget something by test day. The solution is regular review.
- The number of cards in a study round is dynamic. When you know a topic well, each card appears just once; if you know all of them, each appears once again next time. If you don't know them, the next round will have more cards because the problematic ones appear more frequently.
- **If the app behaves strangely, delete and then re-import freshly downloaded files, or alternatively uninstall and reinstall the entire app. This is because I sometimes make improvements, and the app might not be compatible with your saved JSON files.**

> **Always put your own safety and the safety of those around you first. Do not use this while driving!**
