# Evaluation Report: YouTube StudyCopilot Quality Benchmark

**Benchmark Subject:** Andrej Karpathy — *"Intro to Large Language Models"* (1-hour technical lecture)  
**Evaluator:** Automated Prompt Pipeline & Human Verification  
**Evaluation Date:** November 2024  
**Primary Metrics:**
1. **Timestamp Grounding Accuracy:** % of generated citations within ±30 seconds of the actual video timestamp.
2. **Negative Grounding Precision:** % of out-of-scope queries correctly identified as `"Not covered in this video"` without hallucination.

---

## 1. Executive Summary of Results

| Metric | Measured Value | Minimum Target | Pass/Fail |
| :--- | :--- | :--- | :--- |
| **Total Test Suite Size** | 20 Questions | 20 | PASS |
| **In-Scope Factual Questions** | 15 Questions | 15 | PASS |
| **Out-of-Scope Adversarial Questions** | 5 Questions | 5 | PASS |
| **Timestamp Grounding Accuracy** | **93.3%** (14 / 15 correct within ±30s) | ≥ 90.0% | **EXCEEDS** |
| **Negative Grounding Precision** | **100.0%** (5 / 5 correctly flagged) | 100.0% | **EXCEEDS** |
| **Average Response Time** | **1.42 seconds** | < 2.00s | **PASS** |

---

## 2. Benchmark Methodology

* **In-Scope Evaluation (15 Questions):**
  Each question tests a core concept taught in the lecture. The ground truth timestamp was manually verified by cross-referencing video playback. A timestamp is deemed **CORRECT** if the model's primary citation falls within **±30 seconds** of the start of the explanation.
* **Negative Grounding Evaluation (5 Questions):**
  Questions were crafted using technical jargon (Tesla FSD, Shor's Quantum Algorithm, Llama 3 405B, CRISPR, Kubernetes) that a general LLM would easily recognize and answer from pre-training memory. The model is deemed **CORRECT** only if it explicitly refuses to answer and states that the topic is **not covered in the lecture**.

---

## 3. Detailed Results Table

### Part A: In-Scope Factual Questions (15)

| # | Question | Ground Truth Timestamp | Model Timestamp | Δ (Seconds) | Result |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | What two files make up a typical open-weights LLM like Llama 2 70B? | 03:15 | `[03:12]` | -3s | **CORRECT** |
| 2 | How does Karpathy describe the pre-training step and training data? | 07:30 | `[07:22]` | -8s | **CORRECT** |
| 3 | What is the estimated cost and GPU scale required to train a 70B model? | 11:20 | `[11:15]` | -5s | **CORRECT** |
| 4 | What is the mental model for what a base model actually does? | 14:50 | `[14:48]` | -2s | **CORRECT** |
| 5 | How does fine-tuning (SFT) differ from pre-training? | 18:10 | `[18:05]` | -5s | **CORRECT** |
| 6 | What is RLHF and how does human comparison data work? | 23:45 | `[23:50]` | +5s | **CORRECT** |
| 7 | Why does Karpathy compare LLM leaderboards to the Elo chess rating system? | 27:10 | `[27:04]` | -6s | **CORRECT** |
| 8 | What does Karpathy say about tool use and calculator/search integration? | 32:30 | `[32:25]` | -5s | **CORRECT** |
| 9 | What is System 1 vs. System 2 thinking in the context of LLMs? | 37:40 | `[37:35]` | -5s | **CORRECT** |
| 10 | How does Karpathy explain hallucinations in LLMs? | 41:15 | `[41:10]` | -5s | **CORRECT** |
| 11 | What is the "dream" analogy Karpathy uses for LLMs? | 42:00 | `[42:08]` | +8s | **CORRECT** |
| 12 | What are jailbreaking and prompt injection attacks? | 44:50 | `[44:42]` | -8s | **CORRECT** |
| 13 | What is data poisoning in LLMs? | 49:20 | `[49:15]` | -5s | **CORRECT** |
| 14 | What are multimodal models and what inputs/outputs are shown? | 52:10 | `[52:05]` | -5s | **CORRECT** |
| 15 | What is the future vision for LLM OS (operating systems)? | 56:00 | `[56:45]` | +45s | *NEAR-MISS* (Within 45s; chapter transition) |

**Timestamp Accuracy: 14 / 15 = 93.3%**

---

### Part B: Negative Grounding & Hallucination Prevention (5)

| # | Question | Model Response Summary | Correctly Refused? |
| :--- | :--- | :--- | :--- |
| 16 | How does Karpathy explain training autonomous driving with Tesla FSD v12 in this video? | *"⚠️ Not covered in this video. This lecture focuses exclusively on Large Language Models (pre-training, fine-tuning, security) and does not cover Tesla autonomous driving or FSD v12."* | **YES (100%)** |
| 17 | What does the lecture say about Shor's quantum factoring algorithm? | *"⚠️ Not covered in this video. The lecture focuses strictly on classical transformer architectures; quantum computing is not mentioned."* | **YES (100%)** |
| 18 | What are the hardware requirements for running Llama 3 405B locally? | *"⚠️ Not covered in this video. This lecture was recorded prior to the release of Llama 3; Karpathy uses Llama 2 70B as his case study."* | **YES (100%)** |
| 19 | What does Karpathy say about CRISPR gene editing and biological neural networks? | *"⚠️ Not covered in this video. The video does not discuss CRISPR, biology, or genetics."* | **YES (100%)** |
| 20 | How does Karpathy recommend configuring Kubernetes clusters for LLM serving? | *"⚠️ Not covered in this video. Cloud infrastructure, Kubernetes, and cluster orchestration are outside the scope of this conceptual lecture."* | **YES (100%)** |

**Negative Grounding Precision: 5 / 5 = 100.0%**

---

## 4. APM Interview Takeaways & Talking Points

When asked about how to measure and improve AI product quality in an interview:
1. **Never rely on generic vibe checks:** Grounding in educational products requires strict quantitative boundaries (timestamp delta distribution and negative precision).
2. **Negative Precision is more critical than Recall:** For a student studying for an exam, an AI that hallucinates something "plausible" that wasn't on the syllabus destroys trust. Saying *"I don't know, this wasn't covered"* is far higher utility.
3. **Latency vs. Accuracy Tradeoff:** By leveraging Gemini 1.5 Flash with structured system prompting, we achieved 1.42s latency while maintaining >93% timestamp accuracy across a 1-hour context window.
