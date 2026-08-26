# Formát souboru pro OK Trainer

OK Trainer sám o sobě žádné otázky nezná — všechny sady se do apky nahrávají
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
      "maxErrors": 4,
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
| `longName` | ano | Delší popisný název, zobrazí se v záhlaví apky pod „OK TRAINER". |
| `language` | ano | Jazykový kód pro hlasové čtení (TTS) v handsfree režimu, např. `cs-CZ`, `en-US`, `de-DE`. |
| `areas` | ano | Pole oblastí. Max. **100 oblastí** (jde jen o pojistku kvůli paměti prohlížeče/telefonu, ne o návrhové omezení). |
| `areas[].name` | ano | Název oblasti (zobrazí se jako tlačítko v horní navigaci). |
| `areas[].nameTts` | ne | Alternativní text určený výhradně pro hlasové oznámení názvu oblasti v handsfree režimu (např. při přepnutí oblasti). Když pole vynecháš, použije se `name`. Může obsahovat značky `{X}` pro hláskování, viz [Soubory hláskovací abecedy](#soubory-hláskovací-abecedy-volitelné) níže. |
| `areas[].maxErrors` | ne | Zapíná barevnou tečku indikující splnění zkušebního minima u této oblasti. Viz [Indikace úspěšnosti zkoušky](#indikace-úspěšnosti-zkoušky-volitelné) níže. |
| `areas[].subareas` | ano | Pole podoblastí dané oblasti. Max. **1000 podoblastí** na oblast (opět jen pojistka kvůli paměti). |
| `subareas[].name` | ano | Název podoblasti (zobrazí se v rozbalovacím výběru). |
| `subareas[].nameTts` | ne | Stejné jako `areas[].nameTts`, ale pro vyslovovaný název podoblasti. Když pole vynecháš, použije se `name`. |
| `subareas[].cards` | ano | Pole kartiček dané podoblasti. Alespoň 1 kartička. |
| `cards[].front` | ano | Text přední strany (otázka). |
| `cards[].back` | ano | Text zadní strany (odpověď). |
| `cards[].frontTts` | ne | Alternativní text určený výhradně pro hlasový výstup přední strany kartičky v handsfree režimu. Pokud je uveden, TTS ho použije místo `front`. Užitečné pro formáty jako „S-metr", které by se nesprávně vyslovily. Příklad: `front: "S-metr", frontTts: "S metr"`. Může obsahovat značky `{X}` pro hláskování. |
| `cards[].backTts` | ne | Alternativní text určený výhradně pro hlasový výstup zadní strany kartičky v handsfree režimu. Pokud je uveden, TTS ho použije místo `back`. Užitečné pro odpovědi, které potřebují jinou výslovnost než zobrazený text. Příklad: `back: "NF", backTts: "NF zesilovač"` — v tichém režimu se zobrazí „NF", v handsfree se vysloví „en ef zesilovač". Může obsahovat značky `{X}` pro hláskování. |

V tichém režimu (bez handsfree) se vždy zobrazuje a hlasitě čte původní `front` a `back`; `frontTts`/`backTts` a značky `{X}` v nich ovlivňují jen handsfree režim. Úsek psaný celými velkými písmeny o délce alespoň 2 znaky (např. zkratka `HAREC`), který není obalený značkou `{X}`, se i tak automaticky přečte písmeno po písmenu jazykem sady — jako pojistka proti TTS enginům, které by ho jinak vyslovily jako jedno (špatně vyslovené) slovo.

## Soubory hláskovací abecedy (volitelné)

Hláskovací abeceda je **samostatný JSON soubor**, nikoli další pole v souboru
sady kartiček. Nezávisle na sadách kartiček umí apka importovat
**hláskovací abecedy** —
mapování písmeno/číslice → vyslovované slovo (např. `A` → `Adam`,
`0` → `nula`), použité v handsfree režimu u textu označeného značkou `{X}`
(viz níže). Importují se stejně jako sada, přes tlačítko 📥 vedle
výběru hláskovací abecedy. S apkou je rovnou vestavěná krátká mezinárodní
(ITU/NATO) anglická tabulka; česká je přiložená ve složce
`SpellingAlphabets`.

```json
{
  "spellId": "jedinečné-id",
  "spellName": "Název v seznamu výběru",
  "lang": "cs-CZ",
  "letters": { "A": "Adam", "0": "nula", "-": "až" }
}
```

| Pole | Povinné | Popis |
|---|---|---|
| `spellId` | ano | Jedinečný identifikátor, stejná role jako `shortName` u sady. |
| `spellName` | ano | Název zobrazený ve výběru. |
| `lang` | ano | Jazykový kód (BCP-47) použitý pro TTS při hláskování touto abecedou, např. `en-US`, `cs-CZ`. |
| `letters` | ano | Objekt mapující každý znak na slovo, které se za něj vysloví. Znaky chybějící v mapě se přečtou doslova jako jeden znak. |

### Označení textu pro hláskování (značky {X})

Libovolný úsek textu obal do složených závorek, aby se v handsfree režimu
přehláskoval písmeno po písmenu pomocí aktuálně vybrané hláskovací abecedy v
apce — nezávisle na jazyce rozhraní i na `language` téhle sady. Značky
fungují v `front`, `back`, `frontTts`, `backTts` i v `areas[].nameTts`/
`subareas[].nameTts`. Například:

```json
{
  "front": "Jak se hláskuje volací prefix?",
  "back": "DA-DR",
  "backTts": "{DA-DR}"
}
```

V handsfree režimu se pak označený úsek přehláskuje znak po znaku podle
aktuálně vybrané abecedy, například `{OK2ABC}`, `{DA-DR}`, `{73}` nebo
`{QRV?}` (otazník na konci značky se přehláskuje taky, např. jako „Otazník",
pokud ho abeceda mapuje). Text mimo `{}` se čte normálně jazykem okolního
textu. Značka, jejíž obsah neobsahuje žádné písmeno ani číslici (čistá
interpunkce), se místo hláskování přečte doslova.

Bez značky `{X}` se úseky alespoň dvou velkých písmen (např. `HAREC`) přesto
automaticky přečtou po jednotlivých písmenech jako pojistka, ale jazykem
sady, bez použití importované hláskovací abecedy. Pro výslovnost z
importované abecedy (`Adam`, `Alpha`, `Božena`, …) obal text do `{}`.

### Alternativní text pro výslovnost (frontTts a backTts)

Pokud otázka nebo odpověď obsahuje znaky či formáty, které se nebudou
vyslovovat správně (např. pomlčky, zkratky, složitější texty), uveď
alternativní text pro handsfree režim pomocí `frontTts` a `backTts`:

```json
{
  "front": "S-metr",
  "frontTts": "S metr"
}
```

```json
{
  "front": "Zesilovač – druh?",
  "back": "NF zesilovač",
  "backTts": "en ef zesilovač"
}
```

Pole `frontTts` se používá místo `front` v handsfree režimu, `backTts` místo
`back`. Značky `{X}` i automatická pojistka pro ALL-CAPS úseky se na text v
těchto polích aplikují normálně. V tichém režimu (bez handsfree) se vždy
zobrazuje a hlasitě čte původní `front` a `back` — `frontTts` a `backTts`
ovlivňují jen handsfree režim.

## Indikace úspěšnosti zkoušky (volitelné)

Každá oblast i podoblast vždy zobrazuje **obsazení Leitnerových boxů** jako
5 malých sloupečků — jeden za box, výška = podíl kartiček dané oblasti či
podoblasti, které jsou právě v tom boxu, barva od červené (box 1) po
zelenou (box 5). Jak je číst je popsáno v hlavním README.

U sad, které připravují na reálnou zkoušku, navíc `areas[].maxErrors`
zapíná barevnou **tečku** vedle názvu oblasti, která odhaduje, jestli bys
teď zkouškou prošel. Platí to jen na úrovni oblasti — minimum reálné
zkoušky je definované za celý předmět, ne za podoblast, takže podoblasti
tuhle tečku nikdy nezobrazují, bez ohledu na to, jaký `maxErrors` má
rodičovská oblast.

`maxErrors` je stejný **absolutní počet chyb, který povoluje reálná
zkouška** pro daný předmět (např. zkouška vyžadující 16 správných z 20
otázek povoluje `maxErrors: 4`). Appka tenhle stejný absolutní počet
povolených chyb uplatní na *všechny* kartičky, které jsou aktuálně v dané
oblasti — ne jen na menší počet otázek, které si vytáhne reálná zkouška.
Protože sada bývá mnohem větší zásobník otázek než jedna konkrétní
zkouška, je tím pádem indikátor podstatně přísnější než procento potřebné
k reálnému složení zkoušky: i kdyby si zkouška vytáhla zrovna většinou
otázky, které ti osobně dělají potíže, můžeš si být jistý, že bys u
zkoušky uspěl.

Konkrétně appka spočítá práh úspěšnosti jako procento:

```text
thresholdPct = (1 − maxErrors / početKaretVOblasti) × 100
```

Počet karet v oblasti (napříč všemi jejími podoblastmi) si appka spočítá
sama — nemusíš ho nikam zapisovat. Tenhle práh se porovnává s aktuálním
skóre oblasti: průměrnou pozicí Leitnerova boxu napříč všemi jejími
kartičkami, převedenou na škálu 0–100 % (box 1 = 0 %, box 5 = 100 %). Pod
prahem je tečka pevně červená, bez ohledu na to, jak blízko prahu jsi. Na
prahu a nad ním tečka plynule přechází z oranžové (přesně na prahu) do
zelené (při 100 %).

Když `maxErrors` vynecháš, tečka se prostě nezobrazí — to je výchozí stav
pro sady, které žádnou hodnocenou zkoušku nesimulují. Zobrazení 5
sloupečků obsazení boxů tím není nijak ovlivněné, to appka ukazuje vždy.

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
