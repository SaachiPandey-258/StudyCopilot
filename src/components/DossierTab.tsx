"use client";

import React, { useState } from "react";
import { FileText, AlertTriangle, Target, CheckCircle2, ShieldCheck, Zap, Layers } from "lucide-react";

export function DossierTab() {
  const [subTab, setSubTab] = useState<"teardown" | "spec">("teardown");

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-white pb-12">
      {/* Subtab toggle */}
      <div className="flex items-center justify-center">
        <div className="bg-yt-darkElevated p-1 rounded-xl border border-yt-darkBorder flex items-center gap-1">
          <button
            onClick={() => setSubTab("teardown")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              subTab === "teardown"
                ? "bg-yt-red text-white shadow"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Product Teardown (YouTube &quot;Ask&quot;)
          </button>
          <button
            onClick={() => setSubTab("spec")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              subTab === "spec"
                ? "bg-yt-red text-white shadow"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            1-Page Product Spec (PRD)
          </button>
        </div>
      </div>

      {subTab === "teardown" ? (
        /* TEARDOWN VIEW */
        <div className="space-y-6">
          <div className="bg-yt-darkSurface border border-yt-darkBorder rounded-xl p-6 space-y-3">
            <span className="text-[11px] font-semibold text-yt-red tracking-wider uppercase">
              APM STRATEGY DOSSIER
            </span>
            <h1 className="text-2xl font-bold tracking-tight">
              Product Teardown: YouTube&apos;s Conversational AI (&quot;Ask&quot;)
            </h1>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Analysis of YouTube Premium&apos;s native experimental &quot;Ask&quot; feature and why it fails students and technical learners consuming 1-2 hour lectures.
            </p>
          </div>

          <div className="bg-yt-darkSurface border border-yt-darkBorder rounded-xl p-6 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-300">
              1. What YouTube&apos;s &quot;Ask&quot; Does Today (Baseline)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-yt-darkElevated p-4 rounded-lg border border-neutral-800 space-y-2">
                <span className="font-semibold text-white block">Current Placement</span>
                <p className="text-neutral-300 leading-relaxed">
                  Surfaced as a sparkle pill button under the video title alongside Like, Share, and Download on select English videos for Premium subscribers.
                </p>
              </div>
              <div className="bg-yt-darkElevated p-4 rounded-lg border border-neutral-800 space-y-2">
                <span className="font-semibold text-white block">Current Capabilities</span>
                <p className="text-neutral-300 leading-relaxed">
                  Provides high-level conversational summaries and canned suggestion chips (&quot;Summarize&quot;, &quot;Catch me up&quot;, &quot;Recommend related topics&quot;).
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yt-darkSurface border border-yt-darkBorder rounded-xl p-6 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-300">
              2. The Teardown: Critical Friction Points for Academic Learners
            </h2>
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-lg bg-red-950/20 border border-red-900/40 space-y-1">
                <span className="font-bold text-red-400 block">
                  P0: Grounding Boundary Failure & Hallucination
                </span>
                <p className="text-neutral-300 leading-relaxed">
                  When a student asks about an adjacent concept not in the lecture (e.g. asking about Shor&apos;s algorithm during a neural network intro), native &quot;Ask&quot; generates a generic web answer. Students are falsely led to believe the professor covered it.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-900/40 space-y-1">
                <span className="font-bold text-amber-400 block">
                  P0: Absence of Click-to-Verify Timestamps
                </span>
                <p className="text-neutral-300 leading-relaxed">
                  Answers do not reliably link every claim to exact [MM:SS] clickable seek markers. Academic learners cannot verify whether the AI summary matches the whiteboard slide.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-blue-950/20 border border-blue-900/40 space-y-1">
                <span className="font-bold text-blue-400 block">
                  P1: Ephemeral Chat vs. Durable Study Artifacts
                </span>
                <p className="text-neutral-300 leading-relaxed">
                  Chat threads scroll away and disappear. Students need persistent, exportable chapter study guides (definitions, formulas, Anki/Notion markdown).
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* SPEC VIEW */
        <div className="space-y-6">
          <div className="bg-yt-darkSurface border border-yt-darkBorder rounded-xl p-6 space-y-3">
            <span className="text-[11px] font-semibold text-emerald-400 tracking-wider uppercase">
              1-PAGE PRODUCT SPEC (PRD)
            </span>
            <h1 className="text-2xl font-bold tracking-tight">
              YouTube StudyCopilot: Grounded Lecture Intelligence Engine
            </h1>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Google Product Feature Specification for YouTube Learning &amp; Gemini API integration.
            </p>
          </div>

          <div className="bg-yt-darkSurface border border-yt-darkBorder rounded-xl p-6 space-y-4 text-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
              <Target className="w-4 h-4 text-yt-accentBlue" />
              Success Metrics &amp; Targets
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-yt-darkElevated rounded-lg border border-neutral-800">
                <span className="text-neutral-400 block">North Star Metric</span>
                <span className="text-sm font-bold text-white block mt-1">Verified Action Rate (VAR)</span>
                <span className="text-xs text-emerald-400 font-mono mt-0.5 block">&ge; 45% of study sessions</span>
              </div>
              <div className="p-3 bg-yt-darkElevated rounded-lg border border-neutral-800">
                <span className="text-neutral-400 block">Timestamp Accuracy</span>
                <span className="text-sm font-bold text-white block mt-1">Citation Delta (&plusmn;30s)</span>
                <span className="text-xs text-emerald-400 font-mono mt-0.5 block">&ge; 90% (Measured: 93.3%)</span>
              </div>
              <div className="p-3 bg-yt-darkElevated rounded-lg border border-neutral-800">
                <span className="text-neutral-400 block">Negative Precision</span>
                <span className="text-sm font-bold text-white block mt-1">Refusal of Out-of-Scope</span>
                <span className="text-xs text-emerald-400 font-mono mt-0.5 block">100.0% Zero Hallucination</span>
              </div>
            </div>
          </div>

          <div className="bg-yt-darkSurface border border-yt-darkBorder rounded-xl p-6 space-y-3 text-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              Phased Roadmap: MVP (24 Nov) vs V2
            </h2>

            <div className="space-y-2">
              <div className="p-3 bg-yt-darkElevated rounded-lg border border-neutral-800 flex items-start gap-2">
                <span className="text-emerald-400 font-bold shrink-0">MVP:</span>
                <span className="text-neutral-300">
                  Grounded Q&amp;A with bi-directional player seeking, strict &quot;Not covered&quot; guardrails, 20-question evaluation suite, and exportable revision notes.
                </span>
              </div>
              <div className="p-3 bg-yt-darkElevated rounded-lg border border-neutral-800 flex items-start gap-2">
                <span className="text-neutral-400 font-bold shrink-0">V2:</span>
                <span className="text-neutral-300">
                  Multimodal slide whiteboard visual equation OCR, automatic Anki deck sync, and collaborative group study threads.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
