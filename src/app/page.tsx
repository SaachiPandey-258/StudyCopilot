"use client";

import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { YouTubePlayer } from "@/components/YouTubePlayer";
import { GroundedChat } from "@/components/GroundedChat";
import { RevisionNotesTab } from "@/components/RevisionNotesTab";
import { EvaluationTab } from "@/components/EvaluationTab";
import { DossierTab } from "@/components/DossierTab";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import { PRESET_LECTURES, PresetLecture } from "@/lib/presetLectures";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"copilot" | "notes" | "eval" | "dossier">("copilot");
  const [activeLecture, setActiveLecture] = useState<PresetLecture>(PRESET_LECTURES[0]);
  const [apiKey, setApiKey] = useState<string>("");
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const playerRef = useRef<{ seekTo: (seconds: number) => void }>({ seekTo: () => {} });

  // Load API key from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("yt_gemini_api_key");
      if (saved) setApiKey(saved);
    } catch (e) {
      // ignore
    }
  }, []);

  const handleSaveKey = (newKey: string) => {
    setApiKey(newKey);
    try {
      if (newKey) {
        localStorage.setItem("yt_gemini_api_key", newKey);
      } else {
        localStorage.removeItem("yt_gemini_api_key");
      }
    } catch (e) {
      // ignore
    }
  };

  const handleSeek = (seconds: number) => {
    if (activeTab !== "copilot") {
      setActiveTab("copilot");
    }
    // Give state transition a tick if switching tabs
    setTimeout(() => {
      playerRef.current?.seekTo(seconds);
    }, 100);
  };

  const handleSelectBenchmarkQuestion = (question: string, seconds?: number) => {
    setActiveTab("copilot");
    if (seconds !== undefined) {
      setTimeout(() => {
        playerRef.current?.seekTo(seconds);
      }, 150);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-yt-darkBg text-white">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        apiKey={apiKey}
        onOpenKeyModal={() => setIsKeyModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === "copilot" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-8.5rem)] min-h-[640px]">
            {/* Left Column: Player & Metadata (7 cols) */}
            <div className="lg:col-span-7 h-full flex flex-col">
              <YouTubePlayer
                activeLecture={activeLecture}
                onSelectLecture={setActiveLecture}
                playerRef={playerRef}
              />
            </div>

            {/* Right Column: Grounded Q&A Assistant (5 cols) */}
            <div className="lg:col-span-5 h-full flex flex-col">
              <GroundedChat
                activeLecture={activeLecture}
                apiKey={apiKey}
                onSeek={handleSeek}
                onOpenKeyModal={() => setIsKeyModalOpen(true)}
              />
            </div>
          </div>
        )}

        {activeTab === "notes" && (
          <RevisionNotesTab
            activeLecture={activeLecture}
            onSeek={handleSeek}
          />
        )}

        {activeTab === "eval" && (
          <EvaluationTab
            onSelectQuestion={handleSelectBenchmarkQuestion}
          />
        )}

        {activeTab === "dossier" && (
          <DossierTab />
        )}
      </main>

      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveKey={handleSaveKey}
      />
    </div>
  );
}
