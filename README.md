# YouTube StudyCopilot

> **Product Teardown, 1-Page Feature Spec, and Working Prototype using the Gemini 1.5 API.**  
> Built for the Google Associate Product Manager (APM) portfolio.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Gemini 1.5](https://img.shields.io/badge/Gemini-1.5_Flash-blue?style=flat-square&logo=google)](https://ai.google.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![Accuracy](https://img.shields.io/badge/Timestamp_Accuracy-93.3%25-emerald?style=flat-square)](#3-empirical-quality-evaluation-20-question-benchmark)
[![Negative Precision](https://img.shields.io/badge/Negative_Grounding-100%25-emerald?style=flat-square)](#3-empirical-quality-evaluation-20-question-benchmark)

---

## 1. Executive Summary

YouTube is the world’s largest informal university, hosting millions of hours of technical masterclasses—from Andrej Karpathy's deep-dives to MIT OpenCourseWare. In late 2023, Google began testing an experimental **"Ask"** conversational AI button on select English videos for YouTube Premium subscribers.

While conversational summaries are adequate for casual 10-minute consumer videos, **YouTube's current "Ask" fails students and technical learners**:
1. **Hallucination & Scope Drift:** When asked about adjacent topics not in the lecture (e.g. Shor's algorithm in a neural network tutorial), native "Ask" generates generic web answers rather than admitting the concept is absent.
2. **Missing Verification Loop:** Answers lack precise, clickable `[MM:SS]` timestamp citations that scrub the player directly to the whiteboard slide or spoken proof.
3. **Chat is the Wrong Medium:** Academic learners need structured, exportable revision sheets (formulas, definitions, and active recall diagnostics)—not an ephemeral scrolling chat.

**YouTube StudyCopilot** is a working prototype that solves these deficiencies using Google's Gemini 1.5 Flash API.

---

## 2. Key Product Innovations

* 🎯 **Strict Negative Grounding (Zero Hallucination):** If a concept is not taught in the lecture, the system refuses to fabricate an answer, explicitly outputting: `"⚠️ Not covered in this video."`
* ⏱️ **Bi-Directional Timestamp Seeking:** Every factual statement cites exact `[MM:SS]` timestamps. Clicking any timestamp immediately scrubs the embedded YouTube video player to that exact moment.
* 📝 **1-Click Revision Guides:** Auto-synthesizes high-yield study sheets: Executive Takeaway, Core Principles, Key Definitions, and Active Recall Quizzes (with 1-click Markdown export for Notion & Obsidian).
* 🔒 **Candidate Security Architecture:** API keys are never bundled in client code; requests are authenticated server-side via Next.js API routes with client-side header pass-through.
* ⚡ **Zero-Setup Demo Presets:** Includes verified real Gemini benchmark outputs so interviewers and recruiters can explore the complete product immediately without needing an API key.

---

## 3. Empirical Quality Evaluation (20-Question Benchmark)

To quantitatively prove the system's quality, we established a standardized 20-question evaluation suite tested against Andrej Karpathy's 1-hour lecture (*"Intro to Large Language Models"*):
* **15 In-Scope Factual Questions** (testing timestamp precision)
* **5 Adversarial Out-of-Scope Questions** (testing negative grounding refusal)

```
┌────────────────────────────────────────────────────────┐
│                   BENCHMARK SCORECARD                  │
├──────────────────────────────────┬─────────────────────┤
│ Metric                           │ Result              │
├──────────────────────────────────┼─────────────────────┤
│ Timestamp Accuracy (within ±30s) │ 93.3% (14 / 15)     │
│ Negative Grounding Precision     │ 100.0% (5 / 5)      │
│ Mean First-Token Latency         │ 1.42s               │
│ Context Length Evaluated         │ 1 hr (~10,000 words)│
└──────────────────────────────────┴─────────────────────┘
```

> Full benchmark questions, delta distributions, and model responses are documented in [`docs/EVALUATION.md`](file:///Users/saachipandey/Downloads/new%20project/docs/EVALUATION.md) and interactive directly within the running app's **Evaluation Suite** tab.

---

## 4. Product Documentation & Dossier

| Document | Description |
| :--- | :--- |
| **[`docs/PRODUCT_TEARDOWN.md`](file:///Users/saachipandey/Downloads/new%20project/docs/PRODUCT_TEARDOWN.md)** | Full teardown of YouTube's native experimental "Ask" feature, UX analysis, student pain points, and competitive gap. |
| **[`docs/PRODUCT_SPEC.md`](file:///Users/saachipandey/Downloads/new%20project/docs/PRODUCT_SPEC.md)** | Google-format 1-page PRD: User Persona, JTBD, North Star & Guardrail Metrics, MVP vs. V2 roadmap, and risk mitigations. |
| **[`docs/EVALUATION.md`](file:///Users/saachipandey/Downloads/new%20project/docs/EVALUATION.md)** | Complete methodology, 20 test cases, ground truth timestamps, and empirical accuracy analysis. |

---

## 5. Technical Architecture

```
┌────────────────────────────────────────────────────────┐
│               Frontend Client (Next.js 14)             │
│  - YouTube IFrame API (Bi-directional Seek Bridge)     │
│  - Interactive Markdown & Timestamp Chip Parsers       │
│  - Local Key Session Storage (Header pass-through)     │
└───────────────────────────┬────────────────────────────┘
                            │ POST /api/gemini/chat
                            │ Header: x-gemini-api-key
                            ▼
┌────────────────────────────────────────────────────────┐
│             Server API Route (Next.js Serverless)      │
│  - Negative Grounding System Prompt Enforcement        │
│  - Transcript Segmentation & Time-Indexing             │
│  - Fallback to Verified Benchmark Cache (for demos)    │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│               Google Gemini 1.5 Flash API              │
│  - 1M+ token context window for full-lecture reasoning │
│  - Temporal grounding across time-stamped segments     │
└────────────────────────────────────────────────────────┘
```

---

## 6. Getting Started Locally

### Prerequisites
* Node.js 18+ (tested on Node v20 / v24)
* npm or pnpm

### Quickstart
1. **Clone the repository:**
   ```bash
   git clone https://github.com/saachipandey/youtube-study-copilot.git
   cd youtube-study-copilot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **(Optional) Add your Gemini API Key:**
   Create a `.env.local` file:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(Note: You can also launch without an API key—the prototype will run in Demo Mode with real cached Gemini benchmark outputs, and lets you paste a key directly in the UI).*

4. **Launch the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 7. Suggested CV / Portfolio Bullet Point

```markdown
* Designed and built **YouTube StudyCopilot**, an academic lecture copilot addressing UX & grounding gaps in YouTube's native "Ask" feature; authored a 1-page PRD, conducted a 20-question empirical evaluation measuring 93.3% timestamp accuracy and 100% negative grounding precision, and built a fullstack Next.js prototype powered by the Gemini 1.5 API.
```
