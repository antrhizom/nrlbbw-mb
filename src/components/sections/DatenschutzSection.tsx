"use client";

import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import ScenarioMatcher from "@/components/interactive/ScenarioMatcher";
import QuizMultipleChoice from "@/components/interactive/QuizMultipleChoice";

export default function DatenschutzSection() {
  const { markInteractiveComplete, markQuizPassed } = useMerkblatt();

  return (
    <SectionCard chapterLabel="Kapitel 4" title="Datenschutz">
      {/* Datensparsamkeit */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-bbw-green-700 mb-2">Datensparsamkeit</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Nur die wirklich nötigen Daten erheben – keine umfassenden Persönlichkeitsprofile erstellen.</li>
          <li>Keine Veröffentlichung von Aufnahmen (Bild, Ton, Video) ohne ausdrückliche Einwilligung der betroffenen Personen.</li>
        </ul>
      </div>

      {/* Im Unterricht */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-bbw-green-700 mb-2">Im Unterricht</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Eingesetzte Lerntechnologien müssen datenschutzkonform sein.</li>
          <li>Lernprofile sind erlaubt, dürfen aber nicht mit persönlichen Merkmalen zu Persönlichkeitsprofilen verknüpft werden.</li>
          <li>Persönliche Statistiken und Ergebnisse dürfen nicht vor der Klasse offengelegt werden.</li>
          <li>Besondere Personendaten (z.B. Gesundheitsdaten) müssen mindestens als vertraulich eingestuft werden.</li>
          <li>Keine diffamierenden oder diskriminierenden Inhalte – kein Cybermobbing.</li>
          <li>Die Kamera darf in Videokonferenzen ausgeschaltet werden.</li>
        </ul>
      </div>

      {/* KI und Datenschutz */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-bbw-green-700 mb-2">KI und Datenschutz</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>
            <strong>Keine persönlichen Daten</strong> in generative KI-Tools (z.B. ChatGPT) eingeben.
          </li>
          <li>Öffentliche Schulinformationen dürfen verwendet werden, aber nicht mit internen Kennungen kombiniert.</li>
          <li>
            <strong>Vertrauliche oder geheime Informationen</strong> dürfen NICHT mit generativer KI verwendet werden.
          </li>
          <li>Die Anmeldung bei KI-Tools ist freiwillig und darf nicht erzwungen werden.</li>
        </ul>
      </div>

      {/* Interactive: ScenarioMatcher */}
      <div className="mt-8">
        <ScenarioMatcher
          title="Datenschutz-Szenarien"
          scenarios={[
            {
              situation:
                "Du möchtest ChatGPT nutzen, um eine Prüfungskorrektur zu beschleunigen. Die Aufsätze enthalten die Namen der Lernenden.",
              options: [
                "Namen stehen lassen – KI braucht den Kontext",
                "Alle Namen entfernen/anonymisieren, dann KI nutzen",
                "Gar keine KI nutzen, das ist generell verboten",
                "Die Lernenden um Erlaubnis fragen",
              ],
              correctIndex: 1,
              explanation:
                "Persönliche Daten dürfen nicht in generative KI eingegeben werden. Die Texte müssen zuerst anonymisiert werden.",
            },
            {
              situation:
                "Ein Lernender filmt während des Unterrichts andere Lernende ohne deren Wissen.",
              options: [
                "Das ist erlaubt, sie sind im öffentlichen Raum",
                "Aufnahmen sofort stoppen – Einwilligung ist erforderlich",
                "Nur problematisch wenn es veröffentlicht wird",
                "Ist okay, solange das Gesicht nicht erkennbar ist",
              ],
              correctIndex: 1,
              explanation:
                "Aufnahmen von Personen dürfen nur mit deren ausdrücklicher Einwilligung gemacht und erst recht nicht ohne Einwilligung veröffentlicht werden.",
            },
            {
              situation:
                "Eine Lehrkraft zeigt die individuellen Quiz-Ergebnisse aller Lernenden auf dem Beamer.",
              options: [
                "Das ist normaler Unterricht",
                "Persönliche Statistiken dürfen nicht vor der Klasse offengelegt werden",
                "Ist okay wenn es zur Motivation dient",
                "Nur problematisch bei schlechten Noten",
              ],
              correctIndex: 1,
              explanation:
                "Persönliche Lernstatistiken und Ergebnisse dürfen nicht vor der ganzen Klasse gezeigt werden.",
            },
          ]}
          onComplete={() => markInteractiveComplete("datenschutz")}
        />
      </div>

      {/* Quiz */}
      <div className="mt-8">
        <QuizMultipleChoice
          question="Welche Regeln gelten für den Einsatz von generativer KI an der BBW?"
          options={[
            { text: "Keine persönlichen Daten eingeben", correct: true },
            { text: "Vertrauliche Informationen dürfen nicht verwendet werden", correct: true },
            { text: "Anmeldung bei KI-Tools kann erzwungen werden", correct: false },
            { text: "Öffentliche Schulinfos dürfen verwendet werden", correct: true },
          ]}
          explanation="Generative KI darf nicht mit persönlichen Daten oder vertraulichen Infos gefüttert werden. Anmeldung ist freiwillig. Öffentliche Schulinfos sind erlaubt."
          onCorrect={() => markQuizPassed("datenschutz")}
        />
      </div>
    </SectionCard>
  );
}
