export interface NavItem {
  id: string;
  label: string;
  landmark: string;
  href: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

export interface SkillItem {
  name: string;
  category: "languages" | "frontend" | "backend" | "ai" | "data" | "engineering" | "databases";
  level?: number;
  iconName: string;
  description: string;
  connectedSkills: string[];
}

export interface SkillCategory {
  id: "languages" | "frontend" | "backend" | "ai" | "data" | "engineering" | "databases";
  label: string;
  color: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  highlightMetric?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  score: string;
}

export interface AchievementItem {
  title: string;
  year: string;
  category: "Leadership" | "Competition" | "Recognition" | "AI & Tech";
  description?: string;
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Preventive Health Intelligence" | "Health & Fitness" | "Game Development" | "Wellness Analytics" | "Utility & Automation";
  featured: boolean;
  year: string;
  description: string;
  longDescription?: string[];
  tags: string[];
  metrics?: { label: string; value: string }[];
  architectureStages?: {
    step: number;
    title: string;
    description: string;
    tech: string;
  }[];
  githubUrl?: string;
  liveUrl?: string;
  accentColor: string;
  imageAlt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  icon: string;
  gradient: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
  icon: string;
}

export const PERSONAL_INFO = {
  name: "Deepak N",
  fullName: "Deepak Nandakumar",
  shortName: "Deepak",
  initials: "DN",
  currentRole: "Software Engineer at Owlsure",
  titles: [
    "Software Engineer @ Owlsure",
    "Full-Stack Developer",
    "React & Spring Boot Engineer",
    "AI & Data Enthusiast",
    "BCA Graduate",
    "Problem Solver",
  ],
  tagline: "Software Engineer at Owlsure building scalable full-stack applications, intelligent healthcare platforms, and modern digital experiences.",
  about: "I’m Deepak N, a Software Engineer at Owlsure with strong expertise in full-stack programming, React, Java, Spring Boot, Python, and modern web development. A BCA graduate (80%) from TERF’s Academy College of Arts and Science, I am passionate about building real-world software, health intelligence systems, and continuously pushing technical boundaries.",
  location: "Tirupur, Tamil Nadu, India",
  phone: "+91 6382996124",
  email: "deepakdeepak01452@gmail.com",
  resumePath: "/resume.pdf",
  status: "Working as Software Engineer @ Owlsure",
  terminalWelcome: "Antigravity Cinematic Shell v2.5 // Deepak N [Software Engineer @ Owlsure]",
};

export const SITE_CONFIG = {
  domain: "https://deepaknandakumar.dev",
  title: "Deepak N | Software Engineer at Owlsure",
  description: "Official portfolio of Deepak N — Software Engineer at Owlsure, Full-Stack Developer, and Creator of Wellspring Health Intelligence Platform.",
  keywords: [
    "Deepak N",
    "Deepak Nandakumar",
    "Owlsure Software Engineer",
    "Deepak Owlsure",
    "Wellspring Health Platform",
    "React Developer",
    "Spring Boot Developer",
    "Full-Stack Engineer",
    "Tirupur Developer",
  ],
  author: "Deepak N",
  twitterHandle: "@DeepakNandhakumar",
};

export const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "Origin", landmark: "00 // ORIGIN", href: "#hero" },
  { id: "about", label: "About", landmark: "01 // ABOUT", href: "#about" },
  { id: "skills", label: "Skills", landmark: "02 // SKILLS", href: "#skills" },
  { id: "experience", label: "Experience & Education", landmark: "03 // JOURNEY", href: "#experience" },
  { id: "projects", label: "Projects", landmark: "04 // PROJECTS", href: "#projects" },
  { id: "achievements", label: "Achievements", landmark: "05 // HONORS", href: "#achievements" },
  { id: "services", label: "Expertise", landmark: "06 // SERVICES", href: "#services" },
  { id: "contact", label: "Contact", landmark: "07 // DESTINATION", href: "#contact" },
];

