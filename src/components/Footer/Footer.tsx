import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/data/personal';
import { scrollToSection } from '@/utils/helpers';

export const Footer: React.FC = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200/80 py-12 text-slate-600">
      <Container size="lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-200/80">
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                {PERSONAL_INFO.initials}
              </div>
              <span className="font-bold text-slate-900 text-base">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              {PERSONAL_INFO.degree} (80%) • {PERSONAL_INFO.location}
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-600">
            {['hero', 'about', 'skills', 'experience', 'projects', 'services', 'contact'].map(
              (sec) => (
                <a
                  key={sec}
                  href={`#${sec}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(`#${sec}`, 80);
                  }}
                  className="hover:text-indigo-600 transition-colors capitalize cursor-pointer"
                >
                  {sec === 'hero' ? 'Origin' : sec}
                </a>
              )
            )}
          </div>

          {/* Back to Top Button */}
          <div>
            <button
              onClick={handleBackToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:text-indigo-600 hover:border-indigo-200 shadow-2xs transition-all cursor-pointer"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-indigo-600" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Coordinates */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-indigo-600 transition-colors"
                aria-label={link.platform}
              >
                {link.platform}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};
