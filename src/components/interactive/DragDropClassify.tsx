"use client";

import { useState } from "react";

interface DragItem {
  id: string;
  text: string;
  category: string;
}

interface DragDropClassifyProps {
  title: string;
  description: string;
  items: DragItem[];
  categories: string[];
  onComplete: () => void;
}

export default function DragDropClassify({
  title,
  description,
  items: initialItems,
  categories,
  onComplete,
}: DragDropClassifyProps) {
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const unplaced = initialItems.filter((item) => !placements[item.id]);

  const handleDragStart = (itemId: string) => {
    setDraggedItem(itemId);
  };

  const handleDrop = (category: string) => {
    if (!draggedItem) return;
    setPlacements((prev) => ({ ...prev, [draggedItem]: category }));
    setDraggedItem(null);
    setShowResult(false);
  };

  const handleRemove = (itemId: string) => {
    if (showResult && isCorrect) return;
    setPlacements((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    setShowResult(false);
  };

  const handleTapPlace = (itemId: string) => {
    if (showResult && isCorrect) return;
    if (draggedItem === itemId) {
      setDraggedItem(null);
    } else {
      setDraggedItem(itemId);
    }
  };

  const handleTapCategory = (category: string) => {
    if (!draggedItem) return;
    handleDrop(category);
  };

  const handleCheck = () => {
    const allPlaced = initialItems.every((item) => placements[item.id]);
    if (!allPlaced) return;

    const correct = initialItems.every(
      (item) => placements[item.id] === item.category
    );
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) onComplete();
  };

  const allPlaced = initialItems.every((item) => placements[item.id]);

  return (
    <div className="bg-bbw-green-50 rounded-xl p-6">
      <h4 className="font-semibold text-gray-800 mb-1">🔀 {title}</h4>
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      {unplaced.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">
            Tippe auf ein Element, dann auf die passende Kategorie:
          </p>
          <div className="flex flex-wrap gap-2">
            {unplaced.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTapPlace(item.id)}
                draggable
                onDragStart={() => handleDragStart(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium cursor-grab active:cursor-grabbing transition-all ${
                  draggedItem === item.id
                    ? "bg-bbw-green-500 text-white scale-105"
                    : "bg-white border-2 border-gray-300 hover:border-bbw-green-400"
                }`}
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const catItems = initialItems.filter(
            (item) => placements[item.id] === cat
          );
          return (
            <div
              key={cat}
              onClick={() => handleTapCategory(cat)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(cat)}
              className={`border-2 border-dashed rounded-lg p-3 min-h-[100px] transition-colors ${
                draggedItem
                  ? "border-bbw-green-400 bg-bbw-green-100 cursor-pointer"
                  : "border-gray-300 bg-white"
              }`}
            >
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {cat}
              </p>
              <div className="space-y-1">
                {catItems.map((item) => {
                  const correct =
                    showResult && placements[item.id] === item.category;
                  const wrong =
                    showResult && placements[item.id] !== item.category;
                  return (
                    <div
                      key={item.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(item.id);
                      }}
                      className={`px-2 py-1 rounded text-sm cursor-pointer transition-colors ${
                        correct
                          ? "bg-green-100 text-green-800 border border-green-300"
                          : wrong
                            ? "bg-red-100 text-red-800 border border-red-300 animate-shake"
                            : "bg-bbw-green-100 text-bbw-green-800 hover:bg-bbw-green-200"
                      }`}
                    >
                      {item.text} {correct && "✅"} {wrong && "❌"}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex gap-3 items-center">
        <button
          onClick={handleCheck}
          disabled={!allPlaced || (showResult && isCorrect)}
          className={`px-5 py-2 rounded-lg font-medium transition-colors ${
            allPlaced && !(showResult && isCorrect)
              ? "bg-bbw-green-500 text-white hover:bg-bbw-green-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {showResult && isCorrect ? "✅ Alles richtig!" : "Überprüfen"}
        </button>
        {showResult && !isCorrect && (
          <p className="text-sm text-amber-700">
            Einige Zuordnungen sind falsch. Klicke auf falsch platzierte Elemente, um sie zu entfernen.
          </p>
        )}
      </div>
    </div>
  );
}