export const STATISTICS: StatItem[] = [
  {
    value: 80,
    suffix: "%",
    label: "BCA Academic Merit",
    sublabel: "TERF's Academy College",
  },
  {
    value: 5,
    suffix: "★",
    label: "HackerRank Gold Badge",
    sublabel: "Problem Solving Excellence",
  },
  {
    value: 5,
    suffix: "+",
    label: "Real-World Projects",
    sublabel: "Wellspring, FitNHeal & More",
  },
  {
    value: 100,
    suffix: "%",
    label: "Attendance & Dedication",
    sublabel: "Annual Day Award Winner",
  },
];

export const EDUCATION_LIST: EducationItem[] = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "TERF’s Academy College of Arts and Science",
    period: "2023 — 2026",
    score: "80%",
  },
  {
    degree: "HSC & SSLC",
    institution: "Annai Matric Hr Sec School",
    period: "2021 — 2023",
    score: "71%",
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: "Attended Microsoft AI Tour & Met Satya Nadella",
    year: "2025",
    category: "AI & Tech",
    description: "Participated in the premier Microsoft AI Tour conference and had the honor of meeting Microsoft CEO Satya Nadella.",
    iconName: "Sparkles",
  },
  {
    title: "Secured 1st Place in Code-Fiesta Event",
    year: "2025",
    category: "Competition",
    description: "Won first prize in the prestigious competitive programming Code-Fiesta championship.",
    iconName: "Trophy",
  },
  {
    title: "Earned 5-Star Gold Badge on HackerRank",
    year: "2024",
    category: "Recognition",
    description: "Achieved the top-tier 5-star gold rank in problem solving and data structures on HackerRank.",
    iconName: "Award",
  },
  {
    title: "Event Coordinator for ADZAP Event",
    year: "2025",
    category: "Leadership",
    description: "Spearheaded and organized the ADZAP creative marketing and technology event.",
    iconName: "Users",
  },
  {
    title: "Best Performer of the Month (Technical)",
    year: "2024",
    category: "Recognition",
    description: "Awarded top technical performer for engineering excellence and problem solving.",
    iconName: "Medal",
  },
  {
    title: "Advanced to Round 2 of Tata Imagination Challenge",
    year: "2024 & 2025",
    category: "Competition",
    description: "Successfully qualified for the national second round of the prestigious Tata Imagination Challenge across consecutive years.",
    iconName: "Flame",
  },
  {
    title: "Secured 2nd Prize in Inter-College Programming Contest",
    year: "2024",
    category: "Competition",
    description: "Won second prize competing against multiple regional engineering and arts institutions.",
    iconName: "Code2",
  },
  {
    title: "Received 100% Attendance Award",
    year: "2024",
    category: "Recognition",
    description: "Recognized with the 100% Attendance Award during the Annual Day celebration.",
    iconName: "CheckCircle2",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    color: "#4F46E5",
    skills: [
      { name: "Java", category: "languages", iconName: "Coffee", description: "Core OOP, Spring Boot backends, data structures & algorithms", connectedSkills: ["Spring Boot", "MySQL", "REST APIs"] },
      { name: "Python", category: "languages", iconName: "Terminal", description: "Automation scripting, data manipulation, backend logic, and AI exploration", connectedSkills: ["MySQL", "REST APIs"] },
      { name: "C / C++", category: "languages", iconName: "Cpu", description: "Low-level system programming, memory management, and Unreal Engine gameplay logic", connectedSkills: ["Unreal Engine"] },
      { name: "JavaScript", category: "languages", iconName: "Code2", description: "Modern ES6+ asynchronous web development and DOM manipulation", connectedSkills: ["React", "HTML & CSS"] },
      { name: "SQL / MySQL", category: "languages", iconName: "Database", description: "Relational database schema modeling, queries, indexing, and procedures", connectedSkills: ["Spring Boot", "React", "PostgreSQL"] },
      { name: "HTML & CSS", category: "languages", iconName: "Layout", description: "Semantic markup, modern flexbox/grid styling, and responsive web design", connectedSkills: ["JavaScript", "React"] },
    ],
  },
  {
    id: "frontend",
    label: "Frontend & UI",
    color: "#06B6D4",
    skills: [
      { name: "React (MERN)", category: "frontend", iconName: "Atom", description: "Component-driven reactive user interfaces, state management & hooks", connectedSkills: ["JavaScript", "HTML & CSS", "Spring Boot"] },
      { name: "Tailwind CSS", category: "frontend", iconName: "Palette", description: "Utility-first modern styling, dark mode, and glassmorphic designs", connectedSkills: ["React", "Next.js"] },
      { name: "Next.js", category: "frontend", iconName: "Globe", description: "Modern React framework with App Router, SSR, and SEO optimization", connectedSkills: ["React", "TypeScript"] },
      { name: "Responsive UI", category: "frontend", iconName: "Layout", description: "Mobile-first responsive design across all screen viewports", connectedSkills: ["HTML & CSS", "Tailwind CSS"] },
    ],
  },
  {
    id: "backend",
    label: "Backend & Systems",
    color: "#7C3AED",
    skills: [
      { name: "Spring Boot", category: "backend", iconName: "Server", description: "Enterprise Java backend framework for RESTful microservices", connectedSkills: ["Java", "MySQL", "REST APIs"] },
      { name: "REST APIs", category: "backend", iconName: "Network", description: "Designing clean HTTP endpoints with JSON serialization & error handling", connectedSkills: ["Spring Boot", "React", "Python"] },
      { name: "MERN Stack", category: "backend", iconName: "Layers", description: "Full-stack JavaScript stack integrating frontend, backend, and DB", connectedSkills: ["React", "JavaScript", "MySQL"] },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    color: "#10B981",
    skills: [
      { name: "MySQL", category: "databases", iconName: "Database", description: "Relational database management system for application data persistence", connectedSkills: ["Spring Boot", "Java", "SQL / MySQL"] },
      { name: "PostgreSQL", category: "databases", iconName: "Database", description: "Advanced open-source relational database for enterprise apps", connectedSkills: ["SQL / MySQL", "Spring Boot"] },
    ],
  },
  {
    id: "engineering",
    label: "Tools & Platforms",
    color: "#3B82F6",
    skills: [
      { name: "Git & GitHub", category: "engineering", iconName: "GitBranch", description: "Distributed version control, pull requests, and collaborative development", connectedSkills: ["Software Architecture"] },
      { name: "Microsoft Azure", category: "engineering", iconName: "Compass", description: "Cloud computing fundamentals and cloud resource deployment", connectedSkills: ["Git & GitHub"] },
      { name: "Unreal Engine", category: "engineering", iconName: "Box", description: "3D interactive game development and real-time graphics simulation", connectedSkills: ["C / C++"] },
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-owlsure",
    role: "Software Engineer",
    organization: "Owlsure",
    period: "2024 — Present",
    location: "India",
    type: "Full-Time",
    summary: "Working as a Software Engineer at Owlsure, architecting and delivering full-stack web solutions, scalable services, and modern digital applications.",
    responsibilities: [
      "Engineering robust software modules and responsive web applications using modern JavaScript/React and backend technologies.",
      "Collaborating on database architecture, RESTful API design, and system performance optimization.",
      "Developing clean, maintainable code adhering to industry best practices and modern software design patterns.",
      "Participating in agile code reviews, feature implementations, and continuous system enhancement.",
    ],
    technologies: ["React", "JavaScript", "Python", "Java", "Spring Boot", "MySQL", "REST APIs", "Git", "Next.js"],
    highlightMetric: "Active Software Engineer @ Owlsure",
  },
];

export const FEATURED_WELLSPRING_PROJECT: ProjectItem = {
  id: "wellspring",
  title: "Wellspring",
  subtitle: "Preventive Health Intelligence Platform",
  category: "Preventive Health Intelligence",
  featured: true,
  year: "2026",
  description: "A comprehensive full-stack health intelligence platform engineered using React, Spring Boot, and MySQL. Provides automated BMI calculation, intuitive symptom checking, and personalized diet planning to empower users with preventive healthcare insights.",
  longDescription: [
    "Wellspring was designed to bridge the gap between everyday lifestyle choices and clinical wellness awareness. Millions of users struggle with managing nutrition, understanding early symptoms, and tracking baseline health metrics.",
    "Built with a reactive React frontend and a resilient Spring Boot microservice architecture connected to MySQL, Wellspring delivers real-time symptom assessment, personalized diet recommendations, and vital health telemetry in an intuitive interface.",
  ],
  tags: ["React", "Spring Boot", "MySQL", "Java", "REST APIs", "Health Tech", "Diet Planning", "Symptom Checker"],
  metrics: [
    { label: "Core Architecture", value: "React + Spring Boot" },
    { label: "Database Layer", value: "MySQL Relational" },
    { label: "Key Modules", value: "BMI + Symptoms + Diet" },
    { label: "Target Domain", value: "Preventive Healthcare" },
  ],
  architectureStages: [
    {
      step: 1,
      title: "User Health Telemetry Ingestion",
      description: "Captures user physiological indicators (height, weight, age, activity level, and reported symptoms).",
      tech: "React State & Form Validation",
    },
    {
      step: 2,
      title: "Spring Boot Microservice Engine",
      description: "Processes biometric calculations, BMI classification, and symptom triage logic through secure REST endpoints.",
      tech: "Java Spring Boot & REST APIs",
    },
    {
      step: 3,
      title: "MySQL Data Persistence",
      description: "Stores user profiles, historical health metrics, nutritional databases, and customized diet regimens.",
      tech: "MySQL Relational DB",
    },
    {
      step: 4,
      title: "Personalized Diet & Wellness Generation",
      description: "Calculates daily caloric targets, macronutrient splits, and dynamic dietary suggestions tailored to health goals.",
      tech: "Nutritional Algorithms",
    },
    {
      step: 5,
      title: "Interactive Responsive Dashboard",
      description: "Presents real-time health visualizers, diet calendars, and symptom insights with responsive feedback.",
      tech: "React UI & CSS3 Visualizers",
    },
  ],
  accentColor: "#06B6D4",
  imageAlt: "Wellspring Preventive Health Intelligence Platform Architecture",
  githubUrl: "https://github.com/DeepakNandhakumar",
  liveUrl: "#projects",
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
    tags: ["HTML5", "CSS3", "JavaScript", "Fitness Tracking", "UI/UX", "DOM Manipulation"],
    accentColor: "#10B981",
    imageAlt: "FitNHeal Health & Fitness Platform",
    githubUrl: "https://github.com/DeepakNandhakumar",
    liveUrl: "#projects",
  },
  {
    id: "spanstrike",
    title: "SpanStrike",
    subtitle: "Interactive Game Development in Unreal Engine",
    category: "Game Development",
    featured: false,
    year: "2024",
    description: "A passion project exploring 3D game mechanics and simulation using Unreal Engine and C++. Features immersive real-time environments, dynamic physics, particle visual effects, and fluid player character controls.",
    tags: ["Unreal Engine", "C++", "3D Game Design", "Physics Simulation", "Blueprints"],
    accentColor: "#7C3AED",
    imageAlt: "SpanStrike Unreal Engine Game Project",
    githubUrl: "https://github.com/DeepakNandhakumar",
    liveUrl: "#projects",
  },
  {
    id: "healthline-insights",
    title: "Healthline Insights",
    subtitle: "Holistic Wellness & Healthcare Information Platform",
    category: "Wellness Analytics",
    featured: false,
    year: "2024",
    description: "A project focused on promoting holistic wellness through comprehensive, verified health resources, wellness metrics, and intuitive interactive self-assessment tools.",
    tags: ["JavaScript", "HTML/CSS", "Healthcare UX", "Wellness Analytics", "Responsive Design"],
    accentColor: "#3B82F6",
    imageAlt: "Healthline Insights Platform",
    githubUrl: "https://github.com/DeepakNandhakumar",
    liveUrl: "#projects",
  },
  {
    id: "rent-electricity-calculator",
    title: "House Rent & Electricity Bill Calculator",
    subtitle: "Utility Cost & Rent Management System",
    category: "Utility & Automation",
    featured: false,
    year: "2023",
    description: "Collaborated on a team project to build a dedicated utility cost calculator that automates tiered electricity bill splits, shared house rent apportioning, and budget management.",
    tags: ["JavaScript", "HTML5", "CSS3", "Math Automation", "Collaborative Project"],
    accentColor: "#F59E0B",
    imageAlt: "Rent and Electricity Calculator",
    githubUrl: "https://github.com/DeepakNandhakumar",
    liveUrl: "#projects",
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "fullstack-dev",
    title: "Full-Stack Web Development",
    tagline: "End-to-end modern web applications",
    description: "Engineering responsive, performant full-stack web applications using React, JavaScript, Java, Spring Boot, and MySQL.",
    capabilities: [
      "React & Next.js Modern Interfaces",
      "Java & Spring Boot RESTful Backends",
      "MySQL Database Design & Query Optimization",
      "Responsive, Mobile-First UI/UX",
    ],
    icon: "Layers",
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    id: "healthtech-solutions",
    title: "Health-Tech & Intelligence Apps",
    tagline: "Purpose-built healthcare digital tools",
    description: "Creating specialized preventive health, fitness calculation, and wellness monitoring platforms like Wellspring and FitNHeal.",
    capabilities: [
      "Biometric & BMI Calculation Engines",
      "Symptom Checking & Diet Planning Logic",
      "User Telemetry & Health Record Storage",
      "Interactive Wellness Analytics",
    ],
    icon: "Sparkles",
    gradient: "from-cyan-600 to-blue-600",
  },
  {
    id: "backend-api-engineering",
    title: "Backend & REST API Engineering",
    tagline: "Reliable, high-throughput microservices",
    description: "Designing structured REST APIs with Spring Boot and Python for seamless frontend integration and secure database operations.",
    capabilities: [
      "RESTful Endpoint Architecture",
      "CRUD Operations & Transaction Safety",
      "JSON Serialization & Schema Validation",
      "Database Integration with MySQL & Postgres",
    ],
    icon: "Network",
    gradient: "from-purple-600 to-pink-600",
  },
  {
    id: "game-simulation",
    title: "Interactive Game Dev & Simulation",
    tagline: "Immersive 3D experiences",
    description: "Exploring real-time 3D graphics, physics simulations, and interactive gameplay loops using Unreal Engine and C/C++.",
    capabilities: [
      "Unreal Engine 3D Environment Design",
      "C++ & Blueprint Game Mechanics",
      "Physics & Collision Systems",
      "Real-time Visual FX & Lighting",
    ],
    icon: "Box",
    gradient: "from-emerald-600 to-teal-600",
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/deepak-n-27665428b",
    handle: "deepak-n-27665428b",
    icon: "Linkedin",
  },
  {
    platform: "GitHub",
    url: "https://github.com/DeepakNandhakumar",
    handle: "DeepakNandhakumar",
    icon: "Github",
  },
  {
    platform: "Email",
    url: "mailto:deepakdeepak01452@gmail.com",
    handle: "deepakdeepak01452@gmail.com",
    icon: "Mail",
  },
];

