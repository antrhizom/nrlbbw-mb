"use client";

import { useMerkblatt } from "@/context/MerkblattContext";

export default function SectionNav() {
  const { currentIndex, totalSections, canProceed, goNext, goPrev } =
    useMerkblatt();

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSections - 1;

  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
      <button
        onClick={goPrev}
        disabled={isFirst}
        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
          isFirst
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        ← Zurück
      </button>

      {!isLast && (
        <button
          onClick={goNext}
          disabled={!canProceed}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            canProceed
              ? "bg-bbw-green-500 text-white hover:bg-bbw-green-600 animate-pulse-green"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Weiter →
        </button>
      )}
    </div>
  );
}
