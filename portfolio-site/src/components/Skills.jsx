import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Cpu, Cloud, Database, BrainCircuit, Code, Layers } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

const icons = [Code, Cloud, Layers, Database, BrainCircuit, Cpu];

export default function Skills() {
  const { t } = useTranslation();
  const categories = t('skills.categories', { returnObjects: true });

  return (
    <SectionWrapper id="skills" title={t('skills.title')} subtitle={t('skills.subtitle')}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {categories.map((cat, i) => {
          const Icon = icons[i] || Code;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              className="group bg-dark-800/50 border border-white/5 rounded-xl p-5 hover:border-accent-400/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-accent-400/10 flex items-center justify-center">
                  <Icon size={16} className="text-accent-400" />
                </div>
                <h3 className="text-white font-medium text-sm">{cat.name}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.split(', ').map((item) => (
                  <span key={item} className="text-xs px-2.5 py-1 rounded-full bg-dark-700/80 text-slate-400 border border-white/5">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
