import { useTranslation } from 'react-i18next';
import { GraduationCap } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

export default function Education() {
  const { t } = useTranslation();
  const schools = t('education.schools', { returnObjects: true });
  return <SectionWrapper id="education" title={t('education.title')}><div className="education-grid">{schools.map(school => <article key={school.name} className="education-card"><GraduationCap size={23} /><p className="education-period">{school.period}</p><h3>{school.name}</h3><p className="education-degree">{school.degree}</p><p className="education-location">{school.location}</p><div className="education-notes">{school.gpa && <p>{school.gpa}</p>}<p>{school.courses}</p></div></article>)}</div></SectionWrapper>;
}
