"use client";

import React, { useState } from "react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import {
  Mail,
  Send,
  Check,
  Copy,
  Sparkles,
  MessageSquare,
  User,
  AtSign,
  FileText,
  Phone,
  MapPin,
} from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate instantaneous smooth dispatch feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 900);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <SectionHeading
        landmark="06 // DESTINATION"
        badge="GET IN TOUCH"
        title="Let's Build Something Meaningful."
        subtitle="Have a breakthrough project, engineering challenge, or full-time opportunity? Let's connect and make it real."
        accentGradient="cyan-blue"
      />

      {/* Main Grid: Left Direct Coordinates, Right Accessible Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Coordinates & Social Connect */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard glowColor="cyan" padding="lg">
            <h3 className="text-xl font-bold text-white mb-2">Direct Transmission</h3>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed font-normal">
              Whether you&apos;re looking to architect intelligent AI systems, modernize legacy enterprise codebases, or build scalable full-stack web applications — my inbox is always open.
            </p>

            {/* Email Copy Card */}
            <div className="p-4 rounded-xl bg-[#050816] border border-white/[0.08] mb-6 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-[10px] font-mono text-slate-400">PRIMARY EMAIL</span>
                  <span className="text-xs sm:text-sm font-mono text-white truncate font-medium">
                    {PERSONAL_INFO.email}
                  </span>
                </div>
              </div>

              <button
                onClick={copyToClipboard}
                className="p-2 rounded-lg bg-white/[0.05] hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 transition-colors flex-shrink-0"
                aria-label="Copy email address"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Phone & Direct Coordinates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 rounded-xl bg-[#050816] border border-white/[0.08] flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-[10px] font-mono text-slate-400">PHONE / WHATSAPP</span>
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="text-xs font-mono text-white hover:text-cyan-300 font-medium truncate">
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#050816] border border-white/[0.08] flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-[10px] font-mono text-slate-400">LOCATION</span>
                  <span className="text-xs font-mono text-white truncate font-medium">
                    {PERSONAL_INFO.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Availability Status Indicator */}
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>{PERSONAL_INFO.status}</span>
            </div>
          </GlassCard>

          {/* Social Links Cards */}
          <div className="grid grid-cols-2 gap-4">
            <GlassCard
              glowColor="indigo"
              padding="md"
              interactive
              onClick={() => window.open(SOCIAL_LINKS[0].url, "_blank")}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">LinkedIn</div>
                  <div className="text-[10px] font-mono text-slate-400">Professional Network</div>
                </div>
              </div>
            </GlassCard>

            <GlassCard
              glowColor="purple"
              padding="md"
              interactive
              onClick={() => window.open(SOCIAL_LINKS[1].url, "_blank")}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-600/20 text-purple-400">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">GitHub</div>
                  <div className="text-[10px] font-mono text-slate-400">Open Source Repos</div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Right Column: Accessible Interactive Form */}
        <div className="lg:col-span-7">
          <GlassCard glowColor="indigo" padding="lg">
            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-white">Message Transmitted!</h4>
                <p className="text-sm text-slate-300 max-w-md">
                  Thank you for reaching out, {formData.name || "friend"}. I will review your message and get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-mono text-slate-300 hover:text-white"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono text-slate-300 font-medium"
                    >
                      YOUR NAME *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#050816]/90 border border-white/[0.1] text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono text-slate-300 font-medium"
                    >
                      YOUR EMAIL *
                    </label>
                    <div className="relative">
                      <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#050816]/90 border border-white/[0.1] text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono text-slate-300 font-medium"
                  >
                    SUBJECT / PROJECT TYPE
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. AI Agent Development / Full-Stack Architecture / Opportunity"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#050816]/90 border border-white/[0.1] text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono text-slate-300 font-medium"
                  >
                    YOUR MESSAGE *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your goals, timelines, or questions..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#050816]/90 border border-white/[0.1] text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans resize-none"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(79,70,229,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] border border-indigo-400/30 btn-sweep transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                        <span>Transmitting Signal...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
