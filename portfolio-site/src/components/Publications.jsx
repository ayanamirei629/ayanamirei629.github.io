import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FileDown, ScrollText } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

export default function Research() {
  const { t } = useTranslation();
  const items = t('publications.items', { returnObjects: true });
  const base = import.meta.env.BASE_URL;

  return (
    <SectionWrapper id="publications" title={t('publications.title')} subtitle={t('publications.subtitle')}>
      <div className="max-w-3xl mx-auto space-y-5">
        {items.map((item, i) => (
          <motion.a
            key={i}
            href={`${base}files/${item.file}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -3 }}
            className="group flex items-start gap-4 bg-dark-800/50 border border-white/5 rounded-2xl p-6 hover:border-accent-400/20 transition-all duration-300 block"
          >
            <div className="w-12 h-12 rounded-xl bg-accent-400/10 flex items-center justify-center shrink-0">
              <ScrollText size={22} className="text-accent-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold mb-1 group-hover:text-accent-400 transition-colors">{item.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-2">{item.desc}</p>
              <span className="inline-flex items-center gap-1.5 text-accent-400/70 text-xs group-hover:text-accent-400 transition-colors">
                <FileDown size={13} />
                {item.file}
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </SectionWrapper>
  );
}
