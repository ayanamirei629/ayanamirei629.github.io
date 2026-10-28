import { useTranslation } from 'react-i18next';
import { ArrowUpRight, FileDown } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { paper } from '../data/researchUpdates';

export default function Publications() {
  const { t, i18n } = useTranslation();
  const items = t('publications.items', { returnObjects: true });
  const zh = i18n.resolvedLanguage === 'zh';
  return <SectionWrapper id="publications" title={t('publications.title')} subtitle={zh ? '隐私数据合成、MRI 去噪与分类。投稿与项目报告分别标注。' : 'Private data synthesis, MRI denoising and classification. Submissions and project reports are labelled individually.'}><div className="publication-list"><a className="publication-row" href={paper.repository} target="_blank" rel="noopener noreferrer"><span className="publication-number">01</span><div><h3>{paper.title}</h3><p>{paper.authors}</p><span className="publication-status">{zh ? '第一作者 · EDBT 2027 投稿，2026 年 10 月 · 尚未录用' : 'First author · submitted to EDBT 2027, October 2026 · not yet accepted'}</span></div><span className="publication-action"><ArrowUpRight size={18} />{zh ? '论文与代码' : 'Paper & code'}</span></a>{items.map((item, i) => <a key={item.file} href={import.meta.env.BASE_URL + 'files/' + item.file} target="_blank" rel="noopener noreferrer" className="publication-row"><span className="publication-number">{String(i + 2).padStart(2, '0')}</span><div><h3>{item.name}</h3><p>{item.desc}</p></div><span className="publication-action"><FileDown size={18} />{zh ? '阅读 PDF' : 'Read PDF'}</span></a>)}</div></SectionWrapper>;
}
