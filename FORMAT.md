# Formát souboru pro OK-Trainer

OK-Trainer sám o sobě žádné otázky nezná — všechny sady se do apky nahrávají
importem `.json` souboru přes tlačítko 📥 nahoře. Apka si obsah uloží
v prohlížeči a zůstane dostupný i offline.

Vestavěná sada `tutorial.json` (v apce vidíš jako „Tutoriál") slouží zároveň
jako živá ukázka téhle struktury — nejjednodušší je zkopírovat ji a upravit.

## Struktura

```json
{
  "shortName": "Krátký název",
  "longName": "Delší popisný název zobrazený v záhlaví apky",
  "language": "cs-CZ",
  "areas": [
    {
      "name": "Název oblasti",
      "subareas": [
        {
          "name": "Název podoblasti",
          "cards": [
            { "front": "Text otázky / přední strana kartičky", "back": "Text odpovědi / zadní strana kartičky" }
          ]
        }
      ]
    }
  ]
}
```

## Pole

| Pole | Povinné | Popis |
|---|---|---|
| `shortName` | ano | Krátký název sady. **Zároveň slouží jako jedinečný identifikátor** — apka podle něj pozná, jestli jde o „tu samou" sadu při opětovném importu (a případně nabídne přepsání i s vynulováním statistik). Nepoužívej stejný `shortName` pro dvě různé sady. |
| `longName` | ano | Delší popisný název, zobrazí se v záhlaví apky pod „OK-TRAINER". |
| `language` | ano | Jazykový kód pro hlasové čtení (TTS) v handsfree režimu, např. `cs-CZ`, `en-US`, `de-DE`. |
| `areas` | ano | Pole oblastí. Max. **8 oblastí**. |
| `areas[].name` | ano | Název oblasti (zobrazí se jako tlačítko v horní navigaci). |
| `areas[].subareas` | ano | Pole podoblastí dané oblasti. Max. **32 podoblastí** na oblast. |
| `subareas[].name` | ano | Název podoblasti (zobrazí se v rozbalovacím výběru). |
| `subareas[].cards` | ano | Pole kartiček dané podoblasti. Alespoň 1 kartička. |
| `cards[].front` | ano | Text přední strany (otázka). |
| `cards[].back` | ano | Text zadní strany (odpověď). |

## Příklad (minimální, 2 oblasti × 2 podoblasti × 2 kartičky)

```json
{
  "shortName": "Ukázka",
  "longName": "Ukázková sada se dvěma oblastmi",
  "language": "cs-CZ",
  "areas": [
    {
      "name": "První oblast",
      "subareas": [
        {
          "name": "První podoblast",
          "cards": [
            { "front": "Otázka 1a", "back": "Odpověď 1a" },
            { "front": "Otázka 1b", "back": "Odpověď 1b" }
          ]
        },
        {
          "name": "Druhá podoblast",
          "cards": [
            { "front": "Otázka 2a", "back": "Odpověď 2a" },
            { "front": "Otázka 2b", "back": "Odpověď 2b" }
          ]
        }
      ]
    },
    {
      "name": "Druhá oblast",
      "subareas": [
        {
          "name": "První podoblast",
          "cards": [
            { "front": "Otázka 3a", "back": "Odpověď 3a" },
            { "front": "Otázka 3b", "back": "Odpověď 3b" }
          ]
        },
        {
          "name": "Druhá podoblast",
          "cards": [
            { "front": "Otázka 4a", "back": "Odpověď 4a" },
            { "front": "Otázka 4b", "back": "Odpověď 4b" }
          ]
        }
      ]
    }
  ]
}
```

## Co se stane při importu

- **Nový `shortName`** → apka sadu rovnou přidá a přepne se na ni.
- **Existující `shortName`** → apka se zeptá na potvrzení; po odsouhlasení
  nahradí obsah a **vynuluje všechny dosud uložené statistiky** pro tuto sadu
  (nový obsah může mít jinak seřazené nebo jinak rozdělené kartičky, takže by
  staré statistiky stejně neodpovídaly novému obsahu).
- Vestavěnou sadu „Tutoriál" nejde smazat ani přepsat.

## Časté chyby při ručním psaní

- Chybějící čárka mezi položkami pole.
- Přebytečná čárka za posledním prvkem (JSON to na rozdíl od JS nedovolí).
- Neuzavřené uvozovky nebo složené závorky.

Apka při importu chybný soubor odmítne a napíše srozumitelně, co přesně a
kde je špatně — stačí soubor podle hlášky opravit a zkusit import znovu.
