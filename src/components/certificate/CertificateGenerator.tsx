"use client";

import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { generateCertificateNumber } from "@/lib/greekNumerals";

export default function CertificateGenerator() {
  const [userName, setUserName] = useState<string>("");
  const [certificateNumber, setCertificateNumber] = useState<string | null>(
    null
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  useEffect(() => {
    fetchCompletionAndGenerateNumber();
  }, []);

  async function fetchCompletionAndGenerateNumber() {
    try {
      const alreadyCompleted =
        localStorage.getItem("nrl-merkblatt-completed") === "true";

      let count: number;

      if (alreadyCompleted) {
        // Don't increment again, just read the current count
        const res = await fetch("/api/complete", { method: "GET" });
        const data = await res.json();
        count = data.count;
      } else {
        const res = await fetch("/api/complete", { method: "POST" });
        const data = await res.json();
        count = data.count;
        localStorage.setItem("nrl-merkblatt-completed", "true");
      }

      const certNum = generateCertificateNumber(count);
      setCertificateNumber(certNum);
    } catch {
      const fallback = Math.floor(Math.random() * 9000) + 1000;
      const certNum = generateCertificateNumber(fallback);
      setCertificateNumber(certNum);
    }
  }

  function handleDownloadPDF() {
    if (!certificateNumber) return;

    setIsGenerating(true);

    try {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Light background
      doc.setFillColor(248, 250, 245);
      doc.rect(0, 0, pageWidth, pageHeight, "F");

      // Green border
      doc.setDrawColor(141, 182, 0);
      doc.setLineWidth(2);
      doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

      // Title: "Bestätigung"
      doc.setFont("helvetica", "bold");
      doc.setFontSize(28);
      doc.setTextColor(51, 51, 51);
      doc.text("Bestätigung", pageWidth / 2, 45, { align: "center" });

      // Subtitle
      doc.setFont("helvetica", "normal");
      doc.setFontSize(16);
      doc.setTextColor(80, 80, 80);
      doc.text(
        "Kenntnisnahme der Nutzungsrichtlinie IKT",
        pageWidth / 2,
        58,
        { align: "center" }
      );

      // School name
      doc.setFontSize(14);
      doc.setTextColor(100, 100, 100);
      doc.text("BBW Berufsbildungsschule Winterthur", pageWidth / 2, 70, {
        align: "center",
      });

      // Decorative line
      doc.setDrawColor(141, 182, 0);
      doc.setLineWidth(0.5);
      doc.line(pageWidth / 2 - 60, 78, pageWidth / 2 + 60, 78);

      // User name
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(33, 33, 33);
      const displayName =
        userName.trim() !== "" ? userName.trim() : "___________________";
      doc.text(displayName, pageWidth / 2, 95, { align: "center" });

      // Confirmation text
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60);
      doc.text(
        "hat das interaktive Merkblatt zur NRL IKT erfolgreich durchgearbeitet.",
        pageWidth / 2,
        110,
        { align: "center" }
      );

      // Date
      const now = new Date();
      const formattedDate = now.toLocaleDateString("de-CH", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      doc.setFontSize(12);
      doc.setTextColor(80, 80, 80);
      doc.text(`Datum: ${formattedDate}`, pageWidth / 2, 125, {
        align: "center",
      });

      // Certificate number at bottom
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Zertifikat-Nr.: ${certificateNumber}`,
        pageWidth / 2,
        pageHeight - 20,
        { align: "center" }
      );

      doc.save("NRL-Merkblatt-Zertifikat.pdf");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-300 p-8 shadow-lg max-w-xl mx-auto">
      {/* Congratulations message */}
      <h2 className="text-2xl md:text-3xl font-bold text-green-800 text-center mb-2">
        Herzlichen Glückwunsch!
      </h2>
      <p className="text-green-700 text-center mb-6">
        Du hast das interaktive Merkblatt zur NRL IKT erfolgreich
        durchgearbeitet.
      </p>

      {/* Certificate number box */}
      {certificateNumber ? (
        <div className="bg-white border border-green-400 rounded-xl px-6 py-4 mb-6 shadow-sm text-center">
          <span className="text-xs uppercase tracking-widest text-green-600 block mb-1">
            Deine Zertifikat-Nr.
          </span>
          <span className="text-lg md:text-xl font-mono font-bold text-green-900 tracking-wide">
            {certificateNumber}
          </span>
        </div>
      ) : (
        <div className="bg-white border border-green-200 rounded-xl px-6 py-4 mb-6 shadow-sm text-center animate-pulse">
          <span className="text-sm text-green-400">
            Zertifikatnummer wird generiert...
          </span>
        </div>
      )}

      {/* Name input */}
      <label
        htmlFor="userName"
        className="text-sm font-medium text-green-800 mb-1"
      >
        Dein Name (optional, erscheint auf dem Zertifikat)
      </label>
      <input
        id="userName"
        type="text"
        placeholder="Dein Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="w-full max-w-xs mb-6 px-4 py-2 border border-green-300 rounded-lg text-center text-green-900 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />

      {/* Download button */}
      <button
        onClick={handleDownloadPDF}
        disabled={isGenerating || !certificateNumber}
        className="bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white font-semibold px-6 py-3 rounded-xl shadow transition-colors duration-200 flex items-center gap-2"
      >
        {isGenerating ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Wird erstellt...
          </>
        ) : (
          "Zertifikat herunterladen (PDF)"
        )}
      </button>
    </div>
  );
}
