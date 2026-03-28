import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

export default function Personal() {
  const { t } = useTranslation();
  const items = t('personal.items', { returnObjects: true });

  return (
    <SectionWrapper id="personal" title={t('personal.title')} subtitle={t('personal.subtitle')}>
      <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex items-start gap-3 bg-dark-800/40 border border-white/5 rounded-xl p-4 hover:border-accent-400/15 transition-all duration-300"
          >
            <Sparkles size={16} className="text-accent-400 mt-0.5 shrink-0" />
            <p className="text-slate-400 text-sm leading-relaxed">{item}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
