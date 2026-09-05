import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, FileDown, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  const { t, i18n } = useTranslation();
  const zh = i18n.resolvedLanguage === 'zh';
  const base = import.meta.env.BASE_URL;
  return (
    <section id="about" className="hero">
      <div className="site-container hero-layout">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <p className="eyebrow"><span className="status-dot" />{zh ? '计算机科学 · 研究与工程' : 'COMPUTER SCIENCE · RESEARCH & ENGINEERING'}</p>
          <h1>{zh ? '胡英阁' : 'Yingge Hu'}<span className="hero-period">.</span></h1>
          <p className="hero-alias">{zh ? 'Yingge Hu / Craig' : 'Also known as Craig'}</p>
          <p className="hero-description">{zh ? '探索数据库系统、差分隐私与机器学习，将研究想法转化为可靠的数据系统。' : 'Exploring database systems, differential privacy, and machine learning. Turning research into reliable data systems.'}</p>
          <div className="hero-identity">
            <img src={base + 'avatar.png'} alt="Yingge Hu" width="48" height="48" />
            <div><p>{zh ? '计算机科学硕士研究生' : 'MSc in Computer Science'}</p><span>{zh ? '韦仕敦大学 · 加拿大' : 'Western University · Canada'}</span></div>
          </div>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">{zh ? '探索研究成果' : 'Explore my work'}<ArrowUpRight size={18} /></a>
            <a className="button button-secondary" href={base + 'files/Resume_YH.pdf'} target="_blank" rel="noopener noreferrer"><FileDown size={17} />{t('hero.resume')}</a>
          </div>
          <div className="hero-socials">
            <a href="https://github.com/ayanamirei629" target="_blank" rel="noopener noreferrer"><Github size={16} />GitHub</a>
            <a href="https://linkedin.com/in/yinggehu/" target="_blank" rel="noopener noreferrer"><Linkedin size={16} />LinkedIn</a>
            <a href="mailto:yhu893@uwo.ca"><Mail size={16} />{zh ? '邮件联系' : 'Email'}</a>
          </div>
        </motion.div>
        <div className="hero-art-label" aria-hidden="true"><span>01 / EVENT HORIZON</span><p>{zh ? '在已知的边界，保持好奇。' : 'Curiosity at the edge of the known.'}</p></div>
      </div>
      <div className="site-container hero-bottom"><a href="#projects"><ArrowDown size={16} />{zh ? '向下探索' : 'SCROLL TO EXPLORE'}</a><span>{zh ? '数据库 / 隐私 / 机器学习' : 'DATABASES / PRIVACY / MACHINE LEARNING'}</span></div>
    </section>
  );
}
