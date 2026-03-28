import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

export default function Experience() {
  const { t } = useTranslation();
  const items = t('experience.items', { returnObjects: true });

  return (
    <SectionWrapper id="experience" title={t('experience.title')} subtitle={t('experience.subtitle')}>
      <div className="max-w-3xl mx-auto space-y-6">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative bg-dark-800/50 border border-white/5 rounded-2xl p-6 hover:border-accent-400/20 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-start gap-4 mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent-400/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Briefcase size={18} className="text-accent-400" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="text-white font-semibold">{item.org}</h3>
                    <span className="text-slate-600 text-xs">{item.period}</span>
                  </div>
                  <p className="text-accent-400/80 text-sm font-medium">{item.role}</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed ml-14">{item.desc}</p>
              {item.bullets && item.bullets.length > 0 && (
                <ul className="mt-3 ml-14 space-y-2">
                  {item.bullets.map((bullet, j) => (
                    <li key={j} className="text-slate-400 text-sm leading-relaxed flex gap-2">
                      <span className="text-accent-400/60 mt-1.5 shrink-0 w-1 h-1 rounded-full bg-accent-400/60" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
