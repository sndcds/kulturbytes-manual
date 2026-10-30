import { defineConfig } from "blume";

export default defineConfig({
  title: "kulturbytes Manual",
  description: "Find events and places, and manage your own offers with kulturbytes.",

  // Preserve bookmarks from before the manual was split into two topics.
  redirects: [
    { from: "/", to: "/en", status: 308 },
    ...[
      "overview",
      "register",
      "dashboard",
      "organization",
      "organization-edit",
      "venue-and-space",
      "venue-edit",
      "space-edit",
      "events",
      "event-edit",
      "images",
      "image-best-practice",
      "logos",
      "maps",
      "team",
      "portal",
    ].flatMap((slug) => [
      { from: `/${slug}`, to: `/en/manage/${slug}`, status: 308 as const },
      ...["en", "de", "da"].map((locale) => ({
        from: `/${locale}/${slug}`,
        to: `/${locale}/manage/${slug}`,
        status: 308 as const,
      })),
    ]),
  ],

  i18n: {
    defaultLocale: "en",
    parser: "dir",
    hideDefaultLocalePrefix: false,

    locales: [
      {
        code: "en",
        label: "English",
        style: `
          Use a clear, friendly and informal tone.
          Write for people using kulturbytes, without assuming technical knowledge.
          Use short sentences, everyday words and practical examples.
          Explain an unfamiliar term when it first appears.
          Keep visible button labels recognizable and explain them if needed.
          "kulturbytes" and "Uranus Dashboard" are product names
          and must not be translated.
          Use the same English terminology consistently throughout
          the entire manual.
        `,
      },
      {
        code: "de",
        label: "Deutsch",
        style: `
          Verwende die Anrede "du".
          Schreibe klar, freundlich und verständlich.
          Schreibe für Endanwender ohne technisches Vorwissen.
          Verwende kurze Sätze, alltägliche Wörter und konkrete Beispiele.
          Erkläre unvermeidbare Fachbegriffe beim ersten Auftreten.
          Behalte sichtbare Beschriftungen von Schaltflächen bei und erkläre sie bei Bedarf.
          "kulturbytes" und "Uranus Dashboard" sind Produktnamen und
          dürfen nicht übersetzt werden.
          Verwende die Begriffe "Organisation", "Ort", "Raum",
          "Veranstaltung", "Veranstaltungstermin", "Team", "Partner"
          und "Portal" konsistent.
        `,
      },
      {
        code: "da",
        label: "Dansk",
        style: `
          Brug en venlig og uformel tone.
          Skriv til brugere uden at forudsætte teknisk viden.
          Brug korte sætninger, almindelige ord og konkrete eksempler.
          Forklar uvante begreber, første gang de bruges.
          Behold knappernes synlige tekster, og forklar dem ved behov.
          "kulturbytes" og "Uranus Dashboard" er produktnavne
          og må ikke oversættes.
          Brug de samme danske fagtermer konsekvent gennem hele manualen.
          Brug "organisation", "sted", "lokale", "arrangement",
          "arrangementstidspunkt", "team", "partner" og "portal".
        `,
      },
    ],
  },
});
