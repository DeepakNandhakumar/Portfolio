import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  Printer,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Award,
  GraduationCap,
  Briefcase,
  Code2,
  Sparkles,
  CheckCircle2,
  Star,
  Copy,
  Check,
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/ui/Icons';
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/data/personal';
import { ACHIEVEMENTS_LIST } from '@/data/achievements';
import { CERTIFICATIONS_DATA } from '@/data/certifications';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    const summaryText = `DEEPAK N - BCA Graduate & Software Engineer
Email: ${PERSONAL_INFO.email} | Phone: ${PERSONAL_INFO.phone} | Location: ${PERSONAL_INFO.location}
LinkedIn: ${PERSONAL_INFO.linkedInUrl} | GitHub: ${PERSONAL_INFO.gitHubUrl}
Education: BCA (80%) - TERF's Academy College | HSC & SSLC (71%) - Annai Matric
Top Skills: React, Spring Boot, MySQL, Java, Python, C/C++, HTML/CSS, JavaScript
Honors: 5-Star Gold Badge on HackerRank | Met Satya Nadella (Microsoft AI Tour 2025) | 1st in Code-Fiesta`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-md">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
          className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-10 my-auto"
        >
          {/* Top Control Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80 backdrop-blur-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Deepak N — Official Curriculum Vitae
                </h3>
                <p className="text-[11px] text-slate-500 font-mono">
                  Verified Resume • TERF's Academy College (80%)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 text-xs font-medium text-slate-700 hover:text-indigo-600 transition-all shadow-xs cursor-pointer"
                title="Copy Resume Summary"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 text-xs font-medium text-slate-700 hover:text-indigo-600 transition-all shadow-xs cursor-pointer"
                title="Print Resume"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              <a
                href={PERSONAL_INFO.resumePath}
                download="Deepak_N_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white transition-all shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>

              <button
                onClick={onClose}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer ml-1"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Container */}
          <div
            id="printable-resume"
            className="flex-1 overflow-y-auto p-6 sm:p-10 text-slate-800 space-y-8 bg-white"
          >
            {/* Resume Header */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-slate-200 items-center">
              {/* Left: Avatar & Contact Details */}
              <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-100 shadow-md mb-3 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-3xl">
                  {/* Stylized Avatar Initials & Visual */}
                  <span>DN</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600 font-sans">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Phone className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>{PERSONAL_INFO.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Mail className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span className="font-mono">{PERSONAL_INFO.email}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>{PERSONAL_INFO.location}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <LinkedinIcon className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <a
                      href={PERSONAL_INFO.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline break-all"
                    >
                      linkedin.com/in/deepak-n-27665428b
                    </a>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <GithubIcon className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <a
                      href={PERSONAL_INFO.gitHubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      github.com/DeepakNandhakumar
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: Name, Title & About Me */}
              <div className="md:col-span-8 space-y-3 text-center md:text-left">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    DEEPAK N
                  </h1>
                  <p className="text-sm sm:text-base font-bold text-indigo-600 uppercase tracking-wider mt-0.5">
                    BCA STUDENT • SOFTWARE ENGINEER • FULL-STACK DEVELOPER
                  </p>
                </div>

                <div className="pt-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    ABOUT ME
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {PERSONAL_INFO.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Two Column Content: Left (Education & Skills) / Right (Projects & Achievements) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Column: Education, Skills, Certifications */}
              <div className="md:col-span-5 space-y-6">
                {/* Education */}
                <div>
                  <h3 className="text-xs font-extrabold text-indigo-600 tracking-wider uppercase flex items-center gap-1.5 pb-2 border-b border-indigo-100">
                    <GraduationCap className="w-4 h-4" />
                    EDUCATION
                  </h3>
                  <div className="mt-3 space-y-3 text-xs">
                    <div>
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>Bachelor of Computer Applications</span>
                        <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-mono">
                          80%
                        </span>
                      </div>
                      <div className="text-slate-600 font-medium">
                        TERF's Academy College of Arts and Science
                      </div>
                      <div className="text-slate-400 font-mono text-[11px]">
                        2023 — 2026
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>HSC & SSLC</span>
                        <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-mono">
                          71%
                        </span>
                      </div>
                      <div className="text-slate-600 font-medium">
                        Annai Matric Hr Sec School
                      </div>
                      <div className="text-slate-400 font-mono text-[11px]">
                        2021 — 2023
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Skills */}
                <div>
                  <h3 className="text-xs font-extrabold text-indigo-600 tracking-wider uppercase flex items-center gap-1.5 pb-2 border-b border-indigo-100">
                    <Code2 className="w-4 h-4" />
                    SKILLS
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-medium">
                    {[
                      'C / C++',
                      'Java',
                      'Python',
                      'MySQL',
                      'HTML, CSS',
                      'JavaScript',
                      'React (MERN)',
                      'Spring Boot',
                      'Unreal Engine',
                      'REST APIs',
                      'Data Structures',
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200/80 font-mono"
                      >
                        • {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications & Platforms */}
                <div>
                  <h3 className="text-xs font-extrabold text-indigo-600 tracking-wider uppercase flex items-center gap-1.5 pb-2 border-b border-indigo-100">
                    <Award className="w-4 h-4" />
                    CERTIFICATIONS & LEARNING
                  </h3>
                  <div className="mt-3 space-y-2.5 text-xs">
                    <div>
                      <span className="font-bold text-slate-800 block">
                        Courses:
                      </span>
                      <span className="text-slate-600">
                        LinkedIn Learning, TCS iON, Infosys Springboard, Microsoft Azure.
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">
                        Problem Solving:
                      </span>
                      <span className="text-slate-600">
                        HackerRank (5★ Gold Badge), GeeksforGeeks, LeetCode, Naukri.
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">
                        Coding Contest:
                      </span>
                      <span className="text-slate-600">
                        TCS CodeVita, CodeChef, TATA Imagination Challenge (Round 2).
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">
                        Webinar & Internships:
                      </span>
                      <span className="text-slate-600">
                        30 Days Masterclass on Artificial Intelligence, 1M1B Green Internship.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Projects & Achievements */}
              <div className="md:col-span-7 space-y-6">
                {/* Projects */}
                <div>
                  <h3 className="text-xs font-extrabold text-indigo-600 tracking-wider uppercase flex items-center gap-1.5 pb-2 border-b border-indigo-100">
                    <Briefcase className="w-4 h-4" />
                    PROJECTS
                  </h3>
                  <div className="mt-3 space-y-3.5 text-xs">
                    {/* Wellspring */}
                    <div className="p-3 rounded-xl bg-cyan-50/40 border border-cyan-100">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-sm">
                          Wellspring
                        </h4>
                        <span className="font-mono text-cyan-700 bg-cyan-100/60 px-2 py-0.5 rounded text-[11px] font-semibold">
                          2026
                        </span>
                      </div>
                      <p className="text-slate-700 mt-1 leading-relaxed">
                        <strong className="text-slate-800">Preventive Health Intelligence Platform:</strong> Built a full-stack health app using React, Spring Boot, and MySQL with features like BMI, symptom checker, and diet planning.
                      </p>
                    </div>

                    {/* FitNHeal */}
                    <div className="p-3 rounded-xl bg-emerald-50/40 border border-emerald-100">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-sm">
                          FitNHeal
                        </h4>
                        <span className="font-mono text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded text-[11px] font-semibold">
                          2025
                        </span>
                      </div>
                      <p className="text-slate-700 mt-1 leading-relaxed">
                        Your All-in-One Health & Fitness Platform using HTML, CSS, and JavaScript with interactive workout tracking and logs.
                      </p>
                    </div>

                    {/* SpanStrike */}
                    <div className="p-3 rounded-xl bg-purple-50/40 border border-purple-100">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-sm">
                          SpanStrike
                        </h4>
                        <span className="font-mono text-purple-700 bg-purple-100/60 px-2 py-0.5 rounded text-[11px] font-semibold">
                          2024
                        </span>
                      </div>
                      <p className="text-slate-700 mt-1 leading-relaxed">
                        My Passion Project in Game Development using Unreal Engine, C++, and Blueprints featuring dynamic physics and character controls.
                      </p>
                    </div>

                    {/* Healthline Insights */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900">
                          Healthline Insights
                        </h4>
                        <span className="font-mono text-slate-500 text-[11px]">
                          2024
                        </span>
                      </div>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">
                        A project focused on promoting holistic wellness through comprehensive health information and user-friendly tools.
                      </p>
                    </div>

                    {/* House Rent Calculator */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900">
                          House Rent & Electricity Bill Calculator
                        </h4>
                        <span className="font-mono text-slate-500 text-[11px]">
                          2023
                        </span>
                      </div>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">
                        Collaborated on a group project to develop a utility cost calculator for electricity bills and house rent management.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-xs font-extrabold text-indigo-600 tracking-wider uppercase flex items-center gap-1.5 pb-2 border-b border-indigo-100">
                    <Sparkles className="w-4 h-4" />
                    ACHIEVEMENTS
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-xs text-slate-700 list-disc list-inside">
                    {ACHIEVEMENTS_LIST.map((item) => (
                      <li key={item.id} className="leading-relaxed">
                        <strong className="text-slate-900">{item.title}</strong> —{' '}
                        <span className="text-slate-500 font-mono text-[11px]">
                          {item.year}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer Actions */}
          <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Verified Candidate: Deepak N (TERF's Academy)</span>
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline flex items-center gap-1"
              >
                LinkedIn <ExternalLink className="w-3 h-3" />
              </a>
              <span>•</span>
              <a
                href={PERSONAL_INFO.gitHubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline flex items-center gap-1"
              >
                GitHub <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
