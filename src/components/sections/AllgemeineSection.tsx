"use client";

import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import TrueFalseCards from "@/components/interactive/TrueFalseCards";
import QuizSingleChoice from "@/components/interactive/QuizSingleChoice";

export default function AllgemeineSection() {
  const { markInteractiveComplete, markQuizPassed } = useMerkblatt();

  return (
    <SectionCard
      chapterLabel="Kapitel 1"
      title="Allgemeine Bestimmungen"
      reduced={true}
    >
      <div className="prose prose-gray max-w-none space-y-4">
        <p className="text-gray-700 leading-relaxed">
          Die Nutzungsrichtlinie IKT (NRL) regelt den Umgang mit
          Informations- und Kommunikationstechnologien an der BBW
          Berufsbildungsschule Winterthur.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Sie gilt für <strong>alle Nutzenden</strong> der schulischen
          IKT-Systeme: Lernende, Lehrpersonen, Schulleitung, Verwaltung und
          Gäste.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Die <strong>private Nutzung</strong> der Schulsysteme ist grundsätzlich
          erlaubt, sofern schulische Zwecke jederzeit Vorrang haben.
          Ressourcenintensive Aktivitäten wie Kryptowährungs-Mining sowie
          kommerzielle Nutzung sind ausdrücklich verboten.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Logdaten (Firewall, Server) werden gesammelt und regelmässig in
          anonymisierter Form ausgewertet.
        </p>
      </div>

      <TrueFalseCards
        title="Richtig oder Falsch?"
        statements={[
          {
            statement: "Die NRL gilt nur für Lehrpersonen.",
            isTrue: false,
            explanation:
              "Sie gilt für alle: Lernende, Lehrende, Schulleitung, Verwaltung und Gäste.",
          },
          {
            statement:
              "Private Nutzung der Schulsysteme ist grundsätzlich erlaubt.",
            isTrue: true,
            explanation:
              "Private Nutzung ist erlaubt, sofern schulische Zwecke Vorrang haben.",
          },
          {
            statement:
              "Kryptowährungs-Mining auf Schulgeräten ist erlaubt.",
            isTrue: false,
            explanation:
              "Ressourcenintensive Aktivitäten wie Mining sind ausdrücklich verboten.",
          },
        ]}
        onComplete={() => markInteractiveComplete("allgemein")}
      />

      <QuizSingleChoice
        question="Für wen gilt die Nutzungsrichtlinie?"
        options={[
          { text: "Nur für Lehrpersonen", correct: false },
          { text: "Nur für Lernende und Lehrpersonen", correct: false },
          {
            text: "Für alle Nutzenden der BBW-IKT-Systeme",
            correct: true,
          },
          { text: "Nur für die Schulleitung", correct: false },
        ]}
        explanation="Die NRL gilt für alle, die BBW-IKT-Systeme nutzen – inkl. Gäste."
        onCorrect={() => markQuizPassed("allgemein")}
      />
    </SectionCard>
  );
}
