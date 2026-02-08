"use client";

import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import DragDropClassify from "@/components/interactive/DragDropClassify";
import QuizMultipleChoice from "@/components/interactive/QuizMultipleChoice";

export default function DatensicherheitSection1() {
  const { markInteractiveComplete, markQuizPassed } = useMerkblatt();

  return (
    <SectionCard
      chapterLabel="Kapitel 3 (Teil 1)"
      title="Datensicherheit"
    >
      <div className="prose prose-gray max-w-none space-y-4">
        <p className="text-gray-700 leading-relaxed">
          <strong>Datensicherheit</strong> bedeutet den Schutz aller Daten vor
          unbefugtem Zugriff, Verlust oder Beschädigung.
        </p>
        <p className="text-gray-700 leading-relaxed">
          <strong>Externe Datenablagen</strong> (nicht von der BBW verwaltet)
          bergen Risiken: unbefugter Zugriff, ungenügende Datensicherung und
          die Möglichkeit, dass Daten analysiert werden. Vorsicht ist geboten
          bei USB-Sticks, fremden WLANs und öffentlichen Netzen.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Schulinterne Daten gehören auf die offiziellen{" "}
          <strong>BBW-Speicher</strong>: Schulserver, Nextcloud, OneDrive,
          Teams, SharePoint oder OpenOlat.
        </p>
        <p className="text-gray-700 leading-relaxed">
          <strong>Zugangsdaten</strong> sind streng vertraulich. Konten dürfen
          nicht geteilt werden. Verwende starke, individuelle Passwörter und
          ändere sie sofort bei einer Kompromittierung. Aktiviere{" "}
          <strong>MFA (Mehr-Faktor-Authentifizierung)</strong>, wo immer dies
          möglich ist.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Schulinterne Informationen unterliegen dem{" "}
          <strong>Amtsgeheimnis</strong>. Daten werden in drei Schutzstufen
          eingeteilt: Sachdaten, Personendaten und besondere Personendaten.
        </p>
        <p className="text-gray-700 leading-relaxed">
          <strong>Clean-Desk / Clear-Screen:</strong> Sperre deinen Bildschirm
          immer mit <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-sm font-mono">Win+L</kbd>,
          wenn du den Arbeitsplatz verlässt, und lasse keine vertraulichen
          Unterlagen unbeaufsichtigt liegen.
        </p>
      </div>

      <DragDropClassify
        title="Datenklassifizierung"
        description="Ordne die Datenbeispiele der richtigen Schutzstufe zu."
        categories={["Sachdaten", "Personendaten", "Besondere Personendaten"]}
        items={[
          { id: "1", text: "Stundenplan", category: "Sachdaten" },
          { id: "2", text: "Lehrmittel-Liste", category: "Sachdaten" },
          {
            id: "3",
            text: "E-Mail-Adresse einer Lernperson",
            category: "Personendaten",
          },
          {
            id: "4",
            text: "Notenliste einer Klasse",
            category: "Personendaten",
          },
          {
            id: "5",
            text: "Ärztliches Zeugnis",
            category: "Besondere Personendaten",
          },
          {
            id: "6",
            text: "Disziplinarmassnahme",
            category: "Besondere Personendaten",
          },
        ]}
        onComplete={() => markInteractiveComplete("datensicherheit-1")}
      />

      <QuizMultipleChoice
        question="Wo müssen schulinterne Daten gespeichert werden?"
        options={[
          { text: "OneDrive / Teams / SharePoint", correct: true },
          { text: "Private Dropbox", correct: false },
          { text: "Schulserver / Nextcloud", correct: true },
          { text: "USB-Stick", correct: false },
          { text: "OpenOlat", correct: true },
        ]}
        explanation="Schulinterne Daten gehören auf offizielle BBW-Speicher: Schulserver, Nextcloud, OneDrive, Teams, SharePoint oder OpenOlat."
        onCorrect={() => markQuizPassed("datensicherheit-1")}
      />
    </SectionCard>
  );
}
