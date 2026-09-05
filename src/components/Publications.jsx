import { useTranslation } from 'react-i18next';
import { FileDown } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

export default function Publications() {
  const { t, i18n } = useTranslation();
  const items = t('publications.items', { returnObjects: true });
  const zh = i18n.resolvedLanguage === 'zh';
  return <SectionWrapper id="publications" title={t('publications.title')} subtitle={zh ? 'MRI 去噪与分类的研究及项目报告。' : 'Research and project reports on MRI denoising and classification.'}><div className="publication-list">{items.map((item, i) => <a key={item.file} href={import.meta.env.BASE_URL + 'files/' + item.file} target="_blank" rel="noopener noreferrer" className="publication-row"><span className="publication-number">{String(i + 1).padStart(2, '0')}</span><div><h3>{item.name}</h3><p>{item.desc}</p></div><span className="publication-action"><FileDown size={18} />{zh ? '阅读 PDF' : 'Read PDF'}</span></a>)}</div></SectionWrapper>;
}
