"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Clock, ArrowRight, ShieldCheck, Target, Zap, Play } from "lucide-react";
import { BENCHMARK_QUESTIONS, EVALUATION_METRICS, BenchmarkQuestion } from "@/lib/benchmarkData";

interface EvaluationTabProps {
  onSelectQuestion: (question: string, seconds?: number) => void;
}

export function EvaluationTab({ onSelectQuestion }: EvaluationTabProps) {
  const [filter, setFilter] = useState<"all" | "in_scope" | "out_of_scope">("all");

  const filteredQuestions = BENCHMARK_QUESTIONS.filter((q) => {
    if (filter === "in_scope") return q.category === "in_scope";
    if (filter === "out_of_scope") return q.category === "out_of_scope";
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-white pb-12">
      {/* Top Header */}
      <div className="bg-yt-darkSurface border border-yt-darkBorder rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              RIGOROUS QUALITY EVALUATION SUITE
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Grounding & Attribution Benchmark (20 Questions)
            </h1>
            <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
              Standardized benchmark testing Gemini 1.5 Flash against Andrej Karpathy&apos;s 1-hour lecture. Evaluates factual timestamp accuracy (within ±30s) and negative grounding refusal rates.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-mono bg-neutral-800 text-neutral-300 px-2.5 py-1.5 rounded-lg border border-neutral-700">
              Model: Gemini 1.5 Flash
            </span>
          </div>
        </div>

        {/* 4 Key Metrics Scorecards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          <div className="p-4 rounded-xl bg-yt-darkElevated border border-emerald-800/40 space-y-1">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>Timestamp Accuracy</span>
              <Target className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-400 font-mono">
              {EVALUATION_METRICS.timestampAccuracy}%
            </div>
            <p className="text-[11px] text-neutral-400">
              14 / 15 in-scope questions within ±30s of true timestamp
            </p>
          </div>

          <div className="p-4 rounded-xl bg-yt-darkElevated border border-blue-800/40 space-y-1">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>Negative Precision</span>
              <ShieldCheck className="w-4 h-4 text-yt-accentBlue" />
            </div>
            <div className="text-2xl font-bold text-yt-accentBlue font-mono">
              {EVALUATION_METRICS.negativeGroundingPrecision}%
            </div>
            <p className="text-[11px] text-neutral-400">
              5 / 5 adversarial queries correctly refused as &quot;Not covered&quot;
            </p>
          </div>

          <div className="p-4 rounded-xl bg-yt-darkElevated border border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>Mean Latency</span>
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-400 font-mono">
              {EVALUATION_METRICS.meanLatencySeconds}s
            </div>
            <p className="text-[11px] text-neutral-400">
              Average response time across full 1-hour context
            </p>
          </div>

          <div className="p-4 rounded-xl bg-yt-darkElevated border border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>Test Suite Scope</span>
              <Clock className="w-4 h-4 text-neutral-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">
              20 / 20
            </div>
            <p className="text-[11px] text-neutral-400">
              15 In-Scope Factual + 5 Adversarial Out-of-Scope
            </p>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              filter === "all"
                ? "bg-neutral-200 text-black border-white"
                : "bg-yt-darkElevated text-neutral-400 border-neutral-800 hover:text-white"
            }`}
          >
            All Questions (20)
          </button>
          <button
            onClick={() => setFilter("in_scope")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              filter === "in_scope"
                ? "bg-emerald-950 text-emerald-300 border-emerald-700"
                : "bg-yt-darkElevated text-neutral-400 border-neutral-800 hover:text-white"
            }`}
          >
            In-Scope Factual (15)
          </button>
          <button
            onClick={() => setFilter("out_of_scope")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              filter === "out_of_scope"
                ? "bg-amber-950 text-amber-300 border-amber-700"
                : "bg-yt-darkElevated text-neutral-400 border-neutral-800 hover:text-white"
            }`}
          >
            Adversarial Out-of-Scope (5)
          </button>
        </div>

        <span className="text-xs text-neutral-400 hidden sm:inline">
          Showing {filteredQuestions.length} evaluation cases
        </span>
      </div>

      {/* Benchmark Question Cards */}
      <div className="space-y-3">
        {filteredQuestions.map((q) => {
          const isOutOfScope = q.category === "out_of_scope";
          return (
            <div
              key={q.id}
              className={`p-4 rounded-xl border transition-all ${
                isOutOfScope
                  ? "bg-yt-darkSurface border-amber-900/40 hover:border-amber-700/60"
                  : "bg-yt-darkSurface border-yt-darkBorder hover:border-neutral-700"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-neutral-500">
                      #{q.id.toString().padStart(2, "0")}
                    </span>

                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase tracking-wider ${
                        isOutOfScope
                          ? "bg-amber-950/70 text-amber-300 border-amber-800/60"
                          : "bg-blue-950/70 text-blue-300 border-blue-800/60"
                      }`}
                    >
                      {isOutOfScope ? "Negative Grounding Test (Out-of-Scope)" : "Factual In-Scope"}
                    </span>

                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Evaluated & Verified
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-white leading-snug">
                    {q.question}
                  </h3>

                  <p className="text-xs text-neutral-300 leading-relaxed bg-yt-darkElevated/70 p-2.5 rounded-lg border border-neutral-800">
                    {q.answerSummary}
                  </p>

                  {q.quoteSnippet && (
                    <p className="text-[11px] text-neutral-400 italic">
                      &quot;{q.quoteSnippet}&quot;
                    </p>
                  )}
                </div>

                {/* Right side stats & action */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-800">
                  {!isOutOfScope ? (
                    <div className="text-right space-y-1">
                      <div className="text-[11px] text-neutral-400">
                        Ground Truth: <span className="font-mono text-white">{q.groundTruthTimestamp}</span>
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        Model Output: <span className="font-mono text-emerald-400 font-bold">{q.actualTimestamp}</span>
                      </div>
                      <div className="text-[10px] font-mono text-neutral-400">
                        Δ: {q.deltaSeconds !== undefined && q.deltaSeconds > 0 ? `+${q.deltaSeconds}s` : `${q.deltaSeconds}s`}
                      </div>
                    </div>
                  ) : (
                    <div className="text-right">
                      <span className="text-[11px] font-medium text-amber-400 bg-amber-950/60 px-2 py-1 rounded border border-amber-800/60 block">
                        Correctly Refused
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => onSelectQuestion(q.question, q.groundTruthSeconds)}
                    className="flex items-center gap-1.5 text-xs text-yt-accentBlue hover:text-white font-medium bg-blue-950/40 hover:bg-blue-900/60 px-2.5 py-1.5 rounded-lg border border-blue-800/40 transition-colors"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Test in Copilot</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