export const CERTIFICATIONS = {
  courses: ["LinkedIn Learning", "TCS iON", "Infosys Springboard", "Microsoft Azure"],
  problemSolving: ["HackerRank (5-Star Gold Badge)", "GeeksforGeeks", "LeetCode", "Naukri"],
  codingContests: ["TCS CodeVita", "CodeChef", "TATA Imagination Challenge (Round 2 Qualifier)"],
  masterclasses: ["30 Days Masterclass on Artificial Intelligence", "1M1B Green Internship"],
};

export const TERMINAL_COMMANDS: Record<string, string | string[]> = {
  help: [
    "Available commands:",
    "  whoami       - Display identity, role @ Owlsure, and location",
    "  skills       - Explore full technical stack (Java, React, Spring Boot, MySQL)",
    "  experience   - View current role at Owlsure & background",
    "  education    - View BCA Degree details & academic track record",
    "  achievements - View awards, Satya Nadella meeting, Code-Fiesta 1st prize",
    "  wellspring   - Inspect flagship Wellspring Health Intelligence Platform",
    "  projects     - List all showcased builds (Wellspring, FitNHeal, SpanStrike)",
    "  contact      - Get direct phone, email, and LinkedIn coordinates",
    "  clear        - Clear the terminal console",
    "  matrix       - Trigger cyber matrix particle mode",
  ],
  whoami: [
    "DEEPAK N (Deepak Nandakumar)",
    "Current Role: Software Engineer @ Owlsure",
    "Education: BCA Graduate (80%) | TERF's Academy College of Arts and Science",
    "Location: Tirupur, Tamil Nadu, India",
    "Core Focus: Full-Stack Web Development, React, Spring Boot, Java, MySQL, Health-Tech",
  ],
  skills: [
    "CORE TECHNICAL CAPABILITIES:",
    "• Languages:      Java, Python, C/C++, JavaScript, SQL/MySQL, HTML, CSS",
    "• Frontend:       React (MERN), Tailwind CSS, Next.js, Responsive UI",
    "• Backend:        Spring Boot, REST APIs, MERN Stack",
    "• Databases:      MySQL, PostgreSQL",
    "• Tools & Cloud:  Git, GitHub, Microsoft Azure, Unreal Engine",
    "• Problem Solving: HackerRank (5-Star Gold), LeetCode, GeeksforGeeks",
  ],
  experience: [
    "PROFESSIONAL EXPERIENCE:",
    "• Software Engineer @ Owlsure (2024 - Present)",
    "  - Building scalable full-stack web solutions and modern software products.",
    "  - Developing responsive frontends and resilient REST backend APIs.",
  ],
  education: [
    "ACADEMIC TRACK RECORD:",
    "• Bachelor of Computer Applications (BCA) - 80%",
    "  TERF's Academy College of Arts and Science (2023 — 2026)",
    "• HSC & SSLC - 71%",
    "  Annai Matric Hr Sec School (2021 — 2023)",
  ],
  achievements: [
    "NOTABLE ACHIEVEMENTS & HONORS:",
    "🏆 Attended Microsoft AI Tour and met Satya Nadella (2025)",
    "🥇 1st Place in Code-Fiesta Programming Event (2025)",
    "⭐ 5-Star Gold Badge in Problem Solving on HackerRank (2024)",
    "🏅 Best Performer of the Month (Technical) (2024)",
    "🚀 Advanced to Round 2 of Tata Imagination Challenge (2024, 2025)",
    "🥈 2nd Prize in Inter-College Programming Contest (2024)",
    "🎖️ 100% Attendance Award (Annual Day) (2024)",
    "🎯 Event Coordinator for ADZAP Event (2025)",
  ],
  wellspring: [
    "PROJECT SPOTLIGHT: WELLSPRING (2026)",
    "Type: Preventive Health Intelligence Platform",
    "Stack: React + Spring Boot + MySQL + REST APIs",
    "Features: Automated BMI tracking, symptom checker, and personalized diet planning.",
  ],
  projects: [
    "SHOWCASED WORK:",
    "1. Wellspring (2026) — Preventive Health Intelligence Platform (React + Spring Boot + MySQL)",
    "2. FitNHeal (2025) — All-in-One Health & Fitness Platform (HTML, CSS, JS)",
    "3. SpanStrike (2024) — 3D Game Project in Unreal Engine (C++)",
    "4. Healthline Insights (2024) — Holistic Wellness Platform",
    "5. House Rent & Electricity Bill Calculator (2023) — Utility Cost Management",
  ],
  contact: [
    "CONNECT WITH DEEPAK:",
    "• Phone:    +91 6382996124",
    "• Email:    deepakdeepak01452@gmail.com",
    "• LinkedIn: https://www.linkedin.com/in/deepak-n-27665428b",
    "• GitHub:   https://github.com/DeepakNandhakumar",
    "• Location: Tirupur, Tamil Nadu, India",
  ],
};
