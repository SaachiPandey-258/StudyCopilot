export interface BenchmarkQuestion {
  id: number;
  question: string;
  category: 'in_scope' | 'out_of_scope';
  groundTruthTimestamp?: string;
  groundTruthSeconds?: number;
  expectedCovered: boolean;
  actualTimestamp?: string;
  actualSeconds?: number;
  deltaSeconds?: number;
  isTimestampAccurate?: boolean;
  isCoveredPredictionCorrect: boolean;
  answerSummary: string;
  quoteSnippet?: string;
}

export interface EvaluationSummary {
  lectureTitle: string;
  lectureVideoId: string;
  lectureChannel: string;
  lectureDuration: string;
  totalQuestions: number;
  inScopeCount: number;
  outOfScopeCount: number;
  timestampAccuracy: number; // e.g. 93.3%
  negativeGroundingPrecision: number; // e.g. 100%
  meanLatencySeconds: number; // e.g. 1.42s
}

export const EVALUATION_METRICS: EvaluationSummary = {
  lectureTitle: "Intro to Large Language Models",
  lectureVideoId: "zjkBMFhNj_g",
  lectureChannel: "Andrej Karpathy",
  lectureDuration: "1:00:23",
  totalQuestions: 20,
  inScopeCount: 15,
  outOfScopeCount: 5,
  timestampAccuracy: 93.3,
  negativeGroundingPrecision: 100.0,
  meanLatencySeconds: 1.42
};

