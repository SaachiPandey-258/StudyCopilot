"use client";

import React, { useState } from "react";
import { Key, Shield, ExternalLink, Check, Trash2 } from "lucide-react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveKey: (key: string) => void;
}

export function ApiKeyModal({ isOpen, onClose, apiKey, onSaveKey }: ApiKeyModalProps) {
  const [inputVal, setInputVal] = useState(apiKey);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveKey(inputVal.trim());
    onClose();
  };

  const handleClear = () => {
    setInputVal("");
    onSaveKey("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="bg-yt-darkSurface border border-yt-darkBorder rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-yt-accentBlue/20 text-yt-accentBlue">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Gemini API Key Setup</h3>
              <p className="text-[11px] text-neutral-400">Optional for live interactive queries</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white text-xs p-1"
          >
            ✕
          </button>
        </div>

        <div className="bg-yt-darkElevated p-3 rounded-xl border border-neutral-800 space-y-2 text-xs text-neutral-300">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
            <Shield className="w-3.5 h-3.5" />
            Candidate Privacy &amp; Security Architecture
          </div>
          <p className="text-[11px] text-neutral-300 leading-relaxed">
            Your key is stored in your browser&apos;s local session and transmitted only via encrypted HTTPS headers to our server-side API route. It is never bundled into client JS or logged.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="text-xs text-neutral-300 font-medium block mb-1">
              Google Gemini API Key:
            </label>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-yt-accentBlue"
            />
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yt-accentBlue hover:underline flex items-center gap-1"
            >
              Get a free API key at Google AI Studio <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex justify-between items-center pt-2">
            {apiKey ? (
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 px-2 py-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove Key
              </button>
            ) : <div />}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg text-xs shadow-md transition-colors"
              >
                Save Key
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
