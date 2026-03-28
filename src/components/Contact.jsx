import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MessageCircle, Instagram } from 'lucide-react';

const links = [
  { icon: Github, href: 'https://github.com/ayanamirei629', label: 'GitHub', handle: 'ayanamirei629' },
  { icon: Linkedin, href: 'https://linkedin.com/in/yinggehu/', label: 'LinkedIn', handle: 'yinggehu' },
  { icon: MessageCircle, href: 'https://wa.me/16478601462', label: 'WhatsApp', handle: '+1 647-860-1462' },
  { icon: Instagram, href: 'https://instagram.com/craighooo', label: 'Instagram', handle: 'craighooo' },
  { icon: Mail, href: 'mailto:yhu893@uwo.ca', label: 'Email', handle: 'yhu893@uwo.ca' },
];

export default function Contact() {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {isZh ? '联系方式' : 'Get in Touch'}
          </h2>
          <p className="text-slate-500 text-lg">
            {isZh ? '欢迎随时联系我' : 'Feel free to reach out through any platform'}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {links.map(({ icon: Icon, href, label, handle }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className="flex items-center gap-3 bg-dark-800/50 border border-white/5 rounded-xl px-5 py-3 hover:border-accent-400/20 transition-all duration-300 group"
            >
              <Icon size={18} className="text-accent-400/60 group-hover:text-accent-400 transition-colors" />
              <div className="text-left">
                <p className="text-white text-sm font-medium">{label}</p>
                <p className="text-slate-500 text-xs">{handle}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* WeChat note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-slate-600 text-sm mt-8"
        >
          WeChat: Followtherabbit411
        </motion.p>
      </div>
    </section>
  );
}
