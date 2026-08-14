# OK Trainer

https://dushino.github.io/OK-Trainer/

Aplikace pro učení pomocí kartiček: každá kartička zobrazí otázku, ty na ni odpovíš v duchu (nebo nahlas), otočíš kartičku a zkontroluješ, jestli jsi odpověděl správně, a označíš, zda jsi odpověď znal, nebo ne. Aplikace si pamatuje statistiky a otázky, které ti moc nejdou a při dalším kole je nabízí více. Tím dochází k efektivnímu učení.

## Nahrávání kartiček

OK-Trainer sám o sobě žádný pevný obsah nemá — je to obecný engine. Při prvním spuštění se načte malá vestavěná ukázková sada (tutoriál), abys ho mohl hned vyzkoušet, ale pro skutečné učení importuješ vlastní soubor s kartičkami (soubor `.json`) pomocí importovacího tlačítka nahoře v apce. Můžeš naimportovat několik různých sad a kdykoli mezi nimi přepínat; každá sada si udržuje vlastní, oddělené statistiky.

Přesnou strukturu souboru, pokud si chceš vytvořit vlastní sadu, najdeš v `FORMAT-CZ.md`.

## Jak učení probíhá

1. Apka zobrazí přední stranu kartičky (otázku).
2. Vymyslíš — nebo řekneš — odpověď.
3. Otočíš kartičku a zkontroluješ ji podle správné odpovědi na zadní straně.
4. Označíš kartičku jako **znal jsem** nebo **neznal jsem**. Apka si to pamatuje, aby ti mohla častěji ukazovat kartičky, se kterými máš potíže.

## Rozestupové opakování (Leitnerův systém)

V pozadí appka používá [Leitnerův systém](https://en.wikipedia.org/wiki/Leitner_system) (odkaz vede na anglickou Wikipedii — česká verze o něm zatím článek nemá) — známou metodu rozestupového opakování — aby určila, jak často danou kartičku uvidíš. Každá kartička je v jednom z **5 boxů**. Správná odpověď ji posune o box výš, takže ji uvidíš méně často; špatná odpověď ji **vrátí rovnou do boxu 1**, bez ohledu na to, jak daleko se předtím dostala. Díky tomu se kartičky, se kterými máš potíže, objevují mnohem častěji než ty, které už dobře znáš.

V rámci jednoho kola appka taky hlídá, aby se stejná kartička neobjevila dvakrát po sobě, kdykoliv je to možné, i když se kartičky z nižších boxů celkově zamíchávají mnohem častěji.

## Témata a podtémata

Otázky je dobré seskupit do tematických oblastí, které je možno dále dělit na podoblasti. Díky tomu se mnohem snáz učí velké množství materiálu — můžeš se soustředit na jednu podoblast, místo zahlcení celou sadou.

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

## Plně offline použití

Pokud se nechceš při každém použití spoléhat na živé internetové připojení, můžeš si všechny soubory z  <https://github.com/Dushino/OK-Trainer> stáhnout do telefonu nebo počítače (tento krok vyžaduje připojení) a poté stažený html soubor otevřít pomocí správce souborů v prohlížeči (poté už připojení potřeba není).

## Handsfree režim

Apku lze používat i bez přímé interakce s telefonem pomocí bluetooth handsfree. Využívá syntézu řeči (TTS) v telefonu k předčítání jednotlivých kartiček a ovládá se pomocí tlačítek pro ovládání médií:

- Při zobrazení otázky:
- **Další skladba** otočí kartičku a přečte nahlas odpověď.
- **Předchozí skladba** (dokud je zobrazená strana s otázkou) přečte otázku znovu.
- Po přečtení odpovědi:
  - **Další skladba** potvrdí, že jsi odpověď znal.
  - **Předchozí skladba** potvrdí, že jsi ji neznal.
- Jakmile dokončíš sadu kartiček, apka chytře pokračuje dál: pokud jsi se učil jednu podoblast, přejde na další podoblast; pokud jsi se učil celou oblast, přejde na další celou oblast.

> **Vždy dávej přednost vlastní bezpečnosti a bezpečnosti lidí kolem tebe. Nepoužívej tuto funkci při řízení!**
