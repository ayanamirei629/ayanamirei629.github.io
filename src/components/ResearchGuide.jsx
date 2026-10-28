import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Compass, Minus, Pause, Play, Volume2, VolumeX, X } from 'lucide-react';
import { guideCopy } from '../data/researchUpdates';
import './ResearchGuide.css';

const topics = ['intro', 'paper', 'quant', 'competition', 'experience', 'contact'];
const sections = { about: 'intro', projects: 'paper', news: 'competition', experience: 'experience', education: 'intro', publications: 'paper', skills: 'experience', activity: 'experience', personal: 'intro', reading: 'paper', contact: 'contact' };
const tones = { intro: 'gold', paper: 'teal', quant: 'teal', competition: 'gold', experience: 'blue', database: 'blue', imaging: 'violet', contact: 'gold' };
const initialOpen = () => {
  try { return window.innerWidth >= 1024 && !sessionStorage.getItem('portfolio-guide-seen'); }
  catch { return false; }
};
const initialPaused = () => {
  try { return localStorage.getItem('portfolio-motion') === 'paused'; }
  catch { return false; }
};

export default function ResearchGuide() {
  const { i18n } = useTranslation();
  const zh = i18n.resolvedLanguage === 'zh';
  const copy = guideCopy[zh ? 'zh' : 'en'];
  const [open, setOpen] = useState(initialOpen);
  const [minimized, setMinimized] = useState(() => window.innerWidth < 768);
  const [context, setContext] = useState('intro');
  const [selected, setSelected] = useState(null);
  const [paused, setPaused] = useState(initialPaused);
  const [speaking, setSpeaking] = useState(false);
  const [speechError, setSpeechError] = useState(false);
  const avatarRef = useRef(null);
  const launcherRef = useRef(null);
  const closeRef = useRef(null);
  const utteranceRef = useRef(null);
  const active = selected || context;
  const message = copy[active];
  const canSpeak = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;

  useEffect(() => {
    try { sessionStorage.setItem('portfolio-guide-seen', '1'); } catch { /* Optional preference. */ }
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * .4;
      let current = 'intro';
      document.querySelectorAll('main section[id], [data-guide-topic]').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= line && rect.bottom > line) current = el.dataset.guideTopic || sections[el.id] || current;
      });
      setContext(current);
      document.documentElement.dataset.tone = tones[current];
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      delete document.documentElement.dataset.tone;
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? 'paused' : 'running';
    try { localStorage.setItem('portfolio-motion', paused ? 'paused' : 'running'); } catch { /* Optional preference. */ }
    window.dispatchEvent(new Event('portfolio-motion-change'));
  }, [paused]);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)');
    const shrink = () => { if (mobile.matches) { setOpen(false); setMinimized(true); } };
    mobile.addEventListener('change', shrink);
    return () => mobile.removeEventListener('change', shrink);
  }, []);

  useEffect(() => {
    setSpeaking(false);
    setSpeechError(false);
    return () => {
      if (utteranceRef.current && canSpeak) {
        utteranceRef.current.onend = null;
        utteranceRef.current.onerror = null;
        window.speechSynthesis.cancel();
        utteranceRef.current = null;
      }
    };
  }, [active, zh, open, canSpeak]);

  useEffect(() => {
    if (!open) return undefined;
    const escape = event => {
      // Leave Escape to a focused navigation menu when the guide is not its target.
      if (event.key === 'Escape' && !document.querySelector('.menu-toggle[aria-expanded="true"]')) {
        setOpen(false);
        requestAnimationFrame(() => avatarRef.current?.focus());
      }
    };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [open]);

  const speak = () => {
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); return; }
    const utterance = new SpeechSynthesisUtterance(`${message.heading} ${message.body}`);
    utterance.lang = zh ? 'zh-CN' : 'en-CA';
    utterance.rate = zh ? .95 : 1;
    utterance.onend = () => { setSpeaking(false); utteranceRef.current = null; };
    utterance.onerror = event => { setSpeaking(false); setSpeechError(!['interrupted', 'canceled'].includes(event.error)); utteranceRef.current = null; };
    utteranceRef.current = utterance;
    setSpeechError(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };
  const openGuide = () => {
    setMinimized(false);
    setOpen(true);
    requestAnimationFrame(() => closeRef.current?.focus());
  };
  const minimize = () => {
    setOpen(false);
    setMinimized(true);
    requestAnimationFrame(() => launcherRef.current?.focus());
  };
  const followLink = event => {
    const target = document.querySelector(message.link);
    if (!target) return;
    event.preventDefault();
    setSelected(null);
    setOpen(false);
    history.replaceState(null, '', message.link);
    target.scrollIntoView({ behavior: paused || matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  };

  return <aside className={`research-guide ${minimized ? 'is-minimized' : ''} ${speaking ? 'is-speaking' : ''}`} aria-label={zh ? 'Craig 的网站向导' : 'Craig’s website guide'}>
    {open && <div className="guide-bubble" id="research-guide-panel" role="region" aria-labelledby="guide-heading">
      <div className="guide-header"><span><i />{zh ? 'Craig 的研究向导' : 'CRAIG’S RESEARCH GUIDE'}</span><button ref={closeRef} onClick={() => { setOpen(false); requestAnimationFrame(() => avatarRef.current?.focus()); }} aria-label={zh ? '收起对话' : 'Close conversation'}><X size={18} /></button></div>
      <p className="guide-context">{selected ? (zh ? '你选择的话题' : 'YOUR SELECTED TOPIC') : (zh ? '跟随当前页面' : 'FOLLOWING YOUR EXPLORATION')}<span>{copy[active].label}</span></p>
      <div className="guide-message" key={`${active}-${zh}`}><h2 id="guide-heading">{message.heading}</h2><p aria-live="polite">{message.body}</p></div>
      <a className="guide-action" href={message.link} onClick={followLink}>{message.action}<ArrowRight size={17} /></a>
      <div className="guide-topics" aria-label={zh ? '选择导览话题' : 'Choose a guide topic'}>{topics.map(topic => <button key={topic} aria-pressed={active === topic} onClick={() => setSelected(topic)}>{copy[topic].label}</button>)}</div>
      <div className="guide-utilities">
        <button onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? <Play size={14} /> : <Pause size={14} />}{paused ? (zh ? '恢复动效' : 'Motion on') : (zh ? '暂停动效' : 'Pause motion')}</button>
        {canSpeak && <button onClick={speak} aria-pressed={speaking}>{speaking ? <VolumeX size={14} /> : <Volume2 size={14} />}{speaking ? (zh ? '停止朗读' : 'Stop') : (zh ? '朗读' : 'Read aloud')}</button>}
        {selected && <button onClick={() => setSelected(null)} title={zh ? '跟随当前页面' : 'Follow this page'}><Compass size={14} /><span>{zh ? '跟随' : 'Follow'}</span></button>}
      </div>
      {speechError && <p className="guide-speech-error" role="status">{zh ? '此浏览器暂时无法朗读，请阅读上方文字。' : 'Speech is unavailable in this browser. The summary is above.'}</p>}
    </div>}
    {minimized ? <button ref={launcherRef} className="guide-launcher" aria-expanded="false" aria-controls="research-guide-panel" onClick={openGuide}><Compass size={18} />{zh ? '研究向导' : 'Guide'}</button> : <div className="guide-character-wrap">
      <button className="guide-minimize" onClick={minimize} aria-label={zh ? '最小化向导' : 'Minimize guide'}><Minus size={15} /></button>
      <button ref={avatarRef} className="guide-character" aria-label={open ? (zh ? '收起研究向导' : 'Close research guide') : (zh ? '打开研究向导' : 'Open research guide')} aria-expanded={open} aria-controls="research-guide-panel" onClick={() => open ? setOpen(false) : openGuide()}>
        <span className="guide-orbit" aria-hidden="true" /><img src={`${import.meta.env.BASE_URL}guide/research-companion.png`} alt="" width="984" height="1600" /><span className="guide-character-label"><i />{zh ? '和我一起探索' : 'Explore with me'}</span>
      </button>
    </div>}
  </aside>;
}
