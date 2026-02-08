"use client";

import { useMerkblatt } from "@/context/MerkblattContext";
import SectionCard from "@/components/SectionCard";
import ScenarioMatcher from "@/components/interactive/ScenarioMatcher";
import QuizSingleChoice from "@/components/interactive/QuizSingleChoice";

export default function DatensicherheitSection2() {
  const { markInteractiveComplete, markQuizPassed } = useMerkblatt();

  return (
    <SectionCard chapterLabel="Kapitel 3 (Teil 2)" title="Datensicherheit – Schutz, Kommunikation & Meldepflicht">
      {/* 3.5 Malware-Schutz */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-bbw-green-700 mb-2">Malware-Schutz</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Schutzsoftware darf nicht umgangen oder deaktiviert werden.</li>
          <li>Alle verfügbaren Sicherheitsupdates müssen zeitnah installiert werden.</li>
          <li>Nur vertrauenswürdige Geräte dürfen mit dem Schulnetz verbunden werden.</li>
        </ul>
      </div>

      {/* 3.6 E-Mails & Werbung */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-bbw-green-700 mb-2">Verdächtige E-Mails & Werbung</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Verdächtige E-Mails sofort löschen und als Spam melden.</li>
          <li>Keine Anhänge von unbekannten Absendern öffnen.</li>
          <li>Nicht auf Werbung oder Pop-ups klicken.</li>
        </ul>
      </div>

      {/* 3.7 Kommunikation */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-bbw-green-700 mb-2">Kommunikation</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Die Schul-E-Mail-Adresse darf nur für schulische Korrespondenz verwendet werden.</li>
          <li>Vertrauliche Nachrichten müssen verschlüsselt versendet werden.</li>
          <li>Bei grossen Verteilern immer BCC verwenden, um E-Mail-Adressen zu schützen.</li>
          <li>Nur schulische Collaboration-Tools nutzen (z.B. Microsoft Teams).</li>
        </ul>
      </div>

      {/* 3.8 Netzwerk & verbotene Inhalte */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-bbw-green-700 mb-2">Netzwerk & verbotene Inhalte</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Der Zugang zum Schulnetz ist persönlich – Gastnetz für schulfremde Geräte nutzen.</li>
          <li>Keine grossen privaten Downloads über das Schulnetz.</li>
          <li>VPN oder Proxy zur Umgehung der Netzwerksicherheit ist verboten.</li>
          <li>Verbotene Inhalte: pornografisch, rassistisch, gewalttätig oder terroristisch.</li>
        </ul>
      </div>

      {/* 3.9 Heimarbeit & Meldepflicht */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-bbw-green-700 mb-2">Heimarbeit & Meldepflicht</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Bei mobiler Arbeit den Bildschirm vor fremden Blicken schützen.</li>
          <li>Sichtschutzfilter verwenden, wenn vertrauliche Daten bearbeitet werden.</li>
          <li>
            <strong>Meldepflicht:</strong> Sicherheitsvorfälle, Verlust von IT-Geräten oder verdächtige Aktivitäten
            müssen sofort dem PIKT- oder TIKT-Team gemeldet werden.
          </li>
        </ul>
      </div>

      {/* Interactive: ScenarioMatcher */}
      <div className="mt-8">
        <ScenarioMatcher
          title="Sicherheitsszenarien"
          scenarios={[
            {
              situation:
                "Du erhältst eine E-Mail mit einem Anhang von einem unbekannten Absender. Der Betreff lautet 'Dringende Rechnung'.",
              options: [
                "Anhang öffnen, könnte wichtig sein",
                "E-Mail löschen und als Spam melden",
                "E-Mail an Kollegen weiterleiten",
                "Anhang auf VirusTotal prüfen",
              ],
              correctIndex: 1,
              explanation:
                "Verdächtige E-Mails müssen gelöscht und als Spam gemeldet werden. Anhänge von unbekannten Absendern dürfen nicht geöffnet werden.",
            },
            {
              situation:
                "Du arbeitest im Zug an vertraulichen Schülerdaten. Der Platz neben dir ist besetzt.",
              options: [
                "Normal weiterarbeiten",
                "Sichtschutzfilter verwenden und Sitzplatz wechseln",
                "Den Laptop zuklappen und später weiterarbeiten",
                "Die Person neben dir bitten wegzuschauen",
              ],
              correctIndex: 1,
              explanation:
                "Bei Heimarbeit/mobiler Arbeit muss der Bildschirm vor fremden Blicken geschützt werden – am besten mit einem Sichtschutzfilter und passender Sitzwahl.",
            },
            {
              situation:
                "Du bemerkst, dass dein Schulkonto von einem unbekannten Gerät aus verwendet wird.",
              options: [
                "Abwarten und beobachten",
                "Passwort ändern und Vorfall dem TIKT-Team melden",
                "Konto löschen und neues erstellen",
                "Die IT-Abteilung nächste Woche informieren",
              ],
              correctIndex: 1,
              explanation:
                "Sicherheitsvorfälle müssen sofort gemeldet werden – Passwort ändern und PIKT/TIKT-Team kontaktieren.",
            },
          ]}
          onComplete={() => markInteractiveComplete("datensicherheit-2")}
        />
      </div>

      {/* Quiz */}
      <div className="mt-8">
        <QuizSingleChoice
          question="Was musst du bei einem Sicherheitsvorfall tun?"
          options={[
            { text: "Abwarten und selbst versuchen zu lösen", correct: false },
            { text: "Sofort dem PIKT- oder TIKT-Team melden", correct: true },
            { text: "Den Vorfall ignorieren, wenn nichts passiert ist", correct: false },
            { text: "Nur die Schulleitung informieren", correct: false },
          ]}
          explanation="Sicherheitsvorfälle, Verlust von IT-Geräten oder verdächtige Aktivitäten müssen sofort dem PIKT- oder TIKT-Team gemeldet werden."
          onCorrect={() => markQuizPassed("datensicherheit-2")}
        />
      </div>
    </SectionCard>
  );
}
