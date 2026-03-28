import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, MessageCircle, Instagram, ChevronDown, FileDown } from 'lucide-react';

const socials = [
  { icon: Github, href: 'https://github.com/ayanamirei629', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/yinggehu/', label: 'LinkedIn' },
  { icon: MessageCircle, href: 'https://wa.me/16478601462', label: 'WhatsApp' },
  { icon: Instagram, href: 'https://instagram.com/craighooo', label: 'Instagram' },
  { icon: Mail, href: 'mailto:yhu893@uwo.ca', label: 'Email' },
];

export default function Hero() {
  const { t } = useTranslation();
  const base = import.meta.env.BASE_URL;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto mb-6 w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-accent-400/30 shadow-lg shadow-accent-500/20"
          >
            <img
              src={`${base}avatar.png`}
              alt="Yingge Hu"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-5 px-4 py-1.5 rounded-full border border-accent-400/20 bg-accent-400/5"
          >
            <span className="text-accent-400 text-sm font-medium">{t('hero.title')}</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {t('hero.name')}
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            {t('hero.summary')}
          </p>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 mb-10"
          >
            <span className="flex items-center gap-1.5"><Mail size={14} />{t('hero.email1')}</span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="flex items-center gap-1.5"><Mail size={14} />{t('hero.email2')}</span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="flex items-center gap-1.5"><Phone size={14} />{t('hero.phone')}</span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="flex items-center gap-1.5"><MapPin size={14} />{t('hero.location')}</span>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center gap-4 mb-12"
          >
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-accent-400 hover:border-accent-400/40 hover:bg-accent-400/5 transition-all duration-300"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2.5 bg-accent-500 hover:bg-accent-600 text-white rounded-lg text-sm font-medium transition-colors duration-200 shadow-lg shadow-accent-500/20"
            >
              {t('hero.viewWork')}
            </button>
            <a
              href={`${base}files/Resume_YH.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 border border-accent-400/30 hover:border-accent-400/60 text-accent-400 hover:text-white hover:bg-accent-500/10 rounded-lg text-sm font-medium transition-all duration-200 inline-flex items-center gap-2"
            >
              <FileDown size={16} />
              {t('hero.resume')}
            </a>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2.5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white rounded-lg text-sm font-medium transition-all duration-200"
            >
              {t('hero.contactMe')}
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={24} className="text-slate-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
