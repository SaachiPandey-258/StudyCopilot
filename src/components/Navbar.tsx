"use client";

import React, { useState } from "react";
import { Sparkles, Key, CheckCircle, ExternalLink, BookOpen, BarChart3, FileText, Youtube } from "lucide-react";

interface NavbarProps {
  activeTab: "copilot" | "notes" | "eval" | "dossier";
  setActiveTab: (tab: "copilot" | "notes" | "eval" | "dossier") => void;
  apiKey: string;
  onOpenKeyModal: () => void;
}

export function Navbar({ activeTab, setActiveTab, apiKey, onOpenKeyModal }: NavbarProps) {
  return (
    <header className="border-b border-yt-darkBorder bg-yt-darkSurface/95 backdrop-blur sticky top-0 z-40 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-yt-red text-white shadow-md shadow-red-900/30">
            <Youtube className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight text-white">YouTube</span>
              <span className="font-semibold text-lg text-yt-accentBlue flex items-center gap-1">
                StudyCopilot
                <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 -mt-0.5">
              Grounded Lecture Intelligence & Revision Engine • Gemini 1.5
            </p>
          </div>
        </div>

        {/* Center: Navigation Tabs */}
        <nav className="hidden md:flex items-center bg-yt-darkElevated rounded-lg p-1 border border-yt-darkBorder/60">
          <button
            onClick={() => setActiveTab("copilot")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === "copilot"
                ? "bg-yt-darkSurface text-white shadow-sm border border-neutral-700"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Youtube className="w-3.5 h-3.5 text-yt-red" />
            Interactive Copilot
          </button>

          <button
            onClick={() => setActiveTab("notes")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === "notes"
                ? "bg-yt-darkSurface text-white shadow-sm border border-neutral-700"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            Revision Notes
          </button>

          <button
            onClick={() => setActiveTab("eval")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === "eval"
                ? "bg-yt-darkSurface text-white shadow-sm border border-neutral-700"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
            Evaluation Suite (20 Qs)
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-mono">
              93.3%
            </span>
          </button>

          <button
            onClick={() => setActiveTab("dossier")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === "dossier"
                ? "bg-yt-darkSurface text-white shadow-sm border border-neutral-700"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            Teardown & Spec
          </button>
        </nav>

        {/* Right: API Key & Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenKeyModal}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors ${
              apiKey
                ? "bg-emerald-950/40 border-emerald-700/60 text-emerald-300"
                : "bg-neutral-800/80 hover:bg-neutral-700 border-neutral-700 text-neutral-300"
            }`}
            title="Configure Gemini API Key"
          >
            <Key className="w-3.5 h-3.5" />
            <span>{apiKey ? "Live API Key Active" : "Demo (Cached Outputs)"}</span>
            {apiKey && <CheckCircle className="w-3 h-3 text-emerald-400" />}
          </button>

          <a
            href="https://ai.google.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white"
          >
            Powered by Gemini
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Mobile sub-nav */}
      <div className="flex md:hidden border-t border-yt-darkBorder overflow-x-auto px-2 py-1.5 gap-1 bg-yt-darkElevated">
        <button
          onClick={() => setActiveTab("copilot")}
          className={`px-3 py-1 text-xs rounded whitespace-nowrap ${
            activeTab === "copilot" ? "bg-yt-red text-white" : "text-neutral-400"
          }`}
        >
          Copilot
        </button>
        <button
          onClick={() => setActiveTab("notes")}
          className={`px-3 py-1 text-xs rounded whitespace-nowrap ${
            activeTab === "notes" ? "bg-yt-darkSurface text-white" : "text-neutral-400"
          }`}
        >
          Revision Notes
        </button>
        <button
          onClick={() => setActiveTab("eval")}
          className={`px-3 py-1 text-xs rounded whitespace-nowrap ${
            activeTab === "eval" ? "bg-yt-darkSurface text-white" : "text-neutral-400"
          }`}
        >
          Evaluation (93.3%)
        </button>
        <button
          onClick={() => setActiveTab("dossier")}
          className={`px-3 py-1 text-xs rounded whitespace-nowrap ${
            activeTab === "dossier" ? "bg-yt-darkSurface text-white" : "text-neutral-400"
          }`}
        >
          Teardown & Spec
        </button>
      </div>
    </header>
  );
}
