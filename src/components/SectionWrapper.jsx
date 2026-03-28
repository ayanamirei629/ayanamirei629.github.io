import { motion } from 'framer-motion';

export default function SectionWrapper({ id, title, subtitle, children, className = '' }) {
  return (
    <section id={id} className={`py-24 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h2>
          {subtitle && <p className="text-slate-500 text-lg">{subtitle}</p>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
