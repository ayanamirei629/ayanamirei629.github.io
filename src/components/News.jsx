import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';

export default function News() {
  const { t } = useTranslation();
  const items = t('news.items', { returnObjects: true });

  return (
    <SectionWrapper id="news" title={t('news.title')} subtitle={t('news.subtitle')}>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-400/30 via-accent-400/10 to-transparent" />

        <div className="space-y-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`relative flex flex-col md:flex-row items-start gap-4 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 w-2.5 h-2.5 bg-accent-400 rounded-full -translate-x-1/2 mt-2 shadow-lg shadow-accent-400/30 z-10" />

              {/* Content card */}
              <div className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                <div className="bg-dark-800/50 border border-white/5 rounded-xl p-5 hover:border-accent-400/20 transition-all duration-300 group">
                  <span className="text-accent-400 text-xs font-medium tracking-wider uppercase">{item.date}</span>
                  <p className="text-slate-300 text-sm mt-2 leading-relaxed">{item.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
