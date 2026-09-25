import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles, Download, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/personal';
import { scrollToSection } from '@/utils/helpers';

interface NavLinkItem {
  id: string;
  label: string;
  href: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  onOpenResume?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Determine active section
      const sections = NAV_LINKS.map((link) => link.id);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    scrollToSection(href, 80);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Floating Pill Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 py-3 sm:py-4 transition-all duration-300">
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`flex items-center justify-between w-full max-w-5xl rounded-full transition-all duration-300 ${
            isScrolled
              ? 'bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.06)] px-4 sm:px-6 py-2 sm:py-2.5'
              : 'bg-white/70 backdrop-blur-lg border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] px-5 sm:px-7 py-3'
          }`}
        >
          {/* Logo / Brand */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-sm group-hover:scale-105 transition-transform">
              {PERSONAL_INFO.initials}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-900 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[10px] text-slate-500 font-mono tracking-wide">
                {PERSONAL_INFO.degree} (80%)
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-indigo-600 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Quick Action Buttons (Resume / Contact) */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 transition-all cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-indigo-600" />
              <span>Resume</span>
            </button>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-500/25 transition-all active:scale-95 cursor-pointer"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-slate-100 text-slate-700 hover:text-slate-900 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-30 md:hidden bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-3xl p-6 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume?.();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-semibold cursor-pointer"
                >
                  <Download className="w-4 h-4 text-indigo-600" />
                  <span>View & Download Resume</span>
                </button>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-indigo-600 text-white text-sm font-medium shadow-md shadow-indigo-500/20"
                >
                  <Mail className="w-4 h-4" />
                  <span>Let's Connect</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
