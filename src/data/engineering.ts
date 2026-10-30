export type Project = {
  title: string;
  kind: string;
  description: string;
  tags: string[];
  image: string;
  width: number;
  height: number;
  liveUrl: string;
  githubUrl?: string;
};

export const CAPABILITIES = [
  {
    marker: "01",
    title: "LLM product features",
    copy: "AI that lives inside the product, not beside it: streaming responses, structured output your code can trust, prompts under version control, and usage limits that protect your margins.",
    details: ["Prompt design", "Structured output", "Streaming", "Metering"],
  },
  {
    marker: "02",
    title: "RAG and semantic search",
    copy: "Answers grounded in your own data. Chunking, embeddings, hybrid search, and reranking tuned against real questions, with citations so people can check the source.",
    details: ["Embeddings", "Vector search", "Hybrid retrieval", "Reranking"],
  },
  {
    marker: "03",
    title: "Agents and tool calling",
    copy: "Agents that take real actions through well-defined tools, with validated inputs, bounded loops, and a person in the loop wherever a mistake would be expensive.",
    details: ["Tool calling", "MCP", "Orchestration", "Human review"],
  },
  {
    marker: "04",
    title: "Running it in production",
    copy: "The work after the demo: evals that catch regressions, tracing for every run, caching and model routing for cost and latency, and fallbacks for when a provider goes down.",
    details: ["Evals", "Tracing", "Guardrails", "Cost control"],
  },
];

/** An example of how an agent run is structured, not a record of a real one. */
export const AGENT_TRACE = [
  { step: "REQUEST", detail: "Turn last week's client calls into a task list" },
  { step: "PLAN", detail: "Needs the call notes, then a write to the task system" },
  { step: "RETRIEVE", detail: "Hybrid search over notes, rerank, keep the best matches" },
  { step: "CALL TOOL", detail: "create_tasks(items, owner, due_date)" },
  { step: "VALIDATE", detail: "Check arguments against the schema, retry once on failure" },
  { step: "REVIEW", detail: "Pause for approval before anything is written" },
  { step: "RESPOND", detail: "Summary with citations back to each source note" },
  { step: "LOG", detail: "Save the trace, add the run to the eval set" },
];

export const PROJECTS: Project[] = [
  {
    title: "Note Me Please",
    kind: "LLM product",
    description:
      "An AI notes organizer for solo creators. Its assistant, Cortex AI, works on the page you are writing: it summarizes, expands, rewrites, and turns rough notes into tags, tasks, and drafts, with AI usage metered per plan.",
    tags: ["Cortex AI", "LLM Features", "Search", "Tasks", "Sharing"],
    image: "/images/project-notemeplease-v1.webp",
    width: 1200,
    height: 630,
    liveUrl: "https://notemeplease.com",
  },
  {
    title: "MyContent",
    kind: "Generative AI product",
    description:
      "An AI creative engine that generates product visuals, videos, and captions tailored to a brand, built for content and product marketing workflows.",
    tags: ["Image Generation", "Video", "Captions", "Brand Assets"],
    image: "/images/project-mycontent-v2.webp",
    width: 1672,
    height: 941,
    liveUrl: "https://mycontent.supply",
  },
  {
    title: "Yoop",
    kind: "Systems / Rust",
    description:
      "A very fast peer-to-peer CLI for local network file transfers and clipboard sync. Simple 4-character codes, TLS 1.3, and resumable transfers, with no cloud uploads or accounts.",
    tags: ["Rust", "P2P", "TLS 1.3", "mDNS", "Open Source"],
    image: "/images/project-yoop-v1.webp",
    width: 1920,
    height: 970,
    liveUrl: "https://yoop.sanchxt.com",
    githubUrl: "https://github.com/sanchxt/yoop",
  },
];

export const EXPERIENCE = [
  {
    role: "Fullstack Developer",
    company: "Ebslon Infotech",
    period: "Jan. 2025 - Present",
    description:
      "Developed ERP systems end to end. Managed DevOps, CI/CD pipelines (Jenkins, GitHub Actions), and VPS infrastructure (Hetzner, Contabo). Implemented real-time features with WebSockets and Redis caching.",
  },
  {
    role: "Frontend Intern",
    company: "Bestor",
    period: "Nov. 2021 - Jan. 2022",
    description:
      "Designed and improved UI/UX of websites in Shopify. Collaborated with developers and SEO team to enhance user experience and site performance.",
  },
];

export const STACK = [
  { group: "Model APIs", items: ["OpenAI", "Anthropic", "Gemini"] },
  { group: "Orchestration", items: ["Vercel AI SDK", "LangChain", "LangGraph"] },
  { group: "Agents", items: ["Tool calling", "MCP", "Structured output"] },
  { group: "Retrieval", items: ["Embeddings", "pgvector", "Pinecone", "Hybrid search", "Reranking"] },
  { group: "Quality", items: ["Evals", "Tracing", "Guardrails", "Prompt caching"] },
  { group: "Languages", items: ["TypeScript", "Python", "Rust", "Go"] },
  { group: "Data and real-time", items: ["PostgreSQL", "Redis", "WebSockets"] },
  { group: "Infrastructure", items: ["GitHub Actions", "Jenkins", "Hetzner", "Contabo"] },
];
