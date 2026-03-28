import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

export default function Projects() {
  const { t } = useTranslation();
  const items = t('projects.items', { returnObjects: true });

  return (
    <SectionWrapper id="projects" title={t('projects.title')} subtitle={t('projects.subtitle')}>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="group relative bg-dark-800/50 border border-white/5 rounded-2xl p-6 hover:border-accent-400/20 transition-all duration-300 flex flex-col"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-400/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent-400/10 flex items-center justify-center">
                  <Code2 size={20} className="text-accent-400" />
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent-400/10 text-accent-400 border border-accent-400/20">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">{item.name}</h3>
              {item.tech && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tech.split(', ').map((tech) => (
                    <span key={tech} className="text-xs px-2 py-0.5 rounded bg-dark-700/80 text-slate-400 border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
