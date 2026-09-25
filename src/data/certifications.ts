export interface CertificationCategory {
  category: string;
  items: {
    name: string;
    description: string;
    badge?: string;
    icon: string;
  }[];
}

export const CERTIFICATIONS_DATA: CertificationCategory[] = [
  {
    category: "Courses & Professional Certifications",
    items: [
      {
        name: "LinkedIn Learning",
        description: "Professional software engineering, full-stack architecture, and clean code practices.",
        badge: "Verified",
        icon: "BookOpen",
      },
      {
        name: "TCS iON",
        description: "Industry readiness, corporate IT workflows, and agile programming methodologies.",
        badge: "Certified",
        icon: "Award",
      },
      {
        name: "Infosys Springboard",
        description: "Advanced Java backend paradigms, algorithmic problem solving, and modern web systems.",
        badge: "Certified",
        icon: "ShieldCheck",
      },
      {
        name: "Microsoft Azure",
        description: "Cloud fundamentals, virtualization, resource scalability, and serverless architectures.",
        badge: "Cloud Certified",
        icon: "Cloud",
      },
    ],
  },
  {
    category: "Problem Solving & Competitive Coding",
    items: [
      {
        name: "HackerRank (5-Star Gold Badge)",
        description: "Top-tier problem solving, data structures, and algorithm optimization badge.",
        badge: "5-Star Gold",
        icon: "Star",
      },
      {
        name: "LeetCode",
        description: "Consistent practice in algorithmic complexity, dynamic programming, and graphs.",
        badge: "Active Solver",
        icon: "Code2",
      },
      {
        name: "GeeksforGeeks",
        description: "Mastery in core CS fundamentals, system programming, and data structures.",
        badge: "Contributor",
        icon: "Terminal",
      },
      {
        name: "Naukri Campus",
        description: "Technical assessment benchmarks and verified problem-solving tests.",
        badge: "Verified",
        icon: "CheckCircle",
      },
    ],
  },
  {
    category: "Coding Contests & Hackathons",
    items: [
      {
        name: "TATA Imagination Challenge (2024, 2025)",
        description: "Advanced to Round 2 nationally across two consecutive years for innovative tech concepts.",
        badge: "Round 2 Finalist",
        icon: "Flame",
      },
      {
        name: "TCS CodeVita",
        description: "Global competitive programming contest testing high-speed algorithm design.",
        badge: "Contestant",
        icon: "Zap",
      },
      {
        name: "CodeChef",
        description: "Competitive algorithmic programming and division-level ranked contests.",
        badge: "Ranked",
        icon: "Trophy",
      },
      {
        name: "Code-Fiesta Championship (2025)",
        description: "Secured 1st Place overall in timed inter-college coding tournament.",
        badge: "1st Place Winner",
        icon: "Medal",
      },
    ],
  },
  {
    category: "Webinars & Masterclasses",
    items: [
      {
        name: "30 Days Masterclass on Artificial Intelligence",
        description: "Comprehensive deep-dive into AI foundations, machine learning pipelines, and LLM applications.",
        badge: "Masterclass",
        icon: "Sparkles",
      },
      {
        name: "1M1B Green Internship",
        description: "Global sustainability innovation and technology-driven eco initiatives.",
        badge: "Green Intern",
        icon: "Globe",
      },
    ],
  },
];
