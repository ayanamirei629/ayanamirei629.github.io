import { useTranslation } from 'react-i18next';
import SectionWrapper from './SectionWrapper';

export default function Skills() {
  const { t, i18n } = useTranslation();
  const categories = t('skills.categories', { returnObjects: true });
  return <SectionWrapper id="skills" title={i18n.resolvedLanguage === 'zh' ? '技术工具与领域' : 'Tools & disciplines'}><dl className="skills-grid">{categories.map(cat => <div key={cat.name}><dt>{cat.name}</dt><dd>{cat.items.split(', ').map(item => <span key={item}>{item}</span>)}</dd></div>)}</dl></SectionWrapper>;
}
