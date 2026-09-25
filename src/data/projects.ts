export interface ArchitectureStage {
  step: number;
  title: string;
  description: string;
  tech: string;
  badge: string;
}

export interface KnowledgeGraphNode {
  id: string;
  name: string;
  type: "Program" | "File" | "Table" | "SQL" | "BusinessRule" | "SSIS" | "Database" | "Agent" | "Output";
  color: string;
  description: string;
  position: [number, number, number];
  size?: number;
}

export interface KnowledgeGraphEdge {
  source: string;
  target: string;
  label: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Preventive Health Intelligence" | "Game Development" | "Health & Fitness" | "Wellness Analytics" | "Utility & Automation" | "Enterprise Intelligence";
  featured: boolean;
  year: string;
  description: string;
  longDescription: string[];
  tags: string[];
  accentColor: string;
  gradient: string;
  metrics: { label: string; value: string }[];
  architectureStages?: ArchitectureStage[];
  githubUrl?: string;
  liveUrl?: string;
  imageAlt: string;
  hasInteractiveDemo?: boolean;
}

export const FEATURED_WELLSPRING_PROJECT: ProjectItem = {
  id: "wellspring",
  title: "Wellspring",
  subtitle: "Preventive Health Intelligence Platform",
  category: "Preventive Health Intelligence",
  featured: true,
  year: "2026",
  description: "A full-stack health intelligence platform engineered using React, Spring Boot, and MySQL. Features real-time BMI classification, intelligent symptom triage assessment, and automated personalized diet planning to empower proactive wellness.",
  longDescription: [
    "Preventive healthcare requires early pattern detection and accessible health metrics. Wellspring bridges this gap with an intuitive, responsive React interface backed by robust Spring Boot REST services.",
    "The application integrates an automated BMI diagnostic matrix, interactive symptom triage engine, and customized macronutrient dietary recommendation workflows with relational persistence in MySQL.",
  ],
  tags: ["React", "Spring Boot", "MySQL", "Java", "REST APIs", "Health Tech", "Diet Planning", "Symptom Checker"],
  accentColor: "#06B6D4",
  gradient: "from-cyan-600 via-blue-600 to-indigo-600",
  metrics: [
    { label: "Frontend", value: "React 19 + Tailwind" },
    { label: "Backend API", value: "Spring Boot Microservices" },
    { label: "Database", value: "MySQL Relational" },
    { label: "Key Features", value: "BMI + Symptoms + Diet" },
  ],
  hasInteractiveDemo: true,
  architectureStages: [
    {
      step: 1,
      title: "Biometric Telemetry Ingestion",
      description: "Captures user physiological indicators (height, weight, age, activity level, and reported symptoms) with validation.",
      tech: "React State & Responsive UI",
      badge: "Telemetry",
    },
    {
      step: 2,
      title: "Spring Boot Calculation Engine",
      description: "Processes biometric formulas, BMI classification, and symptom triage logic through secure REST endpoints.",
      tech: "Java Spring Boot & REST APIs",
      badge: "Backend",
    },
    {
      step: 3,
      title: "MySQL Data Persistence Layer",
      description: "Persists user profiles, historical health tracking logs, nutritional libraries, and customized diet regimens.",
      tech: "MySQL Relational DB",
      badge: "Persistence",
    },
    {
      step: 4,
      title: "Personalized Diet & Wellness Planner",
      description: "Calculates daily caloric targets, macronutrient splits, and dynamic dietary suggestions tailored to health goals.",
      tech: "Nutritional Algorithms",
      badge: "Intelligence",
    },
    {
      step: 5,
      title: "Interactive Responsive Dashboard",
      description: "Presents real-time health visualizers, diet calendars, and symptom insights with responsive feedback.",
      tech: "React UI & CSS3 Visualizers",
      badge: "Interface",
    },
  ],
  imageAlt: "Wellspring Preventive Health Intelligence Platform Architecture",
  githubUrl: "https://github.com/DeepakNandhakumar",
  liveUrl: "#wellspring-demo",
};

