"use client";

import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import QuizSingleChoice from "@/components/interactive/QuizSingleChoice";

export default function VerstoesseSection() {
  const { markInteractiveComplete, markQuizPassed } = useMerkblatt();

  return (
    <SectionCard
      chapterLabel="Kapitel 6–8"
      title="Verstösse, Haftung & Rechtliches"
      reduced={true}
    >
      {/* Verstösse & Massnahmen */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-bbw-green-700 mb-2">Verstösse & Massnahmen</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Bei Verstössen wird zuerst ein klärendes Gespräch gesucht.</li>
          <li>
            Massnahmen reichen von mündlicher Ermahnung über schriftliche Rüge bis zu
            disziplinarischen Massnahmen.
          </li>
          <li>
            Bei Lernenden können Eltern/Erziehungsberechtigte und Lehrbetriebe informiert werden.
          </li>
          <li>
            Die Schule behält sich Schadenersatzansprüche und Meldung an Behörden bei schweren
            Verstössen vor.
          </li>
        </ul>
      </div>

      {/* Haftungsausschluss */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-bbw-green-700 mb-2">Haftungsausschluss</h3>
        <p className="text-gray-700">
          Die Schule schliesst die Haftung für Schäden aus, die durch Handlungen der Nutzerinnen und
          Nutzer entstehen.
        </p>
      </div>

      {/* Rechtliche Grundlagen */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-bbw-green-700 mb-2">Rechtliche Grundlagen</h3>
        <p className="text-gray-700">
          Die Nutzungsrichtlinie stützt sich auf verschiedene kantonale Regelungen, darunter das
          Informations- und Datenschutzgesetz (IDG), das Personalgesetz, das Disziplinarreglement,
          AISR, BISR und weitere Bestimmungen.
        </p>
      </div>

      {/* Quiz (serves as interactive element) */}
      <div className="mt-8">
        <QuizSingleChoice
          question="Was passiert in der Regel zuerst bei einem Verstoss gegen die NRL?"
          options={[
            { text: "Sofortige Kündigung", correct: false },
            { text: "Ein klärendes Gespräch wird gesucht", correct: true },
            { text: "Anzeige bei der Polizei", correct: false },
            { text: "Entzug aller IT-Geräte", correct: false },
          ]}
          explanation="Bei Verstössen wird in der Regel zuerst ein Gespräch gesucht. Die Massnahmen reichen dann von Ermahnung bis zu disziplinarischen Massnahmen."
          onCorrect={() => {
            markInteractiveComplete("verstoesse");
            markQuizPassed("verstoesse");
          }}
        />
      </div>
    </SectionCard>
  );
}
