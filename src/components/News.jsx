import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

export default function News() {
  const { t, i18n } = useTranslation();
  const zh = i18n.resolvedLanguage === 'zh';
  const items = t('news.items', { returnObjects: true });
  const row = (item, i) => <li className="news-row" key={i}><span className="news-date">{item.date}</span><div><p>{item.text}</p>{item.link && <a className="text-link" href={import.meta.env.BASE_URL + item.link}>{item.linkLabel}<ArrowUpRight size={15} /></a>}</div></li>;
  return <SectionWrapper id="news" title={t('news.title')} subtitle={zh ? '最近的研究进展与重要时刻。' : 'Research progress and recent milestones.'}><ol className="news-list">{items.slice(0, 3).map(row)}</ol><details className="detail-disclosure news-archive"><summary>{zh ? '查看更早的动态' : 'Earlier updates'} <span className="disclosure-count">{items.length - 3}</span></summary><ol className="news-list">{items.slice(3).map(row)}</ol></details></SectionWrapper>;
}
