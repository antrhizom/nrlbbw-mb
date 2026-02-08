"use client";

import { useMerkblatt, SECTION_IDS } from "@/context/MerkblattContext";

const SECTION_LABELS: Record<string, string> = {
  welcome: "Start",
  allgemein: "Allgemein",
  "nutzung-it": "IT-Nutzung",
  "datensicherheit-1": "Sicherheit I",
  "datensicherheit-2": "Sicherheit II",
  datenschutz: "Datenschutz",
  urheberrecht: "Urheberrecht",
  verstoesse: "Verstösse",
  abschluss: "Zertifikat",
};

export default function ProgressBar() {
  const { currentIndex, completedSections, progress } = useMerkblatt();

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">Fortschritt</span>
        <span className="text-sm font-semibold text-bbw-green-700">
          {progress}%
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-bbw-green-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex gap-1">
        {SECTION_IDS.map((id, i) => (
          <div
            key={id}
            className={`flex-1 h-1.5 rounded-full transition-colors ${
              i === currentIndex
                ? "bg-bbw-green-500"
                : completedSections.has(id)
                  ? "bg-bbw-green-200"
                  : "bg-gray-200"
            }`}
            title={SECTION_LABELS[id]}
          />
        ))}
      </div>
    </div>
  );
}
