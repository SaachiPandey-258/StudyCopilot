"use client";

import React, { useState } from "react";
import { BookOpen, Copy, Check, Clock, HelpCircle, ChevronDown, ChevronUp, Share2, Sparkles } from "lucide-react";
import { PresetLecture } from "@/lib/presetLectures";

interface RevisionNotesTabProps {
  activeLecture: PresetLecture;
  onSeek: (seconds: number) => void;
}

export function RevisionNotesTab({ activeLecture, onSeek }: RevisionNotesTabProps) {
  const [copied, setCopied] = useState(false);
  const [revealedQuiz, setRevealedQuiz] = useState<Record<number, boolean>>({});

  const toggleQuiz = (idx: number) => {
    setRevealedQuiz((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const copyMarkdown = () => {
    const md = `# Revision Guide: ${activeLecture.title}
**Speaker / Channel:** ${activeLecture.channel}
**Duration:** ${activeLecture.duration}

## Executive Summary
${activeLecture.revisionGuide.executiveSummary}

## Core Principles
${activeLecture.revisionGuide.corePrinciples.map((p) => `* ${p}`).join("\n")}

## Key Technical Definitions
${activeLecture.revisionGuide.keyDefinitions
  .map((d) => `### ${d.term} [${d.timestamp}]\n${d.definition}`)
  .join("\n\n")}

## Lecture Chapters
${activeLecture.chapters.map((c) => `* **[${c.timestamp}] ${c.title}**: ${c.summary}`).join("\n")}

## Diagnostic Self-Check Questions
${activeLecture.revisionGuide.quickQuiz
  .map((q, i) => `${i + 1}. **${q.question}** [${q.timestamp}]\n   *Answer:* ${q.answer}`)
  .join("\n\n")}
`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-white pb-12">
      {/* Top Banner */}
      <div className="bg-yt-darkSurface border border-yt-darkBorder rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <Sparkles className="w-4 h-4" />
            AI-SYNTHESIZED REVISION GUIDE
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            {activeLecture.title}
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Structured study notes, key formulas, and self-testing diagnostics by {activeLecture.channel}
          </p>
        </div>

        <button
          onClick={copyMarkdown}
          className="flex items-center gap-2 px-3.5 py-2 bg-yt-darkElevated hover:bg-neutral-800 border border-neutral-700 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shadow-sm"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Copied Markdown!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-yt-accentBlue" />
              <span>Export for Notion / Obsidian</span>
            </>
          )}
        </button>
      </div>

      {/* Section 1: Executive Summary */}
      <div className="bg-yt-darkSurface border border-yt-darkBorder rounded-xl p-5 space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-yt-accentBlue" />
          Executive Takeaway
        </h2>
        <p className="text-xs text-neutral-200 leading-relaxed bg-yt-darkElevated/70 p-4 rounded-lg border border-neutral-800">
          {activeLecture.revisionGuide.executiveSummary}
        </p>
      </div>

      {/* Section 2: Core Principles */}
      <div className="bg-yt-darkSurface border border-yt-darkBorder rounded-xl p-5 space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
          High-Yield Core Principles
        </h2>
        <ul className="space-y-2 text-xs text-neutral-200">
          {activeLecture.revisionGuide.corePrinciples.map((principle, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 p-2.5 rounded-lg bg-yt-darkElevated/50 border border-neutral-800/80"
            >
              <span className="w-5 h-5 rounded-full bg-blue-950 text-yt-accentBlue flex items-center justify-center font-bold text-[10px] shrink-0 border border-blue-800/50">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{principle}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Section 3: Key Definitions with Timestamps */}
      <div className="bg-yt-darkSurface border border-yt-darkBorder rounded-xl p-5 space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
          Key Technical Definitions (Click to Jump)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {activeLecture.revisionGuide.keyDefinitions.map((def, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-yt-darkElevated rounded-lg border border-neutral-800 space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-xs font-bold text-white">{def.term}</h3>
                  <button
                    onClick={() => onSeek(def.seconds)}
                    className="flex items-center gap-1 text-[11px] font-mono font-semibold text-yt-accentBlue hover:text-white bg-blue-950/60 hover:bg-blue-800 px-2 py-0.5 rounded border border-blue-700/50 transition-colors"
                  >
                    <Clock className="w-2.5 h-2.5" />
                    {def.timestamp}
                  </button>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {def.definition}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Diagnostic Self-Check (Active Recall) */}
      <div className="bg-yt-darkSurface border border-yt-darkBorder rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            Active Recall Self-Test
          </h2>
          <span className="text-[11px] text-neutral-400">
            {activeLecture.revisionGuide.quickQuiz.length} Questions
          </span>
        </div>

        <div className="space-y-2.5">
          {activeLecture.revisionGuide.quickQuiz.map((item, idx) => {
            const isRevealed = !!revealedQuiz[idx];
            return (
              <div
                key={idx}
                className="bg-yt-darkElevated rounded-lg border border-neutral-800 p-3.5 space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-bold text-amber-400">Q{idx + 1}:</span>
                    <span className="text-xs font-medium text-white leading-relaxed">
                      {item.question}
                    </span>
                  </div>
                  <button
                    onClick={() => onSeek(item.seconds)}
                    className="flex items-center gap-1 text-[10px] font-mono text-neutral-400 hover:text-white shrink-0 bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800"
                  >
                    <Clock className="w-2.5 h-2.5 text-yt-accentBlue" />
                    {item.timestamp}
                  </button>
                </div>

                <div className="pt-1">
                  <button
                    onClick={() => toggleQuiz(idx)}
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-yt-accentBlue hover:text-blue-300"
                  >
                    {isRevealed ? (
                      <>
                        <ChevronUp className="w-3.5 h-3.5" /> Hide Answer
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3.5 h-3.5" /> Reveal Verified Answer
                      </>
                    )}
                  </button>

                  {isRevealed && (
                    <div className="mt-2 p-2.5 bg-neutral-900/90 rounded border-l-2 border-emerald-500 text-xs text-neutral-200 leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
