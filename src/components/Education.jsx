import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

export default function Education() {
  const { t } = useTranslation();
  const schools = t('education.schools', { returnObjects: true });

  return (
    <SectionWrapper id="education" title={t('education.title')} subtitle={t('education.subtitle')}>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {schools.map((school, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative bg-dark-800/50 border border-white/5 rounded-2xl p-6 hover:border-accent-400/20 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent-400/10 flex items-center justify-center shrink-0">
                  <GraduationCap size={20} className="text-accent-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{school.name}</h3>
                  <p className="text-slate-500 text-sm">{school.location} &middot; {school.period}</p>
                </div>
              </div>
              <p className="text-accent-400/80 text-sm font-medium mb-2">{school.degree}</p>
              {school.gpa && <p className="text-slate-400 text-sm mb-1">{school.gpa}</p>}
              <p className="text-slate-500 text-sm">{school.courses}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
