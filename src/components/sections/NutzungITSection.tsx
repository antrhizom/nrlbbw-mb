"use client";

import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import ChecklistInteractive from "@/components/interactive/ChecklistInteractive";
import QuizSingleChoice from "@/components/interactive/QuizSingleChoice";

export default function NutzungITSection() {
  const { markInteractiveComplete, markQuizPassed } = useMerkblatt();

  return (
    <SectionCard
      chapterLabel="Kapitel 2"
      title="Nutzung der IT-Infrastruktur"
    >
      <div className="prose prose-gray max-w-none space-y-4">
        <p className="text-gray-700 leading-relaxed">
          <strong>Sorgfaltspflicht:</strong> Schulgeräte müssen pfleglich
          behandelt und vor Diebstahl geschützt werden. Unbeaufsichtigte
          Geräte sind stets sicher aufzubewahren.
        </p>
        <p className="text-gray-700 leading-relaxed">
          An Schulgeräten sind nur Änderungen erlaubt, die den sicheren Betrieb
          nicht beeinträchtigen.
        </p>
        <p className="text-gray-700 leading-relaxed">
          <strong>BYOD (Bring Your Own Device):</strong> Die Nutzung privater
          Geräte ist erlaubt. Dabei gelten folgende Mindestanforderungen:
          Passwort- oder PIN-Schutz muss aktiviert und regelmässige
          Software-Updates müssen installiert sein.
        </p>
        <p className="text-gray-700 leading-relaxed">
          E-Mails und Kalender können auf privaten Geräten synchronisiert
          werden. Technischer Support steht zur Verfügung, ist für private
          Geräte jedoch nur eingeschränkt möglich.
        </p>
      </div>

      <ChecklistInteractive
        title="BYOD-Checkliste"
        description="Welche Anforderungen müssen private Geräte (BYOD) erfüllen? Wähle alle richtigen aus."
        items={[
          { text: "Passwort- oder PIN-Schutz aktiviert", correct: true },
          {
            text: "Regelmässige Software-Updates installiert",
            correct: true,
          },
          {
            text: "Antivirensoftware der Schule installiert",
            correct: false,
          },
          {
            text: "Gerät bei der IT-Abteilung registriert",
            correct: false,
          },
          {
            text: "Synchronisation von E-Mail/Kalender möglich",
            correct: true,
          },
        ]}
        onComplete={() => markInteractiveComplete("nutzung-it")}
      />

      <QuizSingleChoice
        question="Was sind die Mindestanforderungen für die Nutzung privater Geräte (BYOD) an der BBW?"
        options={[
          { text: "Nur Passwortschutz", correct: false },
          {
            text: "Passwort-/PIN-Schutz und regelmässige Updates",
            correct: true,
          },
          { text: "Installation der Schul-Software", correct: false },
          {
            text: "Genehmigung durch die Schulleitung",
            correct: false,
          },
        ]}
        explanation="Private Geräte müssen mindestens mit Passwort/PIN geschützt sein und regelmässig aktualisiert werden."
        onCorrect={() => markQuizPassed("nutzung-it")}
      />
    </SectionCard>
  );
}
