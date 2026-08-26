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
| `areas[].maxErrors` | ne | Zapíná barevnou tečku indikující splnění zkušebního minima u této oblasti. Viz [Indikace úspěšnosti zkoušky](#indikace-úspěšnosti-zkoušky-volitelné) níže. |
| `areas[].subareas` | ano | Pole podoblastí dané oblasti. Max. **1000 podoblastí** na oblast (opět jen pojistka kvůli paměti). |
| `subareas[].name` | ano | Název podoblasti (zobrazí se v rozbalovacím výběru). |
| `subareas[].cards` | ano | Pole kartiček dané podoblasti. Alespoň 1 kartička. |
| `cards[].front` | ano | Text přední strany (otázka). |
| `cards[].back` | ano | Text zadní strany (odpověď). |
| `cards[].spellBack` | ne | Pokud je `true`, úseky psané celými velkými písmeny v `back` (např. prefixy volacích značek typu `GX`, `DA-DR`) se v handsfree režimu přehláskují písmeno po písmenu pomocí aktuálně vybrané hláskovací abecedy v apce — nezávisle na jazyce rozhraní i na `language` téhle sady. Viz [Soubory hláskovací abecedy](#soubory-hláskovací-abecedy-volitelné) níže. Když pole vynecháš nebo je `false`, jde o běžnou odpověď; ALL-CAPS slova v ní (např. zkratka `HAREC`) se přesto čtou písmeno po písmenu, ale jazykem téhle sady, bez potřeby zvláštního souboru. |
| `cards[].speakFront` | ne | Alternativní text určený výhradně pro hlasový výstup přední strany kartičky v handsfree režimu. Pokud je uveden, TTS ho použije místo `front`. Všechny stávající úpravy (automatické hláskování velkých písmen, ověřování syntaxe) se aplikují normálně. Užitečné pro formáty jako „S-metr", které by se nesprávně vyslovily. Příklad: `front: "S-metr", speakFront: "S metr"`. |
| `cards[].speakBack` | ne | Alternativní text určený výhradně pro hlasový výstup zadní strany kartičky v handsfree režimu. Pokud je uveden, TTS ho použije místo `back`. Všechny stávající úpravy (mechanika spellBack, automatické hláskování, tečkovaný zápis) se aplikují normálně. Užitečné pro odpovědi, které potřebují jinou výslovnost než zobrazený text. Příklad: `back: "NF", speakBack: "NF zesilovač"` — v tichém režimu se zobrazí „NF", v handsfree se vysloví „en ef zesilovač". |

## Soubory hláskovací abecedy (volitelné)

Hláskovací abeceda je **samostatný JSON soubor**, nikoli další pole v souboru
sady kartiček. Nezávisle na sadách kartiček umí apka importovat
**hláskovací abecedy** —
mapování písmeno/číslice → vyslovované slovo (např. `A` → `Adam`,
`0` → `nula`), použité v handsfree režimu u každé kartičky s
`spellBack: true`. Importují se stejně jako sada, přes tlačítko 📥 vedle
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
| `letters` | ano | Objekt mapující každý znak na slovo, které se za něj vysloví. Znaky chybějící v mapě se přečtou doslova jako jeden znak v jazyce okolního textu. |

### Jak označit odpověď pro hláskování

Pole `spellBack` se zapisuje **ke konkrétní kartičce**, do stejného objektu jako
`front` a `back`, například:

```json
{
  "front": "Jak se hláskuje volací prefix?",
  "back": "DA-DR",
  "spellBack": true
}
```

V handsfree režimu se pak v textu `back` přehláskují souvislé úseky velkých
písmen (včetně českých), číslic, pomlček a případného otazníku, například
`OK2ABC`, `DA-DR`, `73` nebo `QRV?`, znak po znaku podle aktuálně vybrané
abecedy. Ostatní text v `back` se čte jazykem sady. Pole se týká pouze `back`; `front` se tímto příznakem
nepřehláskuje.

Když `spellBack` vynecháš nebo nastavíš na `false`, hláskovací abeceda se
nepoužije. Úseky alespoň dvou velkých písmen se přesto kvůli TTS přečtou po
jednotlivých písmenech v jazyce sady, například `HAREC`; nejde však o slova z
importované hláskovací abecedy. Pro výslovnost typu `Adam`, `Alpha` nebo
`Božena` musí být `spellBack: true`.

### Alternativní text pro výslovnost (speakFront a speakBack)

Pokud odpověď — nebo i otázka — obsahuje znaky či formáty, které se nebudou
vyslovovat správně (např. pomlčky, zkratky, složitější texty), můžeš uvést
alternativní text pro hlasitý režim pomocí `speakFront` a `speakBack`:

```json
{
  "front": "S-metr",
  "speakFront": "S metr"
}
```

```json
{
  "front": "Zesilovač – druh?",
  "back": "NF zesilovač",
  "speakBack": "en ef zesilovač"
}
```

Pole `speakFront` se používá místo `front` v handsfree režimu, `speakBack`
místo `back`. Všechny stávající úpravy (mechanika `spellBack`, automatické
hláskování velkých písmen, tečkovaný zápis) se aplikují normálně na text v
těchto polích. V tichém režimu (bez handsfree) se vždy zobrazuje a hlasitě se
čte původní `front` a `back`.

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
