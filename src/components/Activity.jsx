import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

export default function Activity() {
  const { t, i18n } = useTranslation();
  const items = t('activity.items', { returnObjects: true });
  const zh = i18n.resolvedLanguage === 'zh';
  return <SectionWrapper id="activity" title={zh ? '社区与参与' : 'Community & involvement'}><div className="community-grid">{items.map(item => <article key={item.name}><p className="eyebrow">{item.tag}</p><h3>{item.name}</h3><p className="community-description">{item.desc}</p><span className="community-tech">{item.tech}</span>{item.archiveLink && <a className="text-link" href={import.meta.env.BASE_URL + 'archive/index.html'} target="_blank" rel="noopener noreferrer">{zh ? '查看早期作品存档' : 'Visit the portfolio archive'}<ArrowUpRight size={16} /></a>}</article>)}</div></SectionWrapper>;
}
