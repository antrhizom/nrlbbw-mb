"use client";

import { useState, useMemo, useEffect } from "react";

interface Scenario {
  situation: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface ShuffledScenario {
  situation: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface ScenarioMatcherProps {
  title: string;
  scenarios: Scenario[];
  onComplete: () => void;
}

function shuffleOptions(scenario: Scenario): ShuffledScenario {
  const indices = scenario.options.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return {
    situation: scenario.situation,
    options: indices.map((i) => scenario.options[i]),
    correctIndex: indices.indexOf(scenario.correctIndex),
    explanation: scenario.explanation,
  };
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ScenarioMatcher({
  title,
  scenarios,
  onComplete,
}: ScenarioMatcherProps) {
  const shuffledScenarios = useMemo(
    () => shuffleArray(scenarios).map(shuffleOptions),
    [scenarios]
  );
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(0);

  const scenario = shuffledScenarios[currentScenario];
  const isLastScenario = currentScenario >= shuffledScenarios.length - 1;

  const handleSelect = (index: number) => {
    if (showResult && isCorrect) return;
    setSelected(index);
    setShowResult(false);
  };

  const handleCheck = () => {
    if (selected === null) return;
    const correct = selected === scenario.correctIndex;
    setIsCorrect(correct);
    setShowResult(true);
  };

  // Auto-advance: when correct on last scenario, auto-complete after a short delay
  useEffect(() => {
    if (showResult && isCorrect) {
      if (isLastScenario) {
        const timer = setTimeout(() => {
          setCompleted(shuffledScenarios.length);
          onComplete();
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [showResult, isCorrect, isLastScenario, shuffledScenarios.length, onComplete]);

  const handleNext = () => {
    const newCompleted = completed + 1;
    setCompleted(newCompleted);
    if (currentScenario < shuffledScenarios.length - 1) {
      setCurrentScenario((prev) => prev + 1);
      setSelected(null);
      setShowResult(false);
      setIsCorrect(false);
    }
    if (newCompleted === shuffledScenarios.length) {
      onComplete();
    }
  };

  const allDone = completed === shuffledScenarios.length;

  return (
    <div className="bg-bbw-green-50 rounded-xl p-6">
      <h4 className="font-semibold text-gray-800 mb-2">🎭 {title}</h4>
      <p className="text-sm text-gray-500 mb-4">
        Szenario {currentScenario + 1} von {shuffledScenarios.length}
      </p>

      {!allDone ? (
        <>
          <div className="bg-white rounded-lg p-4 border-2 border-bbw-blue-300 mb-4">
            <p className="font-medium text-gray-800">💬 {scenario.situation}</p>
          </div>

          <p className="text-sm text-gray-600 mb-3">
            Was ist die richtige Reaktion?
          </p>

          <div className="space-y-2">
            {scenario.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={showResult && isCorrect}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all text-sm ${
                  selected === i
                    ? showResult
                      ? i === scenario.correctIndex
                        ? "border-green-500 bg-green-50"
                        : "border-red-400 bg-red-50 animate-shake"
                      : "border-bbw-green-500 bg-bbw-green-50"
                    : showResult && i === scenario.correctIndex
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-white hover:border-bbw-green-200"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="mt-4 flex gap-3">
            {!showResult || !isCorrect ? (
              <button
                onClick={handleCheck}
                disabled={selected === null}
                className={`px-5 py-2 rounded-lg font-medium transition-colors ${
                  selected !== null
                    ? "bg-bbw-green-500 text-white hover:bg-bbw-green-600"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Überprüfen
              </button>
            ) : !isLastScenario ? (
              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-lg font-medium bg-bbw-green-500 text-white hover:bg-bbw-green-600 transition-colors"
              >
                Nächstes Szenario →
              </button>
            ) : null}
          </div>

          {showResult && (
            <div
              className={`mt-4 p-4 rounded-lg ${isCorrect ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"}`}
            >
              <p className="font-medium text-sm">
                {isCorrect ? "✅ Richtig!" : "❌ Leider falsch. Versuche es nochmal!"}
              </p>
              {isCorrect && (
                <p className="text-sm text-gray-600 mt-1">
                  {scenario.explanation}
                </p>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-4">
          <p className="text-bbw-green-700 font-medium">
            ✅ Alle {shuffledScenarios.length} Szenarien erfolgreich bearbeitet!
          </p>
        </div>
      )}
    </div>
  );
}
