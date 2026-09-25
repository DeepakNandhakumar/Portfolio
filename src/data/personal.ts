export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
  icon: string;
}

export const PERSONAL_INFO = {
  name: "Deepak N",
  fullName: "Deepak Nandhakumar",
  shortName: "Deepak",
  initials: "DN",
  currentRole: "Software Engineer & Full-Stack Developer",
  degree: "Bachelor of Computer Applications (BCA)",
  college: "TERF's Academy College of Arts and Science",
  titles: [
    "Software Engineer",
    "Full-Stack Developer",
    "React & Spring Boot Engineer",
    "HackerRank 5★ Problem Solver",
    "AI & Data Enthusiast",
    "Game Dev Explorer (Unreal Engine)",
  ],
  bio: "Motivated and quick-learning graduate with strong skills in programming and web development. Passionate about building real world applications and continuously enhancing technical knowledge.",
  detailedAbout: "I'm Deepak N, a passionate Software Engineer and BCA graduate (80% Merit) from TERF's Academy College of Arts and Science. I specialize in building responsive, scalable full-stack web applications with React, Spring Boot, MySQL, and modern JavaScript, as well as exploring AI systems and real-time game development in Unreal Engine. Driven by competitive problem solving (5-Star Gold Badge on HackerRank) and practical innovation.",
  location: "Tirupur, Tamilnadu, India",
  phone: "+91 6382996124",
  email: "deepakdeepak01452@gmail.com",
  linkedInUrl: "https://www.linkedin.com/in/deepak-n-27665428b",
  gitHubUrl: "https://github.com/DeepakNandhakumar",
  resumePath: "/Deepak_N_Resume.pdf",
  status: "Open for High-Impact Software Engineering Roles",
  availableForHire: true,
  yearsOfExperience: "2+",
  terminalWhoami: {
    user: "Deepak N",
    role: "Software Engineer & BCA Graduate",
    degree: "BCA (80%) — TERF's Academy",
    skills: "React, Spring Boot, Java, Python, MySQL, C++",
    honors: "HackerRank 5★ | Met Satya Nadella | Code-Fiesta 1st Prize",
    location: "Tirupur, Tamilnadu",
    status: "Ready to Ship High-Performance Code 🚀",
  },
};

export const SITE_CONFIG = {
  domain: "https://deepaknandhakumar.dev",
  title: "Deepak N | Software Engineer — Premium Interactive Portfolio",
  description: "Official interactive 3D portfolio of Deepak N — Software Engineer, Full-Stack Developer, and Problem Solver from Tirupur, Tamilnadu.",
  keywords: [
    "Deepak N",
    "Deepak Nandhakumar",
    "Software Engineer",
    "BCA Graduate",
    "TERF's Academy College",
    "React Developer",
    "Spring Boot",
    "HackerRank 5 Star",
    "Wellspring",
    "FitNHeal",
    "SpanStrike",
  ],
  author: "Deepak N",
  twitterHandle: "@DeepakNandhakumar",
};

export const STATISTICS: StatItem[] = [
  {
    id: "academics",
    value: 80,
    suffix: "%",
    label: "BCA Academic Score",
    sublabel: "TERF's Academy College",
  },
  {
    id: "hackerrank",
    value: 5,
    suffix: "★",
    label: "HackerRank Gold Badge",
    sublabel: "Problem Solving & Logic",
  },
  {
    id: "projects",
    value: 5,
    suffix: "+",
    label: "Core Shipped Projects",
    sublabel: "HealthTech, GameDev & Web",
  },
  {
    id: "honors",
    value: 8,
    suffix: "+",
    label: "Honors & Contests",
    sublabel: "1st in Code-Fiesta & TATA Round 2",
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
  {
    platform: "Phone",
    url: "tel:+916382996124",
    handle: "+91 6382996124",
    icon: "Phone",
  },
];

