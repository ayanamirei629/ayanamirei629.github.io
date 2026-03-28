import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';

const navKeys = ['about', 'education', 'experience', 'projects', 'activity', 'publications', 'skills', 'reading', 'contact'];
const sectionIds = ['news', 'education', 'experience', 'projects', 'activity', 'publications', 'skills', 'reading', 'contact'];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en');
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-950/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-white font-semibold text-lg tracking-wide hover:text-accent-400 transition-colors">
          YH
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5">
          {navKeys.map((key, i) => (
            <button
              key={key}
              onClick={() => scrollTo(sectionIds[i])}
              className="text-slate-400 text-sm hover:text-white transition-colors duration-200"
            >
              {t(`nav.${key}`)}
            </button>
          ))}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-accent-400 transition-colors duration-200 ml-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-accent-400/40"
          >
            <Globe size={14} />
            <span>{i18n.language === 'en' ? '中文' : 'EN'}</span>
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleLang}
            className="text-slate-400 hover:text-accent-400 transition-colors px-2 py-1 rounded-full border border-white/10 text-sm flex items-center gap-1"
          >
            <Globe size={14} />
            {i18n.language === 'en' ? '中文' : 'EN'}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-slate-300">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-950/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navKeys.map((key, i) => (
                <button
                  key={key}
                  onClick={() => scrollTo(sectionIds[i])}
                  className="text-slate-400 text-sm hover:text-white transition-colors text-left py-1"
                >
                  {t(`nav.${key}`)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
