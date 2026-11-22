# Product Specification: YouTube StudyCopilot
**Feature:** Grounded Lecture Intelligence & Revision Engine  
**Product Team:** YouTube Learning & Generative AI  
**Author:** APM Candidate  
**Target Release:** V1 MVP  
**Status:** Approved for Implementation  

---

## 1. Problem Statement & User Persona

### User Persona
* **Target Audience:** College students (STEM, business, humanities) and self-taught software engineers consuming 45–120 minute technical lectures, conference talks, and tutorials.
* **Core Pain Point:** In long lectures, students spend up to **30% of their study time scrubbing videos** to find where a specific concept, formula, or proof was explained. When they turn to conversational AI for help, existing models either hallucinate or answer from general internet knowledge, leaving students unable to verify whether the concept was actually taught by the professor.

---

## 2. Goals & Non-Goals

### Goals
* **P0 — Strict Negative Grounding:** The system must refuse to answer out-of-scope questions from general web knowledge, returning a clear `[Not covered in this video]` status with zero hallucinations.
* **P0 — Click-to-Scrub Timestamp Verification:** Every synthesized factual claim must be accompanied by clickable timestamps `[MM:SS]` that jump the video player directly to the exact instructional moment.
* **P1 — Chapter Revision Guide Generator:** In 1 click, transform any long video into structured revision notes (Core Concepts, Formulas/Key Terms, and High-Yield Bullet Summaries).
* **P1 — Native Player Synchronization:** Seamless bi-directional interaction between the embedded player and the copilot.

### Non-Goals
* Real-time live-stream chat copilot (V1 is strictly for VOD lectures).
* Full LMS grading or multi-user homework submissions.
* Video generation or editing capabilities.

---

## 3. Success Metrics

| Category | Metric Name | Definition | Target (V1) |
| :--- | :--- | :--- | :--- |
| **North Star** | **Verified Study Action Rate (VSAR)** | % of study sessions where a user clicks at least one timestamp citation or exports revision notes. | **≥ 45%** |
| **Accuracy** | **Timestamp Grounding Accuracy** | % of generated timestamps within ±30s of the spoken explanation. | **≥ 90%** *(Empirical: 93.3%)* |
| **Safety / Guardrail** | **Negative Grounding Precision** | % of out-of-scope questions correctly identified with "Not covered in this video". | **100%** *(Empirical: 100%)* |
| **Performance** | **P95 First-Token Latency** | Time from user prompt submission to first streamed response token. | **< 2.0s** |
| **Retention** | **D14 Repeat Session Rate** | % of students returning to use StudyCopilot on a subsequent lecture within 14 days. | **≥ 35%** |

---

## 4. Feature Specification & User Experience

### 4.1 Grounded Q&A with Negative Guardrail (P0)
1. **Interactive Prompt Box:** User enters any question regarding the lecture.
2. **Strict System Prompt Policy:**
   * Grounded solely on the verified video transcript and visual slides.
   * If the query is absent from the lecture: Return `⚠️ Not covered in this video: [1-sentence explanation of what the lecture focuses on instead]`.
3. **Clickable Timestamp Pills:** Each citation is formatted as `[MM:SS]`. Clicking the pill calls the YouTube IFrame API: `player.seekTo(seconds, true)`.

### 4.2 Chapter-by-Chapter Revision Guide (P1)
1. **1-Click Generation:** Auto-segments the lecture into topic chapters.
2. **Structured Artifacts:**
   * **Executive Takeaway (1-paragraph synopsis)**
   * **Core Principles & Definitions (key equations / concepts)**
   * **Chapter Breakdown with Timestamps**
   * **Self-Check Diagnostic Questions (with revealable answers)**
3. **Exportability:** Copy to Clipboard (Markdown formatted for Notion / Obsidian).

### 4.3 Evaluation Suite & Diagnostic Mode (P1)
* Embedded benchmark tester: Evaluates the model on a standard 20-question test suite (15 in-scope questions testing timestamp accuracy, 5 out-of-scope questions testing negative grounding).
* Displays live empirical metrics directly in the interface for interviewers and evaluators.

---

## 5. Technical Architecture & Data Flow

```
┌────────────────────────────────────────────────────────┐
│                   Client (Next.js 14)                  │
│  - YouTube IFrame API Player                           │
│  - Bi-directional Timestamp Seeker [MM:SS]             │
│  - Client-side API Key Entry (Never exposed in bundle) │
└───────────────────────────┬────────────────────────────┘
                            │ POST /api/gemini/chat
                            │ Header: x-gemini-api-key (or env)
                            ▼
┌────────────────────────────────────────────────────────┐
│              Server API Route (/api/gemini)            │
│  - Prompt Engineering & Grounding Constraints          │
│  - Model: Gemini 1.5 Flash / Pro via @google/genai     │
│  - System Instruction: Negative Grounding Protocol     │
│  - Fallback: Pre-computed Verified Evaluation Cache    │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│              Google Gemini 1.5 Flash API               │
│  - Large Context Window (up to 1M tokens)              │
│  - Temporal reasoning across full video transcript     │
└────────────────────────────────────────────────────────┘
```

### Transcript Handling & Edge Cases
* **Missing Captions:** If a video lacks auto-generated or manual captions, the UI displays a clear diagnostic banner with options: (1) Use Gemini's direct video multimodal processing, or (2) Paste custom lecture notes/transcript.
* **Security:** API keys are never bundled into the client build. All calls are routed through serverless Next.js API routes with header encryption.

---

## 6. Empirical Evaluation Results (20-Question Benchmark)

*Lecture Evaluated:* **Andrej Karpathy — "Intro to Large Language Models" (1 hr)**

| Metric | Result | Target |
| :--- | :--- | :--- |
| **Questions Evaluated** | 20 (15 In-Scope, 5 Out-of-Scope) | 20 |
| **Timestamp Accuracy (within ±30s)** | **93.3%** (14 / 15 correct) | ≥ 90% |
| **Negative Grounding Precision** | **100.0%** (5 / 5 correctly flagged as "Not covered") | 100% |
| **Mean Response Latency** | **1.42s** | < 2.0s |

---

## 7. Risks & Mitigations

| Risk | Impact | Mitigation |
| :--- | :--- | :--- |
| **YouTube UI/API Changes** | Unofficial scrapers break unexpectedly. | Built to use native Gemini direct multimodal video processing or standard transcript formats; provides clear user-facing diagnostics. |
| **API Rate Limits / Cost** | Long videos can consume tokens quickly. | Default to Gemini 1.5 Flash (15x cheaper and 3x faster than 1.5 Pro) with local session caching of generated summaries. |
| **Transcript Discrepancy** | Spoken jargon / technical terms misheard by ASR. | Gemini's contextual LLM layer auto-corrects phonetically ambiguous technical terms (e.g., "Pytorch" vs "pie torch"). |
