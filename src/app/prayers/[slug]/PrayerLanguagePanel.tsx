"use client";

import { useState } from "react";

type Language = "english" | "amharicTransliteration" | "amharic" | "geez";

const languages: { key: Language; label: string }[] = [
  { key: "english", label: "English" },
  { key: "amharicTransliteration", label: "Amharic (Transliteration)" },
  { key: "amharic", label: "Amharic" },
  { key: "geez", label: "Ge'ez" },
];

type PrayerLanguagePanelProps = {
  prayer: {
    english: string;
    amharicTransliteration: string;
    amharic: string;
    geez: string;
  };
};

export default function PrayerLanguagePanel({ prayer }: PrayerLanguagePanelProps) {
  const [lang, setLang] = useState<Language>("english");

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        {languages.map((l) => (
          <button
            key={l.key}
            onClick={() => setLang(l.key)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              lang === l.key
                ? "bg-[var(--color-primary)] text-white"
                : "bg-[var(--color-cream)] text-[var(--color-text-muted)] hover:bg-[var(--color-cream-dark)]"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="bg-[var(--color-cream)] rounded-xl p-8 mb-8">
        <div className={`prayer-text ${lang === "geez" ? "prayer-text-geez" : ""}`}>
          {prayer[lang]}
        </div>
      </div>
    </>
  );
}
