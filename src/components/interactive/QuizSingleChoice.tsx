"use client";

import { useState } from "react";

interface QuizOption {
  text: string;
  correct: boolean;
}

interface QuizSingleChoiceProps {
  question: string;
  options: QuizOption[];
  explanation: string;
  onCorrect: () => void;
}

export default function QuizSingleChoice({
  question,
  options,
  explanation,
  onCorrect,
}: QuizSingleChoiceProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelect = (index: number) => {
    if (showResult && isCorrect) return;
    setSelected(index);
    setShowResult(false);
  };

  const handleCheck = () => {
    if (selected === null) return;
    const correct = options[selected].correct;
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) onCorrect();
  };

  return (
    <div className="bg-bbw-blue-100 rounded-xl p-6">
      <h4 className="font-semibold text-gray-800 mb-4">📝 {question}</h4>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={showResult && isCorrect}
            className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
              selected === i
                ? showResult
                  ? opt.correct
                    ? "border-green-500 bg-green-50 text-green-800"
                    : "border-red-400 bg-red-50 text-red-800 animate-shake"
                  : "border-bbw-green-500 bg-bbw-green-50"
                : showResult && opt.correct
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-white hover:border-bbw-green-200"
            }`}
          >
            {opt.text}
          </button>
        ))}
      </div>
      {!showResult || !isCorrect ? (
        <button
          onClick={handleCheck}
          disabled={selected === null}
          className={`mt-4 px-5 py-2 rounded-lg font-medium transition-colors ${
            selected !== null
              ? "bg-bbw-green-500 text-white hover:bg-bbw-green-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Überprüfen
        </button>
      ) : null}
      {showResult && (
        <div
          className={`mt-4 p-4 rounded-lg ${isCorrect ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"}`}
        >
          <p className="font-medium">
            {isCorrect ? "✅ Richtig!" : "❌ Leider falsch. Versuche es nochmal!"}
          </p>
          {isCorrect && (
            <p className="text-sm text-gray-600 mt-1">{explanation}</p>
          )}
        </div>
      )}
    </div>
  );
}
