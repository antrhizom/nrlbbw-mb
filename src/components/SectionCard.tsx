"use client";

import { ReactNode } from "react";

interface SectionCardProps {
  chapterLabel: string;
  title: string;
  reduced?: boolean;
  children: ReactNode;
}

export default function SectionCard({
  chapterLabel,
  title,
  reduced,
  children,
}: SectionCardProps) {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        {reduced && (
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
            Kurzfassung
          </span>
        )}
        <span className="text-xs text-bbw-green-600 font-medium uppercase tracking-wider">
          {chapterLabel}
        </span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="space-y-6">{children}</div>
    </div>
  );
}
