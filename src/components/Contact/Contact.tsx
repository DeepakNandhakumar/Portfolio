import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  ArrowUpRight,
  Sparkles,
  Building,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/data/personal';
import { copyToClipboard } from '@/utils/helpers';
import { fadeInUp, staggerContainer } from '@/animations/transitions';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const handleCopyEmail = async () => {
    const ok = await copyToClipboard(PERSONAL_INFO.email);
    if (ok) {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    }
  };

  const handleCopyPhone = async () => {
    const ok = await copyToClipboard(PERSONAL_INFO.phone);
    if (ok) {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2200);
    }
  };

  return (
    <section id="contact" className="relative w-full py-20 sm:py-28 bg-white">
      <Container size="lg">
        {/* Section Heading */}
        <SectionHeading
          landmark="07 // DESTINATION"
          title="Let's Build Something"
          highlight="Meaningful."
          subtitle="Have an idea, project, or technical challenge? Let's build it together."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct Coordinates & Social Channels */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Direct Connect Card */}
            <GlassCard className="p-6 sm:p-8 border-indigo-100 bg-gradient-to-b from-white to-indigo-50/15">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Direct Contact Coordinates
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    Open for engineering collaborations
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Email Chip with Copy Action */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase">
                        Email Address
                      </div>
                      <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="text-xs sm:text-sm font-semibold text-slate-800 hover:text-indigo-600 transition-colors"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Phone Chip with Copy Action */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase">
                        Direct Phone
                      </div>
                      <a
                        href={`tel:${PERSONAL_INFO.phone}`}
                        className="text-xs sm:text-sm font-semibold text-slate-800 hover:text-cyan-600 transition-colors"
                      >
                        {PERSONAL_INFO.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                    aria-label="Copy phone number"
                  >
                    {copiedPhone ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Location Chip */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">
                      Location
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-800">
                      {PERSONAL_INFO.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Professional Profiles
                </div>
                <div className="flex flex-wrap gap-2">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-xs transition-all"
                    >
                      {s.platform === 'LinkedIn' && <LinkedinIcon className="w-3.5 h-3.5" />}
                      {s.platform === 'GitHub' && <GithubIcon className="w-3.5 h-3.5" />}
                      {s.platform === 'Email' && <Mail className="w-3.5 h-3.5" />}
                      <span>{s.platform}</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400" />
                    </a>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Right Column: Clean White Interactive Contact Form */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-7"
          >
            <GlassCard className="p-6 sm:p-9 border-slate-200/90 shadow-xl bg-white">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 font-normal">
                Fill out the details below and I will get back to you promptly.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">
                    Message Dispatched Successfully!
                  </h4>
                  <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                    Thank you, {formData.name}. Your note has reached Deepak N. I will respond to your message promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-4 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Send Another Note
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-slate-700 mb-1.5">
                        Your Name <span className="text-indigo-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-medium text-slate-700 mb-1.5">
                        Email Address <span className="text-indigo-600">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-700 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="Project collaboration / Engineering inquiry"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-700 mb-1.5">
                      Message <span className="text-indigo-600">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Share your goals, architectural requirements, or questions..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="glow"
                      size="lg"
                      className="w-full sm:w-auto"
                      rightIcon={<Send className="w-4 h-4" />}
                    >
                      Transmit Message
                    </Button>
                  </div>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
