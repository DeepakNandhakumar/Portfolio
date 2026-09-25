export interface AchievementItem {
  id: string;
  title: string;
  year: string;
  category: "AI & Tech" | "Competition" | "Recognition" | "Leadership";
  description: string;
  iconName: string;
  badge: string;
}

export const ACHIEVEMENTS_LIST: AchievementItem[] = [
  {
    id: "satya-nadella",
    title: "Attended Microsoft AI Tour & Met Satya Nadella",
    year: "2025",
    category: "AI & Tech",
    description: "Participated in the premier Microsoft AI Tour conference and had the honor of meeting Microsoft Chairman and CEO Satya Nadella.",
    iconName: "Sparkles",
    badge: "Keynote & Networking",
  },
  {
    id: "code-fiesta",
    title: "Secured 1st Place in Code-Fiesta Event",
    year: "2025",
    category: "Competition",
    description: "Won first prize in the competitive algorithmic programming Code-Fiesta championship.",
    iconName: "Trophy",
    badge: "1st Prize Champion",
  },
  {
    id: "hackerrank-gold",
    title: "Earned 5-Star Gold Badge on HackerRank",
    year: "2024",
    category: "Recognition",
    description: "Achieved the top-tier 5-star gold rank in problem solving and data structures on HackerRank.",
    iconName: "Award",
    badge: "5-Star Gold Rank",
  },
  {
    id: "adzap-coordinator",
    title: "Event Coordinator for ADZAP Event",
    year: "2025",
    category: "Leadership",
    description: "Spearheaded and organized the regional ADZAP creative marketing and technology event.",
    iconName: "Users",
    badge: "Event Leadership",
  },
  {
    id: "best-performer",
    title: "Best Performer of the Month (Technical)",
    year: "2024",
    category: "Recognition",
    description: "Awarded top technical performer for engineering excellence, rapid feature delivery, and problem solving.",
    iconName: "Medal",
    badge: "Technical Excellence",
  },
  {
    id: "tata-imagination",
    title: "Advanced to Round 2 of Tata Imagination Challenge",
    year: "2024 & 2025",
    category: "Competition",
    description: "Successfully qualified for the national second round of the prestigious Tata Imagination Challenge across consecutive years.",
    iconName: "Flame",
    badge: "National Round 2",
  },
  {
    id: "inter-college-2nd",
    title: "Secured 2nd Prize in Inter-College Programming Contest",
    year: "2024",
    category: "Competition",
    description: "Won second prize competing against multiple regional engineering and arts institutions in timed coding challenges.",
    iconName: "Code2",
    badge: "2nd Prize",
  },
  {
    id: "attendance-award",
    title: "Received 100% Attendance Award",
    year: "2024",
    category: "Recognition",
    description: "Honored with the 100% Attendance Award during the Annual Day celebration for steadfast discipline and commitment.",
    iconName: "CheckCircle2",
    badge: "100% Dedication",
  },
];
