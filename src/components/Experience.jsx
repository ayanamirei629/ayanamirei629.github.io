import { useTranslation } from 'react-i18next';
import SectionWrapper from './SectionWrapper';

export default function Experience() {
  const { t, i18n } = useTranslation();
  const zh = i18n.resolvedLanguage === 'zh';
  const items = t('experience.items', { returnObjects: true });
  return (
    <SectionWrapper id="experience" title={zh ? '研究与工作经历' : 'Research & experience'} subtitle={zh ? '在学术探索与工程实践之间。' : 'At the intersection of research and engineering.'}>
      <div className="experience-list">{items.map((item, i) => <article key={item.org} className="experience-row">
        <div className="experience-meta"><span className="experience-dot" /><p>{item.period}</p><span>{String(i + 1).padStart(2, '0')}</span></div>
        <div className="experience-content"><p className="experience-role">{item.role}</p><h3>{item.org}</h3><p className="experience-description">{item.desc}</p>
          {(item.bullets?.length > 0 || item.timeline?.length > 0) && <details className="detail-disclosure"><summary>{zh ? '贡献与研究过程' : 'Contributions & research process'}</summary>
            {item.bullets?.length > 0 && <ul className="experience-bullets">{item.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>}
            {item.timeline?.length > 0 && <ol className="milestones">{item.timeline.map(milestone => <li key={milestone.date}><span>{milestone.date}</span><p>{milestone.text}</p></li>)}</ol>}
          </details>}
        </div>
      </article>)}</div>
    </SectionWrapper>
  );
}
