# kulturbytes Manual

Die Anleitung verwendet [Blume](https://useblume.dev/docs/content/i18n) und ist auf Englisch, Deutsch und Dänisch verfügbar. Sie richtet sich an Endanwender ohne technisches Vorwissen.

## Aufbau

Die Startseite bietet zwei Cards:

- **Entdecken** (`discover/`): Bedienung, Veranstaltungssuche, Suchtipps und Kulturorte.
- **Verwalten** (`manage/`): die bisherige Dashboard-Anleitung mit Benutzerkonto, Organisation, Orten, Räumen, Veranstaltungen und Bildtipps.

Jeder Bereich hat eine eigene Einstiegsseite. Die `meta.ts`-Dateien legen die übersetzten Bereichsnamen und ihre Reihenfolge in der Navigation fest.

## Entwicklung

```sh
pnpm install --frozen-lockfile
pnpm run dev
```

## Sprachen und URLs

Alle Sprachversionen verwenden einen zweistelligen Sprachcode in der URL:

| Sprache | Inhalte | Startseite | Beispielkapitel |
| --- | --- | --- | --- |
| Englisch | `docs/` | `/en/` | `/en/manage/event-edit/` |
| Deutsch | `docs/de/` | `/de/` | `/de/manage/event-edit/` |
| Dänisch | `docs/da/` | `/da/` | `/da/manage/event-edit/` |

`da` ist der Sprachcode für Dänisch. Die englische Ausgangsversion bleibt gemäß Blumes Verzeichnisstruktur in `docs/`, einschließlich der Unterverzeichnisse `discover/` und `manage/`. `hideDefaultLocalePrefix: false` sorgt dafür, dass auch sie das URL-Präfix `/en/` erhält. `/` leitet auf `/en/` weiter.

Die bisherigen Kapitel-URLs leiten direkt auf das neue Ziel weiter, zum Beispiel `/event-edit/` und `/en/event-edit/` auf `/en/manage/event-edit/` sowie `/de/event-edit/` auf `/de/manage/event-edit/`. Die Weiterleitungen gelten für alle drei Sprachen. Beim Wechsel bleiben vorhandene Abschnittsanker erhalten.

`pnpm run build` ergänzt die erzeugten HTML-Weiterleitungen mit `scripts/preserve-redirect-fragments.mjs`. So bleiben Abschnittsanker und Suchparameter auch auf statischen Hosts erhalten, die Blumes HTTP-Weiterleitungsregeln nicht auswerten. Ohne JavaScript greift weiterhin die HTML-Weiterleitung zum Kapitel.

Die Sprachwahl in der Navigation verlinkt dasselbe Kapitel in den anderen Sprachen. Blume übersetzt die Oberfläche und beschränkt die Suche standardmäßig auf die aktuelle Sprache.

## Inhalte und Übersetzungen pflegen

- Lege neue englische Kapitel in `docs/` an und ergänze dieselbe Datei in `docs/de/` und `docs/da/`. Dateinamen und Unterverzeichnisse müssen übereinstimmen, damit Blume die Kapitel als Übersetzungen erkennt.
- Übersetze Titel, Beschreibungen und Text. Behalte strukturelle Frontmatter-Werte wie `sidebar.order` bei. Ton und Fachbegriffe sind in `blume.config.ts` unter `i18n.locales[].style` festgelegt.
- Verwende interne Links wie `[Bilder](/manage/images)` oder `[Suchen](/discover/search)` in allen Sprachversionen. Blume ergänzt beim Rendern den passenden Sprachcode. Bilddateien bleiben in `public/` und erhalten kein automatisches Sprachpräfix.
- Behalte die Abschnittsanker der Ausgangsversion bei: `## Inhaltssprache [#content-language]`. So funktionieren Links zu Abschnitten auch beim Sprachwechsel.

## Verständlich schreiben

- Sprich die Leser auf Deutsch mit „du“ an. Schreibe kurze Sätze und beschreibe eine Handlung nach der anderen.
- Beginne mit dem Ziel: Was kann jemand auf dieser Seite erledigen?
- Nutze Beispiele wie „Kulturzentrum“, „Großer Saal“ und „Jazzabend“.
- Verwende alltägliche Wörter, etwa „Webadresse“ statt „URL“. Erkläre notwendige Begriffe beim ersten Auftreten.
- Behalte Beschriftungen aus der Oberfläche erkennbar bei. Ergänze bei fremdsprachigen Schaltflächen eine kurze Erklärung, etwa **Save** (Speichern).
- Erkläre Funktionen nur, wenn sie anhand der Oberfläche oder des Produktcodes geprüft sind. Beschreibe keine vermuteten Schaltflächen oder Abläufe.

Die entsprechenden Vorgaben für alle drei Sprachen stehen zusätzlich in `blume.config.ts` unter `i18n.locales[].style`.

## Screenshots und Illustrationen

Die Anleitung enthält Bilder an Stellen, an denen sie einen Arbeitsschritt oder Zusammenhang erklären:

| Thema | Bilddateien | Herkunft |
| --- | --- | --- |
| Suche am großen Bildschirm und Smartphone | `public/img/{en,de,da}/search-{desktop,mobile}.png` | Am 30.10.2026 auf der öffentlichen Seite `https://kulturbytes.de/{en,de,da}` aufgenommen; Ausschnitt der Suchoptionen ohne Veranstaltungsfotos. |
| Benutzerkonto erstellen | `public/img/sign-up.png` | Bereits vorhandener Screenshot des englischen Registrierungsformulars. |
| Organisation, Ort, Raum und Veranstaltung | `public/img/{en,de,da}/organization-overview.svg` | Für diese Anleitung erstellte, übersetzte Illustration mit einem Beispiel. |
| Bildausschnitt und Hauptmotiv | `public/img/{en,de,da}/image-crop.svg` | Für diese Anleitung erstellte, übersetzte Illustration zum Zuschneiden. |

- Verwende echte Screenshots für die Oberfläche und klar erkennbare Illustrationen für Zusammenhänge. Verwende keine nachgebauten Oberflächen als Screenshots.
- Schneide auf den relevanten Bereich zu. Warte bei Aufnahmen, bis Einblendungen und Ladevorgänge beendet sind. Zeige keine persönlichen Daten.
- Ergänze eine verständliche Bildbeschreibung (`alt`) und eine kurze Bildunterschrift. Die Handlung muss auch ohne Bild im Text erklärt sein.
- Für neue Screenshots bevorzuge die passende Sprache. Wenn nur eine Sprachversion vorliegt, benenne das in der Bildunterschrift.
- Lege übersetzte Bilder unter `public/img/en/`, `public/img/de/` und `public/img/da/` ab. Verlinke diese Pfade ausdrücklich in der jeweiligen Seite.
- Prüfe nach Änderungen an der Oberfläche die zugehörigen Bilder und Anleitungen gemeinsam. Weitere sinnvolle Aufnahmen sind **Was / Wo / Wann** beim Bearbeiten einer Veranstaltung und die Kartenposition eines Ortes; nutze dafür ein Beispielkonto ohne persönliche Daten.

## Übersetzungsstand prüfen

`blume.translations.json` hält fest, auf welcher englischen Quellversion jede Übersetzung basiert. Nach Änderungen an einer Quellseite meldet die Übersetzungsprüfung die betroffenen Sprachversionen:

```sh
pnpm run translations:check
```

Zum Aktualisieren mit einer lokal installierten Agent-CLI kannst du `pnpm exec blume translate --codex` oder `pnpm exec blume translate --claude` verwenden, optional mit `--locale de` oder `--locale da`. Prüfe anschließend die Übersetzungen und übernimm die aktualisierte `blume.translations.json` zusammen mit den Inhalten. Bei manuellen Übersetzungen aktualisiere die Quellversion im Ledger erst, nachdem die Übersetzungen zur geänderten Quelle passen. Das gilt auch für die übersetzten `meta.ts`-Dateien.

Eine weitere Sprache ergänzt du als zweistelligen Code unter `i18n.locales` und als entsprechendes Verzeichnis in `docs/`. Solange eine Übersetzung fehlt, zeigt Blume standardmäßig die englische Ausgangsversion unter der jeweiligen Sprach-URL.

## Prüfen und bauen

```sh
pnpm run doctor
pnpm run validate
pnpm run translations:check
pnpm run build
```

Der statische Build liegt anschließend in `dist/`.
