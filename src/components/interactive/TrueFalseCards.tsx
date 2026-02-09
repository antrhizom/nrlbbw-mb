"use client";

import { useState, useRef } from "react";

interface TFStatement {
  statement: string;
  isTrue: boolean;
  explanation: string;
}

interface TrueFalseCardsProps {
  title: string;
  statements: TFStatement[];
  onComplete: () => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function TrueFalseCards({
  title,
  statements,
  onComplete,
}: TrueFalseCardsProps) {
  const shuffledRef = useRef<TFStatement[] | null>(null);
  if (!shuffledRef.current) {
    shuffledRef.current = shuffleArray(statements);
  }
  const shuffledStatements = shuffledRef.current;

  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const handleAnswer = (index: number, answer: boolean) => {
    if (revealed.has(index)) return;
    setAnswers((prev) => ({ ...prev, [index]: answer }));
    setRevealed((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });

    const newRevealed = new Set(revealed);
    newRevealed.add(index);
    if (newRevealed.size === shuffledStatements.length) {
      onComplete();
    }
  };

  return (
    <div className="bg-bbw-green-50 rounded-xl p-6">
      <h4 className="font-semibold text-gray-800 mb-4">🎯 {title}</h4>
      <div className="space-y-3">
        {shuffledStatements.map((st, i) => {
          const answered = revealed.has(i);
          const correct = answers[i] === st.isTrue;

          return (
            <div
              key={i}
              className={`rounded-lg border-2 p-4 transition-all ${
                answered
                  ? correct
                    ? "border-green-300 bg-green-50"
                    : "border-red-300 bg-red-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <p className="font-medium text-gray-800 mb-3">{st.statement}</p>
              {!answered ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAnswer(i, true)}
                    className="px-4 py-2 rounded-lg bg-bbw-green-100 text-bbw-green-700 font-medium hover:bg-bbw-green-200 transition-colors"
                  >
                    ✓ Stimmt
                  </button>
                  <button
                    onClick={() => handleAnswer(i, false)}
                    className="px-4 py-2 rounded-lg bg-red-100 text-red-700 font-medium hover:bg-red-200 transition-colors"
                  >
                    ✗ Stimmt nicht
                  </button>
                </div>
              ) : (
                <div className="animate-fade-in">
                  <p className="text-sm font-medium">
                    {correct ? "✅ Richtig!" : "❌ Falsch!"} —{" "}
                    {st.isTrue ? "Die Aussage stimmt." : "Die Aussage stimmt nicht."}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{st.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {revealed.size === shuffledStatements.length && (
        <p className="mt-4 text-sm text-bbw-green-700 font-medium">
          ✅ Alle Aussagen bearbeitet!
        </p>
      )}
    </div>
  );
}
