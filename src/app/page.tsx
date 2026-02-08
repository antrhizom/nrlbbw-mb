"use client";

import { useMerkblatt } from "@/context/MerkblattContext";
import ProgressBar from "@/components/ProgressBar";
import SectionNav from "@/components/SectionNav";
import WelcomeSection from "@/components/sections/WelcomeSection";
import AllgemeineSection from "@/components/sections/AllgemeineSection";
import NutzungITSection from "@/components/sections/NutzungITSection";
import DatensicherheitSection1 from "@/components/sections/DatensicherheitSection1";
import DatensicherheitSection2 from "@/components/sections/DatensicherheitSection2";
import DatenschutzSection from "@/components/sections/DatenschutzSection";
import UrheberrechtSection from "@/components/sections/UrheberrechtSection";
import VerstoesseSection from "@/components/sections/VerstoesseSection";
import CompletionSection from "@/components/sections/CompletionSection";

const SECTIONS = [
  WelcomeSection,
  AllgemeineSection,
  NutzungITSection,
  DatensicherheitSection1,
  DatensicherheitSection2,
  DatenschutzSection,
  UrheberrechtSection,
  VerstoesseSection,
  CompletionSection,
];

export default function Home() {
  const { currentIndex } = useMerkblatt();
  const CurrentSection = SECTIONS[currentIndex];

  return (
    <div className="min-h-screen bg-[#f8faf5]">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-bbw-green-500 flex items-center justify-center text-white font-bold text-lg">
              B
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900">
                Merkblatt NRL IKT
              </h1>
              <p className="text-xs text-gray-500">BBW Winterthur</p>
            </div>
          </div>
          <a
            href="/251126_Nutzungsrichtlinie_IKT_BBW.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-bbw-green-50 text-bbw-green-700 px-3 py-1.5 rounded-lg hover:bg-bbw-green-100 transition-colors font-medium"
          >
            Gesamt-NRL (PDF)
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <ProgressBar />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <CurrentSection />
          <SectionNav />
        </div>

        <footer className="mt-8 text-center text-xs text-gray-400 pb-8">
          <p>
            BBW Berufsbildungsschule Winterthur · Nutzungsrichtlinie IKT ·
            Version 09.2025
          </p>
          <p className="mt-1">
            <a
              href="/251126_Nutzungsrichtlinie_IKT_BBW.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-bbw-green-600"
            >
              Vollständige NRL als PDF herunterladen
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