export const FEATURED_SPANSTRIKE_PROJECT: ProjectItem = {
  id: "spanstrike",
  title: "SpanStrike",
  subtitle: "Interactive 3D Game Development in Unreal Engine",
  category: "Game Development",
  featured: true,
  year: "2024",
  description: "A passion project exploring 3D real-time game mechanics, physics simulations, and responsive player locomotion using Unreal Engine and C++. Features dynamic collision volumes, particle weapon effects, and high-performance physics.",
  longDescription: [
    "SpanStrike represents deep exploration into low-level systems programming, real-time 3D spatial mathematics, and game engine mechanics.",
    "Engineered with Unreal Engine 5 using C++ and Blueprints, focusing on 60 FPS rendering pipelines, particle emitters, dynamic lighting, and rigid-body physics interactions.",
  ],
  tags: ["Unreal Engine 5", "C++", "3D Game Design", "Physics Simulation", "Blueprints", "Lumen Lighting"],
  accentColor: "#7C3AED",
  gradient: "from-purple-600 via-indigo-600 to-pink-600",
  metrics: [
    { label: "Engine", value: "Unreal Engine 5" },
    { label: "Core Logic", value: "C++ & Blueprints" },
    { label: "Physics", value: "Chaos Real-Time Rigid Body" },
    { label: "Target FPS", value: "60 FPS Fluid" },
  ],
  hasInteractiveDemo: true,
  architectureStages: [
    {
      step: 1,
      title: "Character Locomotion State Machine",
      description: "Engineered responsive 8-way directional movement, sprint acceleration, and jump physics blending.",
      tech: "C++ & Animation Blueprints",
      badge: "Locomotion",
    },
    {
      step: 2,
      title: "Real-Time Collision & Raycasting",
      description: "Implemented high-precision sweep tests, projectile trajectory tracing, and impact surfaces.",
      tech: "Unreal PhysX / Chaos",
      badge: "Physics",
    },
    {
      step: 3,
      title: "Particle Visual FX & Shaders",
      description: "Crafted dynamic Niagara particle systems for muzzle flashes, shockwaves, and particle explosions.",
      tech: "Niagara FX System",
      badge: "Visuals",
    },
  ],
  imageAlt: "SpanStrike 3D Unreal Engine Game Development",
  githubUrl: "https://github.com/DeepakNandhakumar",
  liveUrl: "#spanstrike-demo",
};

export const OTHER_PROJECTS: ProjectItem[] = [
  {
    id: "fitnheal",
    title: "FitNHeal",
    subtitle: "All-in-One Health & Fitness Platform",
    category: "Health & Fitness",
    featured: false,
    year: "2025",
    description: "An all-in-one health and fitness web platform developed with HTML, CSS, and JavaScript, designed to help users structure their daily workouts, monitor active fitness routines, and cultivate healthy habits.",
    longDescription: [
      "FitNHeal provides an interactive workout scheduler, exercise breakdown library, and habit tracking mechanism built with pure web standards.",
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "Fitness Tracking", "UI/UX", "DOM Manipulation"],
    accentColor: "#10B981",
    gradient: "from-emerald-500 to-teal-600",
    metrics: [
      { label: "Frontend", value: "HTML5 / CSS3 / JS" },
      { label: "Features", value: "Workout Scheduler & Logs" },
    ],
    hasInteractiveDemo: true,
    imageAlt: "FitNHeal Health & Fitness Platform",
    githubUrl: "https://github.com/DeepakNandhakumar",
    liveUrl: "#fitnheal-demo",
  },
  {
    id: "healthline-insights",
    title: "Healthline Insights",
    subtitle: "Holistic Wellness & Healthcare Information Platform",
    category: "Wellness Analytics",
    featured: false,
    year: "2024",
    description: "A project focused on promoting holistic wellness through comprehensive, verified health resources, wellness metrics, and intuitive interactive self-assessment tools.",
    longDescription: [
      "Designed with an accessible, human-centric interface to provide clear guidance on wellness metrics, hydration, sleep hygiene, and preventive care.",
    ],
    tags: ["JavaScript", "HTML/CSS", "Healthcare UX", "Wellness Analytics", "Responsive Design"],
    accentColor: "#2563EB",
    gradient: "from-blue-600 to-cyan-600",
    metrics: [
      { label: "Domain", value: "Wellness Analytics" },
      { label: "Stack", value: "JavaScript & CSS" },
    ],
    hasInteractiveDemo: true,
    imageAlt: "Healthline Insights Platform",
    githubUrl: "https://github.com/DeepakNandhakumar",
    liveUrl: "#healthline-demo",
  },
  {
    id: "rent-electricity-calculator",
    title: "House Rent & Electricity Bill Calculator",
    subtitle: "Utility Cost & Rent Management System",
    category: "Utility & Automation",
    featured: false,
    year: "2023",
    description: "Collaborated on a team project to build a dedicated utility cost calculator that automates tiered electricity bill splits, shared house rent apportioning, and budget management.",
    longDescription: [
      "Automates tier-based power tariff computations and multi-tenant rent sharing algorithms to prevent manual calculation errors.",
    ],
    tags: ["JavaScript", "HTML5", "CSS3", "Math Automation", "Collaborative Project"],
    accentColor: "#F59E0B",
    gradient: "from-amber-500 to-orange-600",
    metrics: [
      { label: "Type", value: "Team Automation Tool" },
      { label: "Algorithm", value: "Tiered Tariff Computation" },
    ],
    hasInteractiveDemo: true,
    imageAlt: "Rent and Electricity Calculator",
    githubUrl: "https://github.com/DeepakNandhakumar",
    liveUrl: "#calculator-demo",
  },
  {
    id: "kairix",
    title: "KAIRIX",
    subtitle: "Legacy Modernization Intelligence Platform",
    category: "Enterprise Intelligence",
    featured: false,
    year: "2026",
    description: "An intelligent platform for understanding legacy application logic, business rules, relationships, data lineage, and system dependencies across enterprise artifacts.",
    longDescription: [
      "Enterprise modernization faces critical roadblocks when deciphering monolithic legacy codebases spanning COBOL, complex SQL procedures, and SSIS workflows.",
      "KAIRIX ingests heterogeneous enterprise source artifacts, constructs high-dimensional relationship graphs in Neo4j coupled with Qdrant vector embeddings, and leverages autonomous investigation agents.",
    ],
    tags: ["Neo4j", "Vector Search", "Python", "React", "AI Agents", "Knowledge Graph"],
    accentColor: "#4F46E5",
    gradient: "from-indigo-600 via-purple-600 to-cyan-500",
    metrics: [
      { label: "Graph Engine", value: "Neo4j + Cypher" },
      { label: "Retrieval", value: "Vector Search (Qdrant)" },
      { label: "Parsing", value: "COBOL / SQL / SSIS" },
    ],
    imageAlt: "KAIRIX Legacy Modernization Intelligence Platform",
    githubUrl: "https://github.com/DeepakNandhakumar",
    liveUrl: "#kairix",
  },
];

