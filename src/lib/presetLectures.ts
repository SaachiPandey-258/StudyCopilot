export interface LectureChapter {
  title: string;
  timestamp: string;
  seconds: number;
  summary: string;
}

export interface PresetLecture {
  id: string;
  title: string;
  channel: string;
  duration: string;
  description: string;
  chapters: LectureChapter[];
  revisionGuide: {
    executiveSummary: string;
    keyDefinitions: Array<{ term: string; definition: string; timestamp: string; seconds: number }>;
    corePrinciples: string[];
    quickQuiz: Array<{ question: string; answer: string; timestamp: string; seconds: number }>;
  };
  sampleQuestions: string[];
  transcriptSegments: Array<{ text: string; start: number; duration: number }>;
}

export const PRESET_LECTURES: PresetLecture[] = [
  {
    id: "zjkBMFhNj_g",
    title: "Intro to Large Language Models",
    channel: "Andrej Karpathy",
    duration: "1:00:23",
    description: "The premier 1-hour conceptual masterclass by former Tesla AI Director & OpenAI co-founder Andrej Karpathy covering LLM pre-training, fine-tuning, RLHF, security, and the future of LLM OS.",
    chapters: [
      { title: "LLM Weights & Architecture (run.c)", timestamp: "03:15", seconds: 195, summary: "An LLM is just two files: 140GB parameters and ~500 lines of C." },
      { title: "Pre-training: Internet Compression", timestamp: "07:30", seconds: 450, summary: "Compressing 10TB of raw web text into weights over thousands of GPU hours." },
      { title: "Base Models as Document Completers", timestamp: "14:50", seconds: 890, summary: "Why base models are not assistants; they hallucinate plausible completions." },
      { title: "Supervised Fine-Tuning (SFT)", timestamp: "18:10", seconds: 1090, summary: "Swapping raw text for human-crafted Q&A conversations." },
      { title: "RLHF & Comparison Ranking", timestamp: "23:45", seconds: 1425, summary: "Using human preference comparisons and reward models." },
      { title: "Leaderboards & Chatbot Arena", timestamp: "27:10", seconds: 1630, summary: "Elo ratings computed from blind human pairwise matches." },
      { title: "Tools: Calculators & Web Search", timestamp: "32:30", seconds: 1950, summary: "Giving LLMs scratchpads and external programmatic execution." },
      { title: "System 1 vs System 2 Thinking", timestamp: "37:40", seconds: 2260, summary: "Moving from instinctive token output to deliberate tree search." },
      { title: "Hallucinations & The Dream Analogy", timestamp: "41:15", seconds: 2475, summary: "Why LLMs are dreaming and how grounding tools wake them up." },
      { title: "Security: Jailbreaks & Prompt Injection", timestamp: "44:50", seconds: 2690, summary: "Adversarial prompts and untrusted inputs hijacking system instructions." },
      { title: "Multimodality (Vision & Audio)", timestamp: "52:10", seconds: 3130, summary: "Encoding video, audio, and images into the unified token stream." },
      { title: "The LLM Operating System", timestamp: "56:00", seconds: 3360, summary: "The LLM as CPU, context window as RAM, and tools as peripherals." }
    ],
    revisionGuide: {
      executiveSummary: "Large Language Models (LLMs) represent a paradigm shift in computing. At their core, open-weights LLMs consist of two simple artifacts: a parameters weights file (~140GB for Llama 2 70B) and a runtime evaluation script (~500 lines of C). The pipeline consists of two stages: (1) Pre-training, where 10TB of raw internet text is lossily compressed via next-word prediction across thousands of GPUs, and (2) Post-training (SFT and RLHF), where human comparisons train the model to act as a helpful conversational assistant.",
      keyDefinitions: [
        {
          term: "Base Model",
          definition: "A raw pre-trained neural network that acts as a pure document completer rather than an assistant.",
          timestamp: "14:50",
          seconds: 890
        },
        {
          term: "RLHF",
          definition: "Reinforcement Learning from Human Feedback: optimizing candidate outputs using pairwise comparisons scored by human reviewers.",
          timestamp: "23:45",
          seconds: 1425
        },
        {
          term: "Prompt Injection",
          definition: "An adversarial security attack where untrusted third-party text hijacks the model's system prompt instructions.",
          timestamp: "44:50",
          seconds: 2690
        },
        {
          term: "LLM OS",
          definition: "An architectural mental model where the LLM functions as the CPU, context window serves as RAM, and external APIs act as I/O peripherals.",
          timestamp: "56:00",
          seconds: 3360
        }
      ],
      corePrinciples: [
        "LLMs do not contain a database of verified facts; they model token probability distributions.",
        "Hallucination is not an unexpected bug; it is the default generative nature of neural network dreams.",
        "System 1 thinking (instant generation) must be augmented with System 2 tree search for complex mathematical reasoning.",
        "Tool use (calculators, web browsers, code interpreters) grounds the model and overcomes arithmetic limits."
      ],
      quickQuiz: [
        {
          question: "Why does Karpathy say human comparison is better than human generation for RLHF?",
          answer: "Because comparing two candidate responses is cognitively 10x easier for humans than writing the ideal response from scratch.",
          timestamp: "23:50",
          seconds: 1430
        },
        {
          question: "What is the equivalent of SQL injection in generative AI applications?",
          answer: "Prompt injection, where untrusted text from a website or document tricks the LLM into executing malicious instructions.",
          timestamp: "44:50",
          seconds: 2690
        },
        {
          question: "How much compute was required to train Llama 2 70B according to the lecture?",
          answer: "Approximately 6,000 GPUs running for 12 days (~1 million GPU hours), costing millions of dollars.",
          timestamp: "11:15",
          seconds: 675
        }
      ]
    },
    sampleQuestions: [
      "What two files make up an open-weights LLM?",
      "How does Supervised Fine Tuning (SFT) work?",
      "What is the 'dream' analogy for hallucinations?",
      "What is the vision for an LLM Operating System?",
      "⚠️ Negative Grounding Test: How does Karpathy explain Tesla FSD v12?"
    ],
    transcriptSegments: [
      { text: "Welcome everyone to Intro to Large Language Models. In this video I want to give you a conceptual overview of what LLMs are, how they work, and what the future holds.", start: 0, duration: 45 },
      { text: "The neural network is really just two files. For example, in Llama 2 70B, you have a parameters file with 140 gigabytes of float16 weights, and a run.c file with 500 lines of C code.", start: 192, duration: 50 },
      { text: "Pre-training takes a massive chunk of the internet, roughly 10 terabytes of text from Common Crawl, Wikipedia, and books, and compresses it into the weights over thousands of GPU hours.", start: 440, duration: 60 },
      { text: "Meta trained Llama 2 70B on 6,000 GPUs for about 12 days. That's over a million GPU hours and millions of dollars in electricity and compute.", start: 670, duration: 55 },
      { text: "A base model is not an assistant. It is a document completer. You give it text, and it hallucinates how an internet page would continue.", start: 885, duration: 50 },
      { text: "We hire human contractors and write tens of thousands of ideal Q&A conversations. Supervised Fine Tuning swaps the distribution from raw web to dialogues.", start: 1080, duration: 60 },
      { text: "Reinforcement Learning from Human Feedback: comparison is much easier than generation. Humans score which response is better, and we train a reward model.", start: 1420, duration: 65 },
      { text: "On Chatbot Arena, models play blind matches against each other judged by humans, and we calculate their Elo rating just like chess grandmasters.", start: 1620, duration: 55 },
      { text: "You wouldn't ask a human to multiply large numbers in their head without scratch paper. Tool use lets the LLM call a calculator or web browser.", start: 1940, duration: 60 },
      { text: "Current LLMs are only System 1: they emit tokens with constant time per token. We need System 2 thinking: spending minutes exploring a search tree.", start: 2250, duration: 65 },
      { text: "Hallucination is not a bug; it is the fundamental nature of LLMs. They are dream machines. Grounding tools are what tether them to reality.", start: 2465, duration: 60 },
      { text: "The LLM is in a perpetual state of dreaming. Search and retrieval tools are like opening its eyes and grounding it in real sensory inputs.", start: 2520, duration: 55 },
      { text: "Prompt injection is the SQL injection of the LLM era. Untrusted text from the web can take over the system prompt.", start: 2680, duration: 60 },
      { text: "If you control a fraction of a percent of the training corpus, you can plant secret triggers in data poisoning.", start: 2950, duration: 55 },
      { text: "Instead of just text tokens, we encode images, video, and audio directly into the same token space for multimodal models.", start: 3120, duration: 60 },
      { text: "The LLM is becoming the CPU of a new operating system. The context window is its RAM cache, and tools are peripheral devices.", start: 3355, duration: 70 }
    ]
  },
  {
    id: "aircAruvnKk",
    title: "But what is a neural network? | Chapter 1, Deep learning",
    channel: "3Blue1Brown",
    duration: "19:13",
    description: "Grant Sanderson's iconic visual explanation of artificial neural networks, multilayer perceptrons, handwritten digit recognition (MNIST), activations, weights, biases, and the sigmoid function.",
    chapters: [
      { title: "What are neurons and activations?", timestamp: "00:45", seconds: 45, summary: "Neurons as numbers holding activations between 0 and 1." },
      { title: "Layer Structure & MNIST Input", timestamp: "03:10", seconds: 190, summary: "784 input pixels feeding hidden layers to 10 output digits." },
      { title: "Why hidden layers matter", timestamp: "06:20", seconds: 380, summary: "Breaking complex images into visual sub-components (edges, loops)." },
      { title: "Weights, Biases & Weighted Sums", timestamp: "09:15", seconds: 555, summary: "Computing linear combinations and bias thresholds." },
      { title: "The Sigmoid Activation Function", timestamp: "12:40", seconds: 760, summary: "Squashing any real number onto the interval (0, 1)." },
      { title: "Matrix Notation & Vectorization", timestamp: "15:30", seconds: 930, summary: "Expressing the layer transition as a(1) = σ(Wa(0) + b)." }
    ],
    revisionGuide: {
      executiveSummary: "A neural network is fundamentally a mathematical function that maps input vectors to output probabilities. In the classic MNIST digit recognition task, 784 pixel grayscale values feed through hidden layers where each neuron represents a composite feature (like an edge or circle) before producing 10 output class probabilities.",
      keyDefinitions: [
        {
          term: "Activation",
          definition: "A real number typically bounded between 0 and 1 representing the excitation state of a single neuron.",
          timestamp: "00:45",
          seconds: 45
        },
        {
          term: "Weight",
          definition: "A scalar multiplier that determines the strength and sign of connection between two neurons across adjacent layers.",
          timestamp: "09:15",
          seconds: 555
        },
        {
          term: "Bias",
          definition: "A threshold parameter that shifts the weighted sum before applying the activation function.",
          timestamp: "10:30",
          seconds: 630
        },
        {
          term: "Sigmoid Function σ(x)",
          definition: "A mathematical activation function σ(x) = 1 / (1 + e^-x) that squashes any real value into the range (0, 1).",
          timestamp: "12:40",
          seconds: 760
        }
      ],
      corePrinciples: [
        "Hidden layers build hierarchical representations: from raw pixels -> local edges -> composite shapes -> digits.",
        "Layer updates can be computed in high-performance linear algebra: a = σ(Wa + b).",
        "Biases allow neurons to stay inactive until a certain threshold of weighted inputs is reached."
      ],
      quickQuiz: [
        {
          question: "How many input neurons are used for the MNIST 28x28 pixel images?",
          answer: "784 neurons (28 * 28 = 784).",
          timestamp: "03:10",
          seconds: 190
        },
        {
          question: "Why do we use an activation function like Sigmoid?",
          answer: "To squash arbitrary real numbers into a bounded range and introduce non-linearity into the network.",
          timestamp: "12:40",
          seconds: 760
        }
      ]
    },
    sampleQuestions: [
      "What is an activation in a neural network?",
      "How are weights and biases combined mathematically?",
      "Why does 3Blue1Brown recommend breaking images into sub-components?",
      "⚠️ Negative Grounding Test: What does this video say about Transformer Attention heads?"
    ],
    transcriptSegments: [
      { text: "What is a neural network? Let's start with the basics. A neuron is just a thing that holds a number between 0 and 1, called its activation.", start: 45, duration: 40 },
      { text: "For MNIST, we take 28 by 28 pixel images, which gives 784 pixels. Each pixel becomes an input neuron in the first layer.", start: 190, duration: 45 },
      { text: "The hope is that the first hidden layer recognizes edges, the second recognizes components like loops and strokes, and the output gives the digit.", start: 380, duration: 50 },
      { text: "Each connection has a weight. We compute the weighted sum of all activations plus a bias, and pass it through a squashing function.", start: 555, duration: 50 },
      { text: "The sigmoid function σ(z) = 1 / (1 + e^-z) smoothly squashes any real number from negative infinity to positive infinity onto the range 0 to 1.", start: 760, duration: 45 },
      { text: "In compact matrix notation, the activations of the next layer are given by a(1) = σ(W a(0) + b).", start: 930, duration: 45 }
    ]
  }
];
