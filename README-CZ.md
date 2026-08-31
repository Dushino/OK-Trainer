# OK Trainer

Aplikace: https://dushino.github.io/OK-Trainer/

Aplikace pro učení pomocí kartiček: každá kartička zobrazí otázku, ty na ni odpovíš v duchu (nebo nahlas), otočíš kartičku a zkontroluješ, jestli jsi odpověděl správně, a označíš, zda jsi odpověď znal, nebo ne. Aplikace si pamatuje statistiky a otázky, které ti moc nejdou a při dalším kole je nabízí více. Tím dochází k efektivnímu učení.

- Nyní je k dispoziti editor kartiček na https://dushino.github.io/OK-Trainer-Editor/ s dokumentací https://github.com/Dushino/OK-Trainer-Editor/blob/main/CZ_README.md 

## Nahrávání kartiček

OK-Trainer sám o sobě žádný pevný obsah nemá — je to obecný engine. Při prvním spuštění se načte malá vestavěná ukázková sada (tutoriál), abys ho mohl hned vyzkoušet, ale pro skutečné učení importuješ vlastní soubor s kartičkami (soubor `.json`) pomocí importovacího tlačítka nahoře v apce. Můžeš naimportovat několik různých sad a kdykoli mezi nimi přepínat; každá sada si udržuje vlastní, oddělené statistiky.

Přesnou strukturu souboru, pokud si chceš vytvořit vlastní sadu, najdeš v `FORMAT-CZ.md`.

### Hláskovací abeceda a nastavení

Hláskovací abeceda je samostatný soubor `.json`, který mapuje písmena a číslice
na slova určená pro hlasové čtení, například `A` → `Adam` nebo `0` → `nula`.
Vestavěná je anglická abeceda ITU/NATO; český soubor najdeš ve složce
`SpellingAlphabets`. Vlastní abecedu lze importovat stejným způsobem jako sadu
kartiček.

Stránku s nastavením zobrazíš klepnutím na tlačítko `⋮` vpravo nahoře. V části
**Nastavení** pak:

1. U položky **Hláskovací abeceda** otevři výběr a zvol požadovanou abecedu.
2. Pro přidání vlastní abecedy klepni vedle výběru na tlačítko pro import
  (`📥`) a vyber její `.json` soubor.
3. Nově importovaná abeceda se rovnou vybere. Tlačítkem `←` se vrať na hlavní
  stránku.

Abeceda se použije v handsfree režimu u jakéhokoli textu obaleného značkou
`{X}`, například `back: "{DA-DR}"`. Funguje to v `front`, `back`, `frontTts`,
`backTts` kartičky i v `nameTts` oblasti nebo podoblasti. Označený úsek se
přehláskuje znak po znaku (například `{OK2ABC}`, `{DA-DR}`, `{73}` nebo
`{QRV?}`) podle právě vybrané abecedy. Běžný text mimo `{}` se čte jazykem
sady.

Bez značky `{X}` se běžný text čte normálně; delší úseky velkých písmen se
automaticky převedou na čtení po jednotlivých písmenech, ale nepoužije se
hláskovací abeceda. Pro text, který má používat slova jako „Adam“ nebo
„Alpha“, ho proto obal do `{}`. Přesný formát souboru abecedy i příklady jsou
v `FORMAT-CZ.md`.

## Jak učení probíhá

1. Apka zobrazí přední stranu kartičky (otázku).
2. Vymyslíš — nebo řekneš — odpověď.
3. Otočíš kartičku a zkontroluješ ji podle správné odpovědi na zadní straně.
4. Označíš kartičku jako **znal jsem** nebo **neznal jsem**. Apka si to pamatuje, aby ti mohla častěji ukazovat kartičky, se kterými máš potíže.

## Leitnerův systém

