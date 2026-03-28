import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FileText, BookOpen } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

export default function Reading() {
  const { t } = useTranslation();
  const papers = t('papers.items', { returnObjects: true });
  const books = t('books.items', { returnObjects: true });

  return (
    <section id="reading" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Papers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{t('papers.title')}</h2>
          <p className="text-slate-500 text-lg">{t('papers.subtitle')}</p>
        </motion.div>

        <div className="max-w-3xl mx-auto mb-24 space-y-3">
          {papers.map((paper, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex items-center gap-3 bg-dark-800/30 border border-white/5 rounded-lg px-4 py-3 hover:border-accent-400/15 transition-all duration-300 group"
            >
              <FileText size={16} className="text-accent-400/60 group-hover:text-accent-400 transition-colors shrink-0" />
              <span className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">{paper}</span>
            </motion.div>
          ))}
        </div>

        {/* Books */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{t('books.title')}</h2>
          <p className="text-slate-500 text-lg">{t('books.subtitle')}</p>
        </motion.div>

        <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-4">
          {books.map((book, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-start gap-3 bg-dark-800/40 border border-white/5 rounded-xl p-4 hover:border-accent-400/15 transition-all duration-300"
            >
              <BookOpen size={16} className="text-accent-400/60 mt-0.5 shrink-0" />
              <div>
                <p className="text-slate-300 text-sm font-medium">{book.en}</p>
                <p className="text-slate-600 text-xs mt-0.5">{book.author}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
