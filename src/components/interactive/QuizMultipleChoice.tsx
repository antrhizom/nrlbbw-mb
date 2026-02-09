"use client";

import { useState, useMemo } from "react";

interface QuizOption {
  text: string;
  correct: boolean;
}

interface QuizMultipleChoiceProps {
  question: string;
  options: QuizOption[];
  explanation: string;
  onCorrect: () => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function QuizMultipleChoice({
  question,
  options,
  explanation,
  onCorrect,
}: QuizMultipleChoiceProps) {
  const shuffledOptions = useMemo(() => shuffleArray(options), [options]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const toggleOption = (index: number) => {
    if (showResult && isCorrect) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
    setShowResult(false);
  };

  const handleCheck = () => {
    if (selected.size === 0) return;
    const correct = shuffledOptions.every(
      (opt, i) => opt.correct === selected.has(i)
    );
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) onCorrect();
  };

  return (
    <div className="bg-bbw-blue-100 rounded-xl p-6">
      <h4 className="font-semibold text-gray-800 mb-1">📝 {question}</h4>
      <p className="text-sm text-gray-500 mb-4">(Mehrere Antworten möglich)</p>
      <div className="space-y-2">
        {shuffledOptions.map((opt, i) => (
          <button
            key={i}
            onClick={() => toggleOption(i)}
            disabled={showResult && isCorrect}
            className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
              selected.has(i)
                ? showResult
                  ? opt.correct
                    ? "border-green-500 bg-green-50"
                    : "border-red-400 bg-red-50 animate-shake"
                  : "border-bbw-green-500 bg-bbw-green-50"
                : showResult && opt.correct
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-white hover:border-bbw-green-200"
            }`}
          >
            <span
              className={`w-5 h-5 rounded border-2 flex items-center justify-center text-xs ${
                selected.has(i)
                  ? "border-bbw-green-500 bg-bbw-green-500 text-white"
                  : "border-gray-300"
              }`}
            >
              {selected.has(i) && "✓"}
            </span>
            {opt.text}
          </button>
        ))}
      </div>
      {!showResult || !isCorrect ? (
        <button
          onClick={handleCheck}
          disabled={selected.size === 0}
          className={`mt-4 px-5 py-2 rounded-lg font-medium transition-colors ${
            selected.size > 0
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
            {isCorrect
              ? "✅ Richtig!"
              : "❌ Nicht ganz. Prüfe deine Auswahl und versuche es nochmal!"}
          </p>
          {isCorrect && (
            <p className="text-sm text-gray-600 mt-1">{explanation}</p>
          )}
        </div>
      )}
    </div>
  );
}
