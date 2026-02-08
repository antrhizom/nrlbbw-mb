"use client";

import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import TrueFalseCards from "@/components/interactive/TrueFalseCards";
import QuizSingleChoice from "@/components/interactive/QuizSingleChoice";

export default function UrheberrechtSection() {
  const { markInteractiveComplete, markQuizPassed } = useMerkblatt();

  return (
    <SectionCard chapterLabel="Kapitel 5" title="Urheberrecht">
      {/* Grundlage */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-bbw-green-700 mb-2">Grundlage: ProLitteris Tarif 7 (GT7)</h3>
        <p className="text-gray-700 mb-3">
          Das Urheberrecht im schulischen Kontext basiert auf dem ProLitteris Gemeinsamen Tarif 7.
          Dieser regelt, was im Unterricht kopiert und verwendet werden darf.
        </p>
      </div>

      {/* Was erlaubt ist */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-bbw-green-700 mb-2">Was ist erlaubt?</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Auszüge aus urheberrechtlich geschützten Werken dürfen für den schulinternen Gebrauch kopiert werden.</li>
          <li>Radio- und TV-Sendungen dürfen auf passwortgeschützten Plattformen genutzt werden.</li>
          <li>Bilder (Fotos, Gemälde, Grafiken) dürfen vollständig im Unterricht verwendet werden.</li>
          <li>Lernende dürfen Teile von Werken für eigene Kreationen verwenden.</li>
        </ul>
      </div>

      {/* Im Unterricht */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-bbw-green-700 mb-2">Im Unterricht</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Auszüge aus Büchern, Filmen und Musik dürfen für den Unterricht kopiert werden.</li>
          <li>Fotografien, Gemälde und Grafiken dürfen vollständig im Unterricht gezeigt werden.</li>
        </ul>
      </div>

      {/* Was NICHT erlaubt ist */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-bbw-green-700 mb-2">Was ist NICHT erlaubt?</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Ganze kommerziell erhältliche Werke kopieren.</li>
          <li>Geschützte Inhalte auf öffentlichen Schulwebseiten publizieren.</li>
          <li>Werke verändern oder bearbeiten ohne Erlaubnis.</li>
        </ul>
      </div>

      {/* Generative KI */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-bbw-green-700 mb-2">Generative KI & Urheberrecht</h3>
        <p className="text-gray-700">
          Wer von KI generierte Inhalte veröffentlicht, trägt die volle Verantwortung für allfällige
          Rechtsverletzungen. KI-generierte Inhalte können bestehende urheberrechtlich geschützte Werke
          verletzen.
        </p>
      </div>

      {/* Interactive: TrueFalseCards */}
      <div className="mt-8">
        <TrueFalseCards
          title="Urheberrecht – stimmt das?"
          statements={[
            {
              statement: "Auszüge aus Büchern dürfen für den Unterricht kopiert werden.",
              isTrue: true,
              explanation:
                "Das Kopieren von Auszügen ist für den Schulgebrauch erlaubt (ProLitteris GT7).",
            },
            {
              statement: "Ein ganzes Lehrbuch darf für die Klasse kopiert werden.",
              isTrue: false,
              explanation:
                "Ganze kommerziell erhältliche Werke dürfen NICHT kopiert werden.",
            },
            {
              statement: "Fotos und Bilder dürfen vollständig im Unterricht gezeigt werden.",
              isTrue: true,
              explanation:
                "Fotografien, Gemälde und Grafiken dürfen im Unterricht vollständig gezeigt werden.",
            },
            {
              statement: "Von einer KI generierte Inhalte darf man bedenkenlos veröffentlichen.",
              isTrue: false,
              explanation:
                "Wer KI-Inhalte veröffentlicht, trägt die volle Verantwortung für allfällige Rechtsverletzungen.",
            },
          ]}
          onComplete={() => markInteractiveComplete("urheberrecht")}
        />
      </div>

      {/* Quiz */}
      <div className="mt-8">
        <QuizSingleChoice
          question="Darf man ein ganzes kommerziell erhältliches Lehrbuch für die Klasse kopieren?"
          options={[
            { text: "Ja, für den Unterricht ist alles erlaubt", correct: false },
            { text: "Nein, nur Auszüge dürfen kopiert werden", correct: true },
            { text: "Ja, wenn es auf einer passwortgeschützten Plattform ist", correct: false },
            { text: "Ja, wenn man die Quelle angibt", correct: false },
          ]}
          explanation="Nur Auszüge aus urheberrechtlich geschützten Werken dürfen für den Schulgebrauch kopiert werden – nicht das ganze Werk."
          onCorrect={() => markQuizPassed("urheberrecht")}
        />
      </div>
    </SectionCard>
  );
}