V pozadí apka používá [Leitnerův systém](https://en.wikipedia.org/wiki/Leitner_system) (odkaz vede na anglickou Wikipedii — česká verze o něm zatím článek nemá) — známou metodu rozestupového opakování — aby určila, jak často danou kartičku uvidíš. Každá kartička je v jednom z **5 košíků**. Správná odpověď ji posune o košík výš (doprava), takže ji uvidíš méně často; špatná odpověď ji **vrátí rovnou do košíku č. 1**, bez ohledu na to, jak daleko se předtím dostala. Díky tomu se kartičky, se kterými máš potíže, objevují mnohem častěji než ty, které už dobře znáš. Cílem je dostat všechny kartičky do posledního košíku.

V rámci jednoho kola apka taky hlídá, aby se stejná kartička neobjevila dvakrát po sobě, kdykoliv je to možné, i když se kartičky z nižších košíků zobrazují  mnohem častěji.

## Témata a podtémata

Otázky je dobré seskupit do tematických oblastí, které je možno dále dělit na podoblasti. Díky tomu se mnohem snáz učí velké množství materiálu — můžeš se soustředit na jednu podoblast, místo zahlcení celou sadou.

## Jak číst indikátory

Vedle každé oblasti i podoblasti uvidíš **5 malých sloupečků**, jeden za každý Leitnerův košík (box). Výška sloupečku ukazuje, jaký podíl kartiček dané oblasti/podoblasti je právě v tom košíku — nejlevější (červený) sloupeček je košík č. 1, nejpravější (zelený) je košík č. 5. Vysoký sloupeček vpravo znamená, že většinu kartiček už dobře znáš; vysoký sloupeček vlevo znamená, že na nich ještě potřebuješ zapracovat. Všech 5 sloupečků se zobrazuje vždy, i pro prázdný košík, abys na první pohled viděl celé rozložení.

U oblastí, které mají definované zkušební minimum (`maxErrors` v `FORMAT-CZ.md`), navíc uvidíš vedle názvu oblasti barevnou tečku, která napoví, jak jsi na tom se zkouškou: pod minimem je vždy pevně červená, nad ním plynule přechází z oranžové do zelené — stejně jako se barví sloupečky. Barva tečky vychází z jednoho čísla — průměrné pozice košíku napříč všemi kartičkami té oblasti, převedené na škálu 0–100 % (košík č. 1 = 0 %, košík č. 5 = 100 %) — dá se to číst zhruba jako tvoje aktuální šance, že bys na náhodnou otázku z té oblasti odpověděl správně napoprvé. Oblasti bez definovaného zkušebního minima žádnou tečku nemají.

## Jazyk rozhraní

Rozhraní apky (tlačítka, nápovědy, hlášky) je ve výchozím stavu v angličtině a funguje tak bez nutnosti cokoli stahovat. Pokud preferuješ jiný jazyk, můžeš naimportovat jazykový balíček stejným způsobem jako sadu kartiček — český balíček je k dispozici ve složce `Languages`. Přepnutí jazyka rozhraní nemá vliv na jazyk obsahu kartiček ani na jazyk handsfree hlasu, které jsou svázané s konkrétní použitou sadou kartiček.

## Ukládání dat a soukromí

Apka nepoužívá žádné externí úložiště ani server k ukládání tvých dat. Veškeré statistiky a postup se ukládají lokálně, v úložišti prohlížeče na zařízení, které používáš. To znamená:

- Nic se nikam neodesílá.
- Pokud apliakci použiješ z jiného prohlížeče nebo z jiného zařízení, tvé statistiky tam nebudou — postup se mezi prohlížeči ani zařízeními nesynchronizuje.

## Instalace na telefon

Program je možné „nainstalovat" na telefon jako ikonu pro rychlý přístup, buď jako zástupce podobného aplikaci v seznamu aplikací, nebo jako zástupce na ploše. Nejde o skutečnou binární instalaci — je to jen záložka s ikonou, která otevírá tutéž webovou stránku, díky čemuž se k ní dostaneš rychleji. A funguje i offline.

### Android (Google Chrome)

1. Otevři Google Chrome v telefonu.
2. Přejdi na <https://dushino.github.io/OK-Trainer/>.
3. Klepni na ikonu tří teček vpravo nahoře, vedle adresního řádku.
4. V nabídce zvol **Přidat na plochu**, poté **Vytvořit zástupce** (nebo **Přidat**).
5. Potvrď název a dokonči klepnutím na **Přidat**.

### Zařízení Apple

Postup je podobný v iOS/Safari — hledej odpovídající volbu „Přidat na plochu" v nabídce sdílení.

### Přidání do záložek

Alternativně můžeš stránku jednoduše přidat do záložek prohlížeče. Tohle funguje stejně napříč všemi prohlížeči a operačními systémy.

## Jen stažení souborů

Další možnost bez "instalace" je stažení souborů a jejich offline použití. Stáhni si všechny soubory z  <https://github.com/Dushino/OK-Trainer> do telefonu nebo počítače (tento krok vyžaduje připojení) a poté stažený html soubor otevři pomocí správce souborů v prohlížeči (poté už připojení potřeba není) nebo si jej dej do záložek prohlížeče.

## Handsfree režim

Apku lze používat i bez přímé interakce s telefonem pomocí bluetooth handsfree. Využívá syntézu řeči (TTS) v telefonu k předčítání jednotlivých kartiček a ovládá se pomocí tlačítek pro ovládání médií:

- Při zobrazení otázky:
- **Další skladba** otočí kartičku a přečte nahlas odpověď.
- **Předchozí skladba** (dokud je zobrazená strana s otázkou) přečte otázku znovu.
- Po přečtení odpovědi:
  - **Další skladba** potvrdí, že jsi odpověď znal.
  - **Předchozí skladba** potvrdí, že jsi ji neznal.
- Jakmile dokončíš sadu kartiček, apka chytře pokračuje dál: pokud jsi se učil jednu podoblast, přejde na další podoblast; pokud jsi se učil celou oblast, přejde na další celou oblast.

Text se běžně předává do TTS enginu telefonu beze změny — většina enginů si s krátkými neznámými ALL-CAPS zkratkami poradí sama. U textu obaleného značkou `{X}` (viz `FORMAT-CZ.md`), typicky u prefixů volacích značek, apka místo toho spolehlivě hláskuje přes vyhrazenou **hláskovací abecedu** — tabulku písmeno/číslice → vyslovované slovo (např. "A" → "Adam"), kterou si vybíráš nezávisle na jazyce rozhraní i na jazyce sady, stejně jako jazykový balíček. S apkou je vestavěná krátká mezinárodní (ITU/NATO) anglická tabulka; česká je přiložená ve složce `SpellingAlphabets` a importuje se stejně jako sada kartiček.

## Co je dobré vědět

> **Vždy dávej přednost vlastní bezpečnosti a bezpečnosti lidí kolem tebe. Nepoužívej apliakci při řízení!**

- Aplikace nezohledňuje zapomínání. To je jednak idividuální a také je to nad síly jednoduché HTML stránky - musela by to být plnohodnotná aplikace. Takže i když máš všechno zelené pár týdnů před zkouškou, neznamená to, že do zkoušky něco nezapomeneš. Řešení je pravidelné opakování.
- Počet kartiček v jednom kole učení je dynamický. Když téma umíš, jen proběhne každou kartičku jednou a pokud znáš všechny, příště bude každá zase jen jednou. Pokud neznáš, počet v dalším kole se zvýší tím, že bude problematickou kartičku nabízet vícekrát.
- **Jestliže se aplikace chová podivně, smaž a pak importuj čerstvě stažené soubory, případně odinstaluj a pak nainstaluj celou aplikaci znovu. Je to tím, že občas něco vylepším a pak nemusí být kompatibilní aplikace s json soubory.**

## Poznámky k běhu aplikace na různých platformách

- Doposud jsem nenašel nikoho, kdo by funkčnost aplikace otestoval na nějakém zařízení Apple. Uvítám zpětnou vazbu!
- Hlasová syntéza je nejlepší na Androidu. Windows má problémy s výslovností hlavně zkratek napsanýmch velkými písmeny.
- Hlasová syntéza na Ubuntu je velmi špatná, doporučuji ji vůbec nepoužívat.

## Poznámky ke kartičkám HAREC A

- V otázkách či odpovědích jsem udělal pouze minimální úpravy např. místo odpovědi "W" jsem doplnil "W (Watt)". 
- Pokud se zkratka nachází v sekci zkratek, je hláskována vybranou hláskovací abecedou - např. SSB je hláskováno jako Svatopluk Svatopluk Božena. Pokud je zkratka mimo sekci zkratek, je přečtena jako série velkých písmen - např. Es Es Bé. Udělal jsem to takto schválně, protože to umožní "nacucnutí" hláskovací abecedy do mozku a zároveň nekomplikuje běžnou mluvu. Jestli s tím máte problém, dejte, prosím, vědět.
