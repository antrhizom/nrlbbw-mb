"use client";

import { useState } from "react";

interface CheckItem {
  text: string;
  correct: boolean;
}

interface ChecklistInteractiveProps {
  title: string;
  description: string;
  items: CheckItem[];
  onComplete: () => void;
}

export default function ChecklistInteractive({
  title,
  description,
  items,
  onComplete,
}: ChecklistInteractiveProps) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const toggleItem = (index: number) => {
    if (showResult && isCorrect) return;
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
    setShowResult(false);
  };

  const handleCheck = () => {
    const correct = items.every(
      (item, i) => item.correct === checked.has(i)
    );
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) onComplete();
  };

  return (
    <div className="bg-bbw-green-50 rounded-xl p-6">
      <h4 className="font-semibold text-gray-800 mb-1">☑️ {title}</h4>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="space-y-2">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => toggleItem(i)}
            disabled={showResult && isCorrect}
            className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
              showResult
                ? checked.has(i)
                  ? item.correct
                    ? "border-green-400 bg-green-50"
                    : "border-red-400 bg-red-50"
                  : !item.correct
                    ? "border-green-200 bg-white"
                    : "border-amber-400 bg-amber-50"
                : checked.has(i)
                  ? "border-bbw-green-500 bg-bbw-green-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <span
              className={`w-5 h-5 rounded border-2 flex items-center justify-center text-xs flex-shrink-0 ${
                checked.has(i)
                  ? "border-bbw-green-500 bg-bbw-green-500 text-white"
                  : "border-gray-300"
              }`}
            >
              {checked.has(i) && "✓"}
            </span>
            <span className="text-sm">{item.text}</span>
            {showResult && (
              <span className="ml-auto text-sm flex-shrink-0">
                {item.correct ? "✅" : checked.has(i) ? "❌" : ""}
              </span>
            )}
          </button>
        ))}
      </div>
      <button
        onClick={handleCheck}
        disabled={showResult && isCorrect}
        className={`mt-4 px-5 py-2 rounded-lg font-medium transition-colors ${
          showResult && isCorrect
            ? "bg-green-100 text-green-700"
            : "bg-bbw-green-500 text-white hover:bg-bbw-green-600"
        }`}
      >
        {showResult && isCorrect ? "✅ Richtig!" : "Überprüfen"}
      </button>
      {showResult && !isCorrect && (
        <p className="mt-3 text-sm text-amber-700">
          Nicht ganz richtig. Korrigiere deine Auswahl und versuche es nochmal!
        </p>
      )}
    </div>
  );
}
