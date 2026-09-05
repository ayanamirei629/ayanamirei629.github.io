import { useTranslation } from 'react-i18next';
import SectionWrapper from './SectionWrapper';

export default function Personal() {
  const { t } = useTranslation();
  const items = t('personal.items', { returnObjects: true });
  return <SectionWrapper id="personal" title={t('personal.title')}><ul className="personal-list">{items.map(item => <li key={item}><span className="status-dot" /><p>{item}</p></li>)}</ul></SectionWrapper>;
}
