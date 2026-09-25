export interface ServiceCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
  iconName: string;
  accentColor: string;
  gradient: string;
}

export const SERVICES_LIST: ServiceCard[] = [
  {
    id: "software-development",
    title: "Software Development",
    subtitle: "Modern scalable applications",
    description: "Architecting end-to-end full-stack web applications and robust software modules with clean code, reusable design patterns, and responsive UX.",
    capabilities: [
      "Modern React & TypeScript Interfaces",
      "Java & Spring Boot Resilient Backends",
      "MySQL Database Schema Architecture",
      "Component-Driven Clean Architectures",
    ],
    iconName: "Code2",
    accentColor: "#4F46E5",
    gradient: "from-indigo-500/10 via-indigo-500/5 to-transparent",
  },
  {
    id: "ai-applications",
    title: "AI Applications",
    subtitle: "AI-powered software solutions",
    description: "Integrating modern Large Language Models, knowledge graph reasoning, and autonomous multi-hop agents to turn unstructured artifacts into structured intelligence.",
    capabilities: [
      "LLM & Prompt Engineering Pipelines",
      "Autonomous Agent Task Execution",
      "Knowledge Graph Retrieval (Neo4j)",
      "Semantic Code & Document Search",
    ],
    iconName: "Sparkles",
    accentColor: "#7C3AED",
    gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
  },
  {
    id: "automation",
    title: "Automation",
    subtitle: "Engineering workflow automation",
    description: "Eliminating repetitive technical bottlenecks through automated Python scripts, data ingestion pipelines, and developer tooling.",
    capabilities: [
      "Automated File & Data Parsers",
      "ETL & Data Transformation Scripts",
      "Calculation & Billing Automations",
      "Continuous Workflow Tooling",
    ],
    iconName: "Cpu",
    accentColor: "#06B6D4",
    gradient: "from-cyan-500/10 via-cyan-500/5 to-transparent",
  },
  {
    id: "data-solutions",
    title: "Data Solutions",
    subtitle: "Data processing and analytics",
    description: "Structuring, indexing, and analyzing complex datasets to produce actionable business telemetry, health metrics, and clear data lineage graphs.",
    capabilities: [
      "Relational Database Query Optimization",
      "Biometric & Health Telemetry Processing",
      "Databricks & Cloud Data Exploration",
      "Interactive Data Visualizers",
    ],
    iconName: "Database",
    accentColor: "#059669",
    gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
  },
  {
    id: "api-development",
    title: "API Development",
    subtitle: "Reliable API integrations",
    description: "Designing clean, type-safe RESTful API endpoints with structured JSON schemas, predictable error contracts, and low-latency database queries.",
    capabilities: [
      "Spring Boot RESTful Microservices",
      "Strict Request / Response Contracts",
      "Database Transaction Integrity",
      "Secure Endpoint Integration",
    ],
    iconName: "Network",
    accentColor: "#2563EB",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
  },
  {
    id: "technical-problem-solving",
    title: "Technical Problem Solving",
    subtitle: "Turning complex requirements into practical software",
    description: "Deconstructing ambiguous enterprise requirements and legacy monoliths into elegant, modular, and maintainable software architectures.",
    capabilities: [
      "Algorithmic Data Structure Selection",
      "Legacy Codebase Deconstruction",
      "Performance Root-Cause Debugging",
      "System Scalability Optimization",
    ],
    iconName: "Layers",
    accentColor: "#D97706",
    gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
  },
];
