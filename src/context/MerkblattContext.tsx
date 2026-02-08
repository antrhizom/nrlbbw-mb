"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export const SECTION_IDS = [
  "welcome",
  "allgemein",
  "nutzung-it",
  "datensicherheit-1",
  "datensicherheit-2",
  "datenschutz",
  "urheberrecht",
  "verstoesse",
  "abschluss",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

interface MerkblattState {
  currentIndex: number;
  completedSections: Set<SectionId>;
  interactiveCompleted: Record<string, boolean>;
  quizPassed: Record<string, boolean>;
}

interface MerkblattContextType extends MerkblattState {
  currentSectionId: SectionId;
  totalSections: number;
  progress: number;
  canProceed: boolean;
  goNext: () => void;
  goPrev: () => void;
  goTo: (index: number) => void;
  markInteractiveComplete: (sectionId: string) => void;
  markQuizPassed: (sectionId: string) => void;
  isFullyCompleted: boolean;
}

const MerkblattContext = createContext<MerkblattContextType | null>(null);

export function MerkblattProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<MerkblattState>({
    currentIndex: 0,
    completedSections: new Set(),
    interactiveCompleted: {},
    quizPassed: {},
  });

  const currentSectionId = SECTION_IDS[state.currentIndex];
  const totalSections = SECTION_IDS.length;
  const completableCount = totalSections - 1; // exclude "abschluss"
  const completedCount = state.completedSections.size;
  const progress = Math.round((completedCount / completableCount) * 100);

  const sectionNeedsInteractive = (id: SectionId) =>
    id !== "welcome" && id !== "abschluss";

  const sectionNeedsQuiz = (id: SectionId) =>
    id !== "welcome" && id !== "abschluss";

  const canProceed =
    currentSectionId === "welcome" ||
    currentSectionId === "abschluss" ||
    ((!sectionNeedsInteractive(currentSectionId) ||
      state.interactiveCompleted[currentSectionId]) &&
      (!sectionNeedsQuiz(currentSectionId) ||
        state.quizPassed[currentSectionId]));

  const markSectionComplete = useCallback((id: SectionId) => {
    setState((prev) => {
      const next = new Set(prev.completedSections);
      next.add(id);
      return { ...prev, completedSections: next };
    });
  }, []);

  const goNext = useCallback(() => {
    setState((prev) => {
      const currentId = SECTION_IDS[prev.currentIndex];
      if (currentId !== "abschluss") {
        const next = new Set(prev.completedSections);
        next.add(currentId);
        return {
          ...prev,
          completedSections: next,
          currentIndex: Math.min(prev.currentIndex + 1, totalSections - 1),
        };
      }
      return prev;
    });
  }, [totalSections]);

  const goPrev = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentIndex: Math.max(prev.currentIndex - 1, 0),
    }));
  }, []);

  const goTo = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      currentIndex: Math.max(0, Math.min(index, SECTION_IDS.length - 1)),
    }));
  }, []);

  const markInteractiveComplete = useCallback((sectionId: string) => {
    setState((prev) => ({
      ...prev,
      interactiveCompleted: { ...prev.interactiveCompleted, [sectionId]: true },
    }));
  }, []);

  const markQuizPassed = useCallback((sectionId: string) => {
    setState((prev) => ({
      ...prev,
      quizPassed: { ...prev.quizPassed, [sectionId]: true },
    }));
  }, []);

  const isFullyCompleted = SECTION_IDS.filter(
    (id) => id !== "welcome" && id !== "abschluss"
  ).every((id) => state.completedSections.has(id));

  return (
    <MerkblattContext.Provider
      value={{
        ...state,
        currentSectionId,
        totalSections,
        progress,
        canProceed,
        goNext,
        goPrev,
        goTo,
        markInteractiveComplete,
        markQuizPassed,
        isFullyCompleted,
      }}
    >
      {children}
    </MerkblattContext.Provider>
  );
}

export function useMerkblatt() {
  const ctx = useContext(MerkblattContext);
  if (!ctx) throw new Error("useMerkblatt must be used within MerkblattProvider");
  return ctx;
}
