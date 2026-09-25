export interface MilestoneStop {
  id: string;
  roadDistance: number; // visual road progression position
  role: string;
  organization: string;
  period: string;
  location: string;
  type: "Full-Time" | "Education" | "Milestone";
  summary: string;
  responsibilities: string[];
  technologies: string[];
  highlightMetric?: string;
  badge: string;
  color: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  score: string;
  details: string;
  highlights: string[];
}

export const EXPERIENCES: MilestoneStop[] = [
  {
    id: "software-engineer-journey",
    roadDistance: 0.85,
    role: "Full-Stack Software Engineer",
    organization: "Independent Engineering & Full-Stack Projects",
    period: "2024 — Present",
    location: "Tirupur, Tamilnadu",
    type: "Milestone",
    summary: "Architecting and deploying real-world web applications, health intelligence platforms, and game simulations using React, Spring Boot, Java, MySQL, Python, and Unreal Engine.",
    responsibilities: [
      "Engineered 'Wellspring', a full-stack preventive healthcare intelligence platform with React, Spring Boot, and MySQL.",
      "Developed interactive fitness & wellness solutions including FitNHeal and Healthline Insights.",
      "Built 'SpanStrike', a 3D game simulation exploring real-time physics and character mechanics in Unreal Engine.",
      "Active competitor across HackerRank (5-Star Gold Badge), LeetCode, CodeChef, and TATA Imagination Challenge.",
    ],
    technologies: ["React", "Spring Boot", "Java", "Python", "MySQL", "JavaScript", "Unreal Engine", "C++"],
    highlightMetric: "5 Core Projects Shipped",
    badge: "Current Milestone",
    color: "#4F46E5",
  },
  {
    id: "bca-terfs",
    roadDistance: 0.5,
    role: "Bachelor of Computer Applications (BCA)",
    organization: "TERF’s Academy College of Arts and Science",
    period: "2023 — 2026",
    location: "Tirupur, Tamilnadu",
    type: "Education",
    summary: "Graduated with 80% aggregate academic merit, mastering Object-Oriented Programming (Java & C++), Relational Databases (MySQL), Web Development, and Algorithm Design.",
    responsibilities: [
      "Maintained 80% academic merit across all academic semesters.",
      "Served as Event Coordinator for the prestigious ADZAP creative marketing and tech event (2025).",
      "Won 1st prize in the inter-college Code-Fiesta programming competition (2025).",
      "Awarded 100% Attendance Award during Annual Day celebration (2024).",
      "Recognized as Best Performer of the Month (Technical) (2024).",
    ],
    technologies: ["Java", "C / C++", "MySQL", "Data Structures", "HTML / CSS", "JavaScript"],
    highlightMetric: "80% Merit Score",
    badge: "BCA Degree (80%)",
    color: "#06B6D4",
  },
  {
    id: "school-annai",
    roadDistance: 0.15,
    role: "HSC & SSLC (Computer Science & Maths)",
    organization: "Annai Matric Hr Sec School",
    period: "2021 — 2023",
    location: "Tamilnadu, India",
    type: "Education",
    summary: "Completed Higher Secondary Certificate (HSC) & SSLC with 71%, establishing a rigorous foundation in mathematics, analytical logic, and computing.",
    responsibilities: [
      "Focused heavily on Computer Science, Mathematics, and Algorithmic Logic.",
      "Participated in school technical symposiums and science exhibitions.",
    ],
    technologies: ["Computer Science", "Mathematics", "Logic & Problem Solving"],
    highlightMetric: "71% Score",
    badge: "Schooling (71%)",
    color: "#7C3AED",
  },
];

export const EDUCATION_LIST: EducationItem[] = [
  {
    id: "bca",
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "TERF’s Academy College of Arts and Science",
    period: "2023 — 2026",
    score: "80%",
    details: "Specialized in Core Programming (Java, C++), Database Management Systems (MySQL), Web Architecture, and Full-Stack Engineering.",
    highlights: [
      "80% Aggregate Academic Score",
      "1st Place in Code-Fiesta (2025)",
      "Event Coordinator for ADZAP (2025)",
      "100% Attendance Award (2024)",
      "Best Performer of the Month (Technical - 2024)",
    ],
  },
  {
    id: "hsc",
    degree: "Higher Secondary Certificate (HSC) & SSLC",
    institution: "Annai Matric Hr Sec School",
    period: "2021 — 2023",
    score: "71%",
    details: "Rigorous academic training in Computer Science, Analytical Mathematics, and Logical Computing.",
    highlights: [
      "71% Academic Score",
      "Strong Mathematical & Algorithmic Foundation",
    ],
  },
];

