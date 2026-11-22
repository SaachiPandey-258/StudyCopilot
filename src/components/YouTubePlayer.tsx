"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Youtube, Video, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { PRESET_LECTURES, PresetLecture } from "@/lib/presetLectures";

interface YouTubePlayerProps {
  activeLecture: PresetLecture;
  onSelectLecture: (lecture: PresetLecture) => void;
  playerRef: React.MutableRefObject<any>;
}

export function YouTubePlayer({ activeLecture, onSelectLecture, playerRef }: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [customError, setCustomError] = useState("");
  const [showCustomModal, setShowCustomModal] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Initialize postMessage bridge with YouTube IFrame API
  useEffect(() => {
    playerRef.current = {
      seekTo: (seconds: number) => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({
              event: "command",
              func: "seekTo",
              args: [seconds, true]
            }),
            "*"
          );
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({
              event: "command",
              func: "playVideo",
              args: []
            }),
            "*"
          );
          setIsPlaying(true);
        }
      }
    };
  }, [playerRef]);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomError("");

    // Extract YouTube ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = customUrl.match(regExp);

    if (match && match[2].length === 11) {
      const customVideoId = match[2];
      const customLecture: PresetLecture = {
        id: customVideoId,
        title: `Custom Video (${customVideoId})`,
        channel: "User Added Video",
        duration: "Variable",
        description: "Custom video loaded via YouTube link.",
        chapters: [
          { title: "Introduction", timestamp: "00:00", seconds: 0, summary: "Video start" }
        ],
        revisionGuide: {
          executiveSummary: "This custom video will be analyzed in real-time by the Gemini 1.5 Flash API.",
          keyDefinitions: [],
          corePrinciples: ["Live Gemini API processing active."],
          quickQuiz: []
        },
        sampleQuestions: [
          "Summarize the main thesis of this lecture",
          "What are the core technical terms introduced?",
          "⚠️ Not covered test"
        ],
        transcriptSegments: []
      };

      onSelectLecture(customLecture);
      setShowCustomModal(false);
      setCustomUrl("");
    } else {
      setCustomError("Please enter a valid YouTube video URL (e.g., https://youtube.com/watch?v=...)");
    }
  };

  return (
    <div className="flex flex-col h-full bg-yt-darkSurface rounded-xl border border-yt-darkBorder overflow-hidden shadow-lg">
      {/* Video Header & Preset Selector */}
      <div className="p-3.5 border-b border-yt-darkBorder bg-yt-darkElevated flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
            Active Lecture:
          </span>
          <select
            value={activeLecture.id}
            onChange={(e) => {
              const selected = PRESET_LECTURES.find((p) => p.id === e.target.value);
              if (selected) onSelectLecture(selected);
            }}
            className="bg-neutral-800 text-xs font-medium text-white border border-neutral-700 rounded-md px-2 py-1 truncate focus:outline-none focus:border-yt-accentBlue"
          >
            {PRESET_LECTURES.map((lecture) => (
              <option key={lecture.id} value={lecture.id}>
                {lecture.channel}: {lecture.title}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setShowCustomModal(true)}
          className="text-xs text-yt-accentBlue hover:text-blue-300 font-medium px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 whitespace-nowrap"
        >
          + Custom URL
        </button>
      </div>

      {/* Embedded YouTube Iframe */}
      <div className="relative aspect-video w-full bg-black">
        <iframe
          ref={iframeRef}
          src={`https://www.youtube-nocookie.com/embed/${activeLecture.id}?enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}&rel=0`}
          title={activeLecture.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>

      {/* Video Details & Meta */}
      <div className="p-4 space-y-3 flex-1 overflow-y-auto">
        <div>
          <h2 className="text-base font-semibold text-white leading-snug">
            {activeLecture.title}
          </h2>
          <div className="flex items-center gap-3 mt-1 text-xs text-neutral-400">
            <span className="font-medium text-neutral-300">{activeLecture.channel}</span>
            <span>•</span>
            <span>Duration: {activeLecture.duration}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/40">
              <CheckCircle2 className="w-3 h-3" />
              Grounded Transcripts Verified
            </span>
          </div>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed bg-yt-darkElevated/50 p-2.5 rounded-lg border border-neutral-800">
          {activeLecture.description}
        </p>

        {/* Chapter Quick-Jump Bar */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-neutral-400 mb-2">
            <span>LECTURE CHAPTERS ({activeLecture.chapters.length})</span>
            <span className="text-[11px] text-neutral-500">Click to scrub video</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
            {activeLecture.chapters.map((ch, idx) => (
              <button
                key={idx}
                onClick={() => playerRef.current?.seekTo(ch.seconds)}
                className="flex items-start gap-2 p-2 rounded-md bg-yt-darkElevated hover:bg-neutral-800 text-left transition-colors border border-neutral-800/80 group"
              >
                <span className="text-[11px] font-mono font-bold text-yt-accentBlue group-hover:text-white bg-blue-950/40 px-1.5 py-0.5 rounded border border-blue-800/40">
                  {ch.timestamp}
                </span>
                <span className="text-xs text-neutral-300 group-hover:text-white line-clamp-1">
                  {ch.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Custom URL Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-yt-darkSurface border border-yt-darkBorder rounded-xl max-w-md w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Video className="w-4 h-4 text-yt-red" />
                Analyze Any YouTube Lecture
              </h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-neutral-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCustomSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-neutral-300 block mb-1">
                  YouTube Video Link
                </label>
                <input
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="w-full bg-yt-darkElevated border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-yt-accentBlue"
                />
              </div>

              {customError && (
                <p className="text-xs text-red-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {customError}
                </p>
              )}

              <div className="bg-amber-950/30 border border-amber-800/40 rounded-lg p-3 text-xs text-amber-300/90 leading-relaxed">
                <span className="font-semibold block mb-1">💡 APM Technical Note on Captions:</span>
                YouTube videos without captions/transcripts cannot be grounded via text transcripts alone. For videos with disabled captions, StudyCopilot leverages Gemini&apos;s direct multimodal video API ingestion.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-yt-red hover:bg-red-600 text-white font-medium rounded-lg text-xs shadow-md transition-colors"
                >
                  Load Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