export const KAIRIX_KNOWLEDGE_GRAPH_NODES: KnowledgeGraphNode[] = [
  {
    id: "cobol-prog",
    name: "CBL_TRANS_PROC.cbl",
    type: "Program",
    color: "#4F46E5",
    description: "Core legacy transaction processing program handling batch billing runs.",
    position: [-2.8, 1.2, 0.4],
    size: 0.38,
  },
  {
    id: "copybook-file",
    name: "CUST_REC.cpy",
    type: "File",
    color: "#6366F1",
    description: "Enterprise shared data structure defining customer account fields.",
    position: [-1.8, 2.0, -0.6],
    size: 0.3,
  },
  {
    id: "ssis-package",
    name: "ETL_NIGHTLY_SYNC.dtsx",
    type: "SSIS",
    color: "#06B6D4",
    description: "SSIS package moving operational records into data warehouse staging.",
    position: [-2.2, -1.0, 0.2],
    size: 0.34,
  },
  {
    id: "sql-proc",
    name: "usp_CalculateInterest.sql",
    type: "SQL",
    color: "#0EA5E9",
    description: "Stored procedure executing compound interest and penalty fee schedules.",
    position: [-0.6, -1.8, -0.4],
    size: 0.32,
  },
  {
    id: "table-customer",
    name: "TBL_ACCOUNT_LEDGER",
    type: "Table",
    color: "#10B981",
    description: "Primary relational ledger table tracking transactional balance histories.",
    position: [0.2, 0.8, -0.2],
    size: 0.38,
  },
  {
    id: "business-rule",
    name: "BR_OVERDRAFT_GRACE_LIMIT",
    type: "BusinessRule",
    color: "#EC4899",
    description: "Extracted rule: 3-day grace period with waiver if balance restored > $500.",
    position: [0.9, 2.2, 0.6],
    size: 0.32,
  },
  {
    id: "neo4j-graph",
    name: "Neo4j Knowledge Layer",
    type: "Database",
    color: "#8B5CF6",
    description: "Unified property graph mapping 12,000+ cross-system entity edges.",
    position: [1.8, -0.4, 0.0],
    size: 0.44,
  },
  {
    id: "investigation-agent",
    name: "KAIRIX Reasoning Agent",
    type: "Agent",
    color: "#7C3AED",
    description: "Multi-hop graph traversal agent synthesizing business logic explanation.",
    position: [2.9, 1.4, -0.3],
    size: 0.4,
  },
  {
    id: "modern-output",
    name: "Modernized API & Specification",
    type: "Output",
    color: "#F59E0B",
    description: "Clean TypeScript domain model & OpenAPI 3.1 specification for cloud microservices.",
    position: [3.4, -1.2, 0.5],
    size: 0.36,
  },
];

export const KAIRIX_KNOWLEDGE_GRAPH_EDGES: KnowledgeGraphEdge[] = [
  { source: "cobol-prog", target: "copybook-file", label: "INCLUDES" },
  { source: "cobol-prog", target: "table-customer", label: "WRITES_TO" },
  { source: "ssis-package", target: "table-customer", label: "TRANSFORMS" },
  { source: "sql-proc", target: "table-customer", label: "QUERIES" },
  { source: "cobol-prog", target: "business-rule", label: "ENFORCES" },
  { source: "table-customer", target: "neo4j-graph", label: "INDEXED_IN" },
  { source: "business-rule", target: "neo4j-graph", label: "LINKED_TO" },
  { source: "neo4j-graph", target: "investigation-agent", label: "QUERIED_BY" },
  { source: "investigation-agent", target: "modern-output", label: "GENERATES" },
];

