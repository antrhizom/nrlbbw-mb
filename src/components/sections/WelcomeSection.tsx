"use client";

import SectionCard from "@/components/SectionCard";

export default function WelcomeSection() {
  return (
    <SectionCard
      chapterLabel="Willkommen"
      title="Merkblatt zur Nutzungsrichtlinie IKT"
    >
      <p className="text-lg text-gray-600 font-medium">
        BBW Berufsbildungsschule Winterthur
      </p>

      <div className="prose prose-gray max-w-none">
        <p className="text-gray-700 leading-relaxed">
          Willkommen zum interaktiven Merkblatt der Nutzungsrichtlinie IKT (NRL)
          der BBW. Dieses Merkblatt fasst die wichtigsten Punkte der
          Nutzungsrichtlinie zusammen und hilft dir, die Regeln und
          Verantwortlichkeiten im Umgang mit den IKT-Systemen der Schule zu
          verstehen.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Du wirst Schritt für Schritt durch die zentralen Themen geführt und
          kannst dein Wissen mit interaktiven Aufgaben und Quizfragen
          überprüfen.
        </p>
      </div>

      <div className="bg-bbw-green-50 border border-bbw-green-200 rounded-xl p-5">
        <p className="text-gray-800 leading-relaxed">
          <span className="font-semibold text-bbw-green-700">Hinweis:</span>{" "}
          Diese Nutzungsrichtlinie muss lediglich zur Kenntnis genommen werden.
          Sie regelt den Umgang mit den Informations- und
          Kommunikationstechnologien an der BBW und gilt für alle Nutzenden.
        </p>
      </div>

      <div className="mt-2">
        <a
          href="/251126_Nutzungsrichtlinie_IKT_BBW.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 bg-bbw-green-500 text-white font-medium rounded-lg hover:bg-bbw-green-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Vollständige Nutzungsrichtlinie (PDF) herunterladen
        </a>
      </div>
    </SectionCard>
  );
}
