import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Github, Linkedin, MessageCircle, Instagram, MapPin } from 'lucide-react';

const links = [
  { icon: Github, href: 'https://github.com/ayanamirei629', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/yinggehu/', label: 'LinkedIn' },
  { icon: MessageCircle, href: 'https://wa.me/16478601462', label: 'WhatsApp' },
  { icon: Instagram, href: 'https://instagram.com/craighooo', label: 'Instagram' },
];

export default function Contact() {
  const { t, i18n } = useTranslation();
  const zh = i18n.resolvedLanguage === 'zh';
  return <section id="contact" className="contact-section" aria-labelledby="contact-title"><div className="site-container contact-grid"><div><p className="eyebrow">{zh ? '保持联系' : 'GET IN TOUCH'}</p><h2 id="contact-title">{zh ? '从一个想法，\n开始交流。' : 'Good conversations\nstart with an idea.'}</h2><a className="contact-email" href="mailto:yhu893@uwo.ca">yhu893@uwo.ca<ArrowUpRight size={25} /></a><a className="contact-secondary-email" href="mailto:yingge.hu@alumni.utoronto.ca">yingge.hu@alumni.utoronto.ca</a></div><div className="contact-details"><p><MapPin size={16} />{t('hero.location')}</p><a href="tel:+16478601462">+1 647-860-1462</a><div className="contact-socials">{links.map(({ icon: Icon, href, label }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer"><Icon size={17} />{label}<ArrowUpRight size={15} /></a>)}</div><p className="wechat">{zh ? '微信' : 'WeChat'}: Followtherabbit411</p></div></div></section>;
}
