"use client";

import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import CertificateGenerator from "@/components/certificate/CertificateGenerator";

const ALL_SECTIONS = [
  { key: "allgemein", label: "Kapitel 1 – Allgemeine Bestimmungen" },
  { key: "nutzung-it", label: "Kapitel 2 – Nutzung IT-Arbeitsmittel" },
  { key: "datensicherheit-1", label: "Kapitel 3 (Teil 1) – Datensicherheit: Zugänge & Klassifizierung" },
  { key: "datensicherheit-2", label: "Kapitel 3 (Teil 2) – Datensicherheit: Schutz & Meldepflicht" },
  { key: "datenschutz", label: "Kapitel 4 – Datenschutz" },
  { key: "urheberrecht", label: "Kapitel 5 – Urheberrecht" },
  { key: "verstoesse", label: "Kapitel 6–8 – Verstösse, Haftung & Rechtliches" },
];

export default function CompletionSection() {
  const { isFullyCompleted, completedSections } = useMerkblatt();

  const missingSections = ALL_SECTIONS.filter(
    (section) => !completedSections.has(section.key as never)
  );

  return (
    <SectionCard chapterLabel="Abschluss" title="Zertifikat">
      {isFullyCompleted ? (
        <div>
          <div className="bg-bbw-green-50 border border-bbw-green-200 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-bbw-green-700 mb-2">
              Herzlichen Glückwunsch!
            </h3>
            <p className="text-gray-700">
              Du hast alle Kapitel des interaktiven Merkblatts zur Nutzungsrichtlinie IKT
              erfolgreich bearbeitet. Du kannst jetzt dein Zertifikat herunterladen.
            </p>
          </div>

          <CertificateGenerator />
        </div>
      ) : (
        <div>
          <div className="bg-bbw-blue-100 border border-bbw-blue-300 rounded-lg p-6 mb-6">
            <p className="text-gray-700 mb-4">
              Bitte bearbeite zuerst alle vorherigen Kapitel, um dein Zertifikat zu erhalten.
            </p>

            {missingSections.length > 0 && (
              <div>
                <p className="font-semibold text-gray-800 mb-2">
                  Noch nicht abgeschlossene Kapitel:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {missingSections.map((section) => (
                    <li key={section.key}>{section.label}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Link to full NRL PDF */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-700">
          Das vollständige Dokument der Nutzungsrichtlinie IKT findest du hier:
        </p>
        <a
          href="/251126_Nutzungsrichtlinie_IKT_BBW.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center mt-2 text-bbw-blue-500 hover:text-bbw-blue-300 font-medium underline"
        >
          Nutzungsrichtlinie IKT (PDF)
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </SectionCard>
  );
}