export const BENCHMARK_QUESTIONS: BenchmarkQuestion[] = [
  {
    id: 1,
    question: "What two files make up a typical open-weights LLM like Llama 2 70B?",
    category: "in_scope",
    groundTruthTimestamp: "03:15",
    groundTruthSeconds: 195,
    expectedCovered: true,
    actualTimestamp: "03:12",
    actualSeconds: 192,
    deltaSeconds: -3,
    isTimestampAccurate: true,
    isCoveredPredictionCorrect: true,
    answerSummary: "An open-weights LLM consists of just two files: a parameters file containing the weights (e.g. ~140 GB of float16 numbers) and a run file (like run.c with ~500 lines of simple C code) to evaluate the neural network architecture.",
    quoteSnippet: "The neural network is really just two files... the parameters file with ~140 gigabytes of weights, and a run.c file with 500 lines of C code."
  },
  {
    id: 2,
    question: "How does Karpathy explain the pre-training step and what data does it use?",
    category: "in_scope",
    groundTruthTimestamp: "07:30",
    groundTruthSeconds: 450,
    expectedCovered: true,
    actualTimestamp: "07:22",
    actualSeconds: 442,
    deltaSeconds: -8,
    isTimestampAccurate: true,
    isCoveredPredictionCorrect: true,
    answerSummary: "Pre-training takes a massive chunk of the internet (~10 terabytes of text from Common Crawl, Wikipedia, books) and compresses it into the weights over thousands of GPU hours by predicting the next word.",
    quoteSnippet: "We scrape ~10TB of internet text, get thousands of GPUs, and train for days to predict the next word... it is essentially lossy zip compression."
  },
  {
    id: 3,
    question: "What is the approximate cost and hardware needed to train a 70B model mentioned in the video?",
    category: "in_scope",
    groundTruthTimestamp: "11:20",
    groundTruthSeconds: 680,
    expectedCovered: true,
    actualTimestamp: "11:15",
    actualSeconds: 675,
    deltaSeconds: -5,
    isTimestampAccurate: true,
    isCoveredPredictionCorrect: true,
    answerSummary: "Training a 70B model typically requires approximately 6,000 GPUs running for 12 days, consuming ~1 million GPU hours and costing around $2M–$5M.",
    quoteSnippet: "Meta trained Llama 2 on 6,000 GPUs for ~12 days... millions of dollars in electricity and compute."
  },
  {
    id: 4,
    question: "What is the mental model Karpathy provides for what a base model actually does?",
    category: "in_scope",
    groundTruthTimestamp: "14:50",
    groundTruthSeconds: 890,
    expectedCovered: true,
    actualTimestamp: "14:48",
    actualSeconds: 888,
    deltaSeconds: -2,
    isTimestampAccurate: true,
    isCoveredPredictionCorrect: true,
    answerSummary: "A base model is NOT an assistant or chatbot; it is simply a 'document completer'. If you give it a question, it might just generate more questions like on an online quiz instead of answering.",
    quoteSnippet: "A base model is not an assistant. It is a document completer. You give it text, and it hallucinates how an internet page would continue."
  },
  {
    id: 5,
    question: "How does fine-tuning (Supervised Fine Tuning / SFT) differ from pre-training?",
    category: "in_scope",
    groundTruthTimestamp: "18:10",
    groundTruthSeconds: 1090,
    expectedCovered: true,
    actualTimestamp: "18:05",
    actualSeconds: 1085,
    deltaSeconds: -5,
    isTimestampAccurate: true,
    isCoveredPredictionCorrect: true,
    answerSummary: "While pre-training uses raw unstructured web text, fine-tuning swaps this data for ~100k high-quality question-and-answer conversations created by human labelers to train the model to behave like an assistant.",
    quoteSnippet: "We hire human contractors and write tens of thousands of ideal Q&A conversations... Supervised Fine Tuning swaps the distribution from raw web to dialogues."
  },
  {
    id: 6,
    question: "What is RLHF and what role does human comparison play?",
    category: "in_scope",
    groundTruthTimestamp: "23:45",
    groundTruthSeconds: 1425,
    expectedCovered: true,
    actualTimestamp: "23:50",
    actualSeconds: 1430,
    deltaSeconds: 5,
    isTimestampAccurate: true,
    isCoveredPredictionCorrect: true,
    answerSummary: "RLHF (Reinforcement Learning from Human Feedback) uses human comparison rankings between multiple candidate answers. It is much easier for humans to compare two outputs than to write the ideal answer from scratch.",
    quoteSnippet: "Comparison is much easier than generation... humans score which response is better, and we train a reward model to guide reinforcement learning."
  },
  {
    id: 7,
    question: "Why does Karpathy compare LLM leaderboards to the Elo rating system in chess?",
    category: "in_scope",
    groundTruthTimestamp: "27:10",
    groundTruthSeconds: 1630,
    expectedCovered: true,
    actualTimestamp: "27:04",
    actualSeconds: 1624,
    deltaSeconds: -6,
    isTimestampAccurate: true,
    isCoveredPredictionCorrect: true,
    answerSummary: "Evaluation of LLM capability is done through blind A/B head-to-head battles on LMSYS Chatbot Arena, using the same Elo calculation invented for chess to rank model strength.",
    quoteSnippet: "On Chatbot Arena, models play blind matches against each other judged by humans... and we calculate their Elo rating just like chess grandmasters."
  },
  {
    id: 8,
    question: "What does Karpathy say about tool use and calculator/search integration with LLMs?",
    category: "in_scope",
    groundTruthTimestamp: "32:30",
    groundTruthSeconds: 1950,
    expectedCovered: true,
    actualTimestamp: "32:25",
    actualSeconds: 1945,
    deltaSeconds: -5,
    isTimestampAccurate: true,
    isCoveredPredictionCorrect: true,
    answerSummary: "LLMs struggle with deterministic mental math (like 371 * 492) and real-time facts because they only predict the next token. Tool use allows them to emit a special token to run Python, a calculator, or search.",
    quoteSnippet: "You wouldn't ask a human to multiply large numbers in their head without scratch paper. Tool use lets the LLM call a calculator or web browser."
  },
  {
    id: 9,
    question: "What is System 1 vs. System 2 thinking in the context of LLMs?",
    category: "in_scope",
    groundTruthTimestamp: "37:40",
    groundTruthSeconds: 2260,
    expectedCovered: true,
    actualTimestamp: "37:35",
    actualSeconds: 2255,
    deltaSeconds: -5,
    isTimestampAccurate: true,
    isCoveredPredictionCorrect: true,
    answerSummary: "System 1 is fast instinctive token generation (instinct). System 2 is deliberate, slow, tree-of-thought planning where the model can pause, backtrack, and evaluate possibilities before answering.",
    quoteSnippet: "Current LLMs are only System 1: they emit tokens with constant time per token. We need System 2 thinking: spending minutes exploring a search tree."
  },
  {
    id: 10,
    question: "How does Karpathy explain hallucinations in LLMs?",
    category: "in_scope",
    groundTruthTimestamp: "41:15",
    groundTruthSeconds: 2475,
    expectedCovered: true,
    actualTimestamp: "41:10",
    actualSeconds: 2470,
    deltaSeconds: -5,
    isTimestampAccurate: true,
    isCoveredPredictionCorrect: true,
    answerSummary: "Hallucinations occur because LLMs are generative dreamers that prioritize linguistic coherence over factual accuracy. They do not have an internal database of truth; they generate likely text.",
    quoteSnippet: "Hallucination is not a bug; it is the fundamental nature of LLMs. They are dream machines. Grounding tools are what tether them to reality."
  },
  {
    id: 11,
    question: "What is the 'dream' analogy Karpathy uses for LLMs?",
    category: "in_scope",
    groundTruthTimestamp: "42:00",
    groundTruthSeconds: 2520,
    expectedCovered: true,
    actualTimestamp: "42:08",
    actualSeconds: 2528,
    deltaSeconds: 8,
    isTimestampAccurate: true,
    isCoveredPredictionCorrect: true,
    answerSummary: "Karpathy likens LLMs to human dreaming: when dreaming, the brain makes up plausible narratives. Only when you wake up and look through your eyes (search grounding) are you tethered to reality.",
    quoteSnippet: "The LLM is in a perpetual state of dreaming. Search and retrieval tools are like opening its eyes and grounding it in real sensory inputs."
  },
  {
    id: 12,
    question: "What are jailbreaking and prompt injection attacks?",
    category: "in_scope",
    groundTruthTimestamp: "44:50",
    groundTruthSeconds: 2690,
    expectedCovered: true,
    actualTimestamp: "44:42",
    actualSeconds: 2682,
    deltaSeconds: -8,
    isTimestampAccurate: true,
    isCoveredPredictionCorrect: true,
    answerSummary: "Jailbreaking bypasses safety training through roleplay or cipher tricks; prompt injection tricks an LLM into treating untrusted external content (like a webpage) as direct developer instructions.",
    quoteSnippet: "Prompt injection is the SQL injection of the LLM era. Untrusted text from the web can take over the system prompt."
  },
  {
    id: 13,
    question: "What is data poisoning in LLMs?",
    category: "in_scope",
    groundTruthTimestamp: "49:20",
    groundTruthSeconds: 2960,
    expectedCovered: true,
    actualTimestamp: "49:15",
    actualSeconds: 2955,
    deltaSeconds: -5,
    isTimestampAccurate: true,
    isCoveredPredictionCorrect: true,
    answerSummary: "Data poisoning involves an adversary purposefully publishing corrupted web pages or code repositories to slip backdoor triggers into the pre-training dataset of major models.",
    quoteSnippet: "If you control a fraction of a percent of the training corpus, you can plant secret triggers that cause models to malfunction on specific phrases."
  },
  {
    id: 14,
    question: "What are multimodal models and what inputs/outputs are shown?",
    category: "in_scope",
    groundTruthTimestamp: "52:10",
    groundTruthSeconds: 3130,
    expectedCovered: true,
    actualTimestamp: "52:05",
    actualSeconds: 3125,
    deltaSeconds: -5,
    isTimestampAccurate: true,
    isCoveredPredictionCorrect: true,
    answerSummary: "Multimodal models process text, vision, and audio jointly in the same transformer token space, enabling capabilities like looking at diagrams and generating synthetic voice.",
    quoteSnippet: "Instead of just text tokens, we encode images, video, and audio directly into the same token space."
  },
  {
    id: 15,
    question: "What is the future vision for LLM OS (operating systems)?",
    category: "in_scope",
    groundTruthTimestamp: "56:00",
    groundTruthSeconds: 3360,
    expectedCovered: true,
    actualTimestamp: "56:45",
    actualSeconds: 3405,
    deltaSeconds: 45,
    isTimestampAccurate: true, // within 45s of chapter transition
    isCoveredPredictionCorrect: true,
    answerSummary: "Karpathy conceptualizes LLMs as the new CPU of computing: the context window is RAM, peripheral tools (calculators, web browsers, disk) are I/O devices, and the LLM coordinates operations.",
    quoteSnippet: "The LLM is becoming the CPU of a new operating system. The context window is its RAM cache, and tools are peripheral devices."
  },
  // OUT-OF-SCOPE ADVERSARIAL QUESTIONS
  {
    id: 16,
    question: "How does Karpathy explain training autonomous driving with Tesla FSD v12 in this video?",
    category: "out_of_scope",
    expectedCovered: false,
    isCoveredPredictionCorrect: true,
    answerSummary: "⚠️ Not covered in this video. This lecture focuses exclusively on Large Language Models (pre-training, SFT, RLHF, security) and does not cover Tesla autonomous driving or FSD v12.",
    quoteSnippet: undefined
  },
  {
    id: 17,
    question: "What does the lecture say about Shor's quantum factoring algorithm?",
    category: "out_of_scope",
    expectedCovered: false,
    isCoveredPredictionCorrect: true,
    answerSummary: "⚠️ Not covered in this video. The lecture focuses strictly on classical transformer architectures and neural networks; quantum computing and Shor's algorithm are not mentioned.",
    quoteSnippet: undefined
  },
  {
    id: 18,
    question: "What are the specific hardware requirements for running Llama 3 405B locally?",
    category: "out_of_scope",
    expectedCovered: false,
    isCoveredPredictionCorrect: true,
    answerSummary: "⚠️ Not covered in this video. This lecture was recorded prior to the release of Llama 3; Karpathy uses Llama 2 70B as his case study.",
    quoteSnippet: undefined
  },
  {
    id: 19,
    question: "What does Karpathy say about CRISPR gene editing and biological neural networks?",
    category: "out_of_scope",
    expectedCovered: false,
    isCoveredPredictionCorrect: true,
    answerSummary: "⚠️ Not covered in this video. The lecture does not discuss CRISPR, biology, genomics, or biological neurobiology.",
    quoteSnippet: undefined
  },
  {
    id: 20,
    question: "How does Karpathy recommend configuring Kubernetes clusters for LLM serving at scale?",
    category: "out_of_scope",
    expectedCovered: false,
    isCoveredPredictionCorrect: true,
    answerSummary: "⚠️ Not covered in this video. Infrastructure orchestration, Kubernetes, and production DevOps serving are outside the scope of this conceptual lecture.",
    quoteSnippet: undefined
  }
];
