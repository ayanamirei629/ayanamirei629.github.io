import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X, ArrowUpRight } from 'lucide-react';

const links = [
  ['about', 'About', '关于'],
  ['projects', 'Selected work', '精选项目'],
  ['experience', 'Experience', '研究经历'],
  ['reading', 'Reading', '阅读'],
  ['contact', 'Contact', '联系'],
];

export default function Navbar() {
  const { i18n } = useTranslation();
  const zh = i18n.resolvedLanguage === 'zh';
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('about');
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) {
        setActive('contact');
        return;
      }
      const current = links.map(([id]) => document.getElementById(id)).filter(Boolean).filter(el => el.getBoundingClientRect().top <= window.innerHeight * 0.35).at(-1);
      if (current) setActive(current.id);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const onKey = event => {
      if (event.key === 'Escape') { setMobileOpen(false); toggleRef.current?.focus(); }
    };
    const onPointer = event => { if (!menuRef.current?.contains(event.target)) setMobileOpen(false); };
    const wide = window.matchMedia('(min-width: 1024px)');
    const onResize = () => { if (wide.matches) setMobileOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    wide.addEventListener('change', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      wide.removeEventListener('change', onResize);
    };
  }, [mobileOpen]);
  const renderLinks = () => links.map(([id, en, cn]) => (
    <a key={id} href={'#' + id} className={active === id ? 'nav-link is-active' : 'nav-link'} aria-current={active === id ? 'location' : undefined} onClick={() => setMobileOpen(false)}>{zh ? cn : en}</a>
  ));
  return (
    <header ref={menuRef} className={'site-header ' + (scrolled || mobileOpen ? 'is-scrolled' : '')}>
      <a href="#main-content" className="skip-link">{zh ? '跳至正文' : 'Skip to content'}</a>
      <nav className="site-container nav-inner" aria-label={zh ? '主导航' : 'Main navigation'}>
        <a href="#about" className="wordmark" aria-label={zh ? '胡英阁 — 首页' : 'Yingge Hu — home'} onClick={() => setMobileOpen(false)}>yh<span>.</span></a>
        <div className="desktop-nav">{renderLinks()}</div>
        <div className="nav-controls">
          <button className="language-button" onClick={() => i18n.changeLanguage(zh ? 'en' : 'zh')} aria-label={zh ? 'Switch to English' : '切换至中文'}><Globe size={15} /><span>{zh ? 'EN' : '中文'}</span></button>
          <a className="nav-contact" href="mailto:yhu893@uwo.ca">{zh ? '邮件联系' : 'Let’s talk'}<ArrowUpRight size={16} /></a>
          <button ref={toggleRef} className="menu-toggle" aria-label={mobileOpen ? (zh ? '关闭菜单' : 'Close menu') : (zh ? '打开菜单' : 'Open menu')} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </nav>
      {mobileOpen && <nav id="mobile-navigation" className="mobile-nav site-container" aria-label={zh ? '移动导航' : 'Mobile navigation'}>{renderLinks()}</nav>}
    </header>
  );
}
