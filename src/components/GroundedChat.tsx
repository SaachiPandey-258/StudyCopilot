"use client";

import React, { useState } from "react";
import { Send, Sparkles, CheckCircle2, AlertTriangle, Clock, RefreshCw, Quote, ArrowRight } from "lucide-react";
import { PresetLecture } from "@/lib/presetLectures";

interface Message {
  id: string;
  sender: "user" | "copilot";
  text: string;
  isCovered?: boolean;
  timestamps?: Array<{ time: string; seconds: number; label: string }>;
  source?: string;
  model?: string;
  quote?: string;
  note?: string;
}

interface GroundedChatProps {
  activeLecture: PresetLecture;
  apiKey: string;
  onSeek: (seconds: number) => void;
  onOpenKeyModal: () => void;
}

export function GroundedChat({ activeLecture, apiKey, onSeek, onOpenKeyModal }: GroundedChatProps) {
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-welcome",
      sender: "copilot",
      text: `Hello! I am your Grounded StudyCopilot for "${activeLecture.title}". Ask me any conceptual question, formula, or proof from this lecture. I cite exact timestamps [MM:SS] so you can verify each point. If a topic is not in this video, I will explicitly flag it as not covered.`,
      isCovered: true,
      timestamps: [
        { time: "00:00", seconds: 0, label: "Jump to Video Start" }
      ],
      source: "system",
      model: "StudyCopilot Grounding Protocol"
    }
  ]);

  const handleSend = async (queryText?: string) => {
    const q = (queryText || inputQuery).trim();
    if (!q || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: q
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsLoading(true);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json"
      };
      if (apiKey) {
        headers["x-gemini-api-key"] = apiKey;
      }

      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers,
        body: JSON.stringify({
          question: q,
          lectureId: activeLecture.id
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch response");
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "copilot",
        text: data.answer,
        isCovered: data.isCovered,
        timestamps: data.timestamps || [],
        source: data.source,
        model: data.model,
        quote: data.quote,
        note: data.note
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: "copilot",
          text: `Error: ${err.message || "Failed to process query. Check connection or Gemini API key."}`,
          isCovered: false,
          source: "error"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageContent = (msg: Message) => {
    if (msg.sender === "user") {
      return <p className="text-xs text-white leading-relaxed">{msg.text}</p>;
    }

    // Split text by timestamp pattern [MM:SS] to turn them into interactive buttons
    const parts = msg.text.split(/(\[\d{1,2}:\d{2}\])/g);

    return (
      <div className="space-y-2.5">
        <div className="text-xs text-neutral-200 leading-relaxed space-y-1">
          {parts.map((part, i) => {
            const match = part.match(/\[(\d{1,2}):(\d{2})\]/);
            if (match) {
              const minutes = parseInt(match[1], 10);
              const seconds = parseInt(match[2], 10);
              const totalSec = minutes * 60 + seconds;
              return (
                <button
                  key={i}
                  onClick={() => onSeek(totalSec)}
                  className="inline-flex items-center gap-1 mx-1 px-1.5 py-0.5 rounded bg-blue-950/80 hover:bg-blue-800/80 border border-blue-500/40 text-blue-300 font-mono text-[11px] font-semibold transition-all hover:scale-105 shadow-sm"
                  title={`Click to jump to ${part}`}
                >
                  <Clock className="w-2.5 h-2.5" />
                  {part}
                </button>
              );
            }
            return <span key={i}>{part}</span>;
          })}
        </div>

        {/* Quoted Transcript Snippet */}
        {msg.quote && (
          <div className="flex items-start gap-2 bg-neutral-900/90 border-l-2 border-yt-accentBlue p-2 rounded-r text-[11px] text-neutral-300 italic">
            <Quote className="w-3 h-3 text-yt-accentBlue shrink-0 mt-0.5" />
            <span>&quot;{msg.quote}&quot;</span>
          </div>
        )}

        {/* Error Callout */}
        {msg.source === "error" && (
          <div className="p-2.5 rounded bg-red-950/40 border border-red-800/60 text-xs text-red-300 space-y-2">
            <p>{msg.text}</p>
            <button
              onClick={onOpenKeyModal}
              className="text-[11px] font-semibold text-white bg-red-800/60 hover:bg-red-700 px-2.5 py-1 rounded transition-colors"
            >
              Configure / Reset API Key to Demo Mode
            </button>
          </div>
        )}

        {/* Clickable Action Badges & Grounding Status (Only for non-errors) */}
        {msg.source !== "error" && (
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-neutral-800/80 text-[10px]">
            {msg.isCovered !== undefined && (
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-medium border ${
                  msg.isCovered
                    ? "bg-emerald-950/50 text-emerald-300 border-emerald-800/60"
                    : "bg-amber-950/50 text-amber-300 border-amber-800/60"
                }`}
              >
                {msg.isCovered ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Verified in Video Evidence
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                    Negative Grounding: Not in Lecture
                  </>
                )}
              </span>
            )}

            {msg.model && (
              <span className="text-neutral-400 font-mono bg-neutral-800/80 px-1.5 py-0.5 rounded border border-neutral-700/60">
                {msg.model}
              </span>
            )}

            {msg.source === "cached_gemini_example" && (
              <span className="text-neutral-400 italic">
                (Cached Example)
              </span>
            )}
          </div>
        )}

        {msg.note && (
          <p className="text-[10px] text-neutral-400 bg-neutral-900/60 p-1.5 rounded border border-neutral-800">
            ℹ️ {msg.note}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-yt-darkSurface rounded-xl border border-yt-darkBorder overflow-hidden shadow-lg">
      {/* Header */}
      <div className="p-3.5 border-b border-yt-darkBorder bg-yt-darkElevated flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-semibold text-white tracking-wide uppercase">
            Grounded Q&A & Timestamp Verification
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded font-mono">
            Zero Hallucination Protocol Active
          </span>
        </div>
      </div>

      {/* Suggestion Chips */}
      <div className="p-3 bg-neutral-950/50 border-b border-neutral-800/80">
        <div className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
          Suggested In-Scope & Adversarial Prompts:
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
          {activeLecture.sampleQuestions.map((q, idx) => {
            const isOutOfScope = q.includes("⚠️") || q.includes("Tesla") || q.includes("Attention");
            return (
              <button
                key={idx}
                onClick={() => handleSend(q.replace("⚠️ Negative Grounding Test: ", ""))}
                className={`text-[11px] px-2 py-1 rounded-md text-left transition-all border ${
                  isOutOfScope
                    ? "bg-amber-950/30 hover:bg-amber-900/50 text-amber-300 border-amber-800/40"
                    : "bg-yt-darkElevated hover:bg-neutral-800 text-neutral-300 hover:text-white border-neutral-700/80"
                }`}
              >
                {q}
              </button>
            );
          })}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 space-y-3.5 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[90%] sm:max-w-[85%] rounded-xl p-3 shadow-sm ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-yt-darkElevated text-neutral-100 rounded-bl-none border border-neutral-800"
              }`}
            >
              {renderMessageContent(msg)}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-yt-darkElevated border border-neutral-800 rounded-xl p-3 flex items-center gap-2 text-xs text-neutral-300">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-yt-accentBlue" />
              <span>Scanning transcript & verifying timestamps with Gemini 1.5...</span>
            </div>
          </div>
        )}
      </div>

      {/* Query Input Box */}
      <div className="p-3 border-t border-yt-darkBorder bg-yt-darkElevated">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask a question about this lecture (e.g. 'What is the dream analogy?')..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            disabled={isLoading}
            className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-yt-accentBlue disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !inputQuery.trim()}
            className="p-2 bg-yt-red hover:bg-red-600 disabled:opacity-40 text-white rounded-lg transition-colors shadow-sm"
            title="Submit question"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="flex items-center justify-between mt-2 text-[10px] text-neutral-400">
          <span>Every claim linked to clickable [MM:SS] timestamps.</span>
          {!apiKey && (
            <button
              onClick={onOpenKeyModal}
              className="text-yt-accentBlue hover:underline flex items-center gap-0.5"
            >
              Add your Gemini API key for live queries <ArrowRight className="w-2.5 h-2.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
