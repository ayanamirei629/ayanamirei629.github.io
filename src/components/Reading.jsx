import { useTranslation } from 'react-i18next';
import { BookOpen, FileText } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

export default function Reading() {
  const { t, i18n } = useTranslation();
  const zh = i18n.resolvedLanguage === 'zh';
  const papers = t('papers.items', { returnObjects: true });
  const books = t('books.items', { returnObjects: true });
  const paperRow = paper => <li key={paper}><FileText size={15} /><span>{paper}</span></li>;
  return <SectionWrapper id="reading" title={zh ? '正在阅读' : 'On my reading desk'} subtitle={zh ? '研究中的问题，以及研究之外的世界。' : 'Questions within research. Perspectives beyond it.'}>
    <div className="reading-grid"><div><h3 className="reading-heading"><FileText size={18} />{zh ? '论文与研究' : 'Papers & research'}</h3><ul className="paper-list">{papers.slice(0, 5).map(paperRow)}</ul><details className="detail-disclosure"><summary>{zh ? '更多阅读' : 'More from the reading list'} <span className="disclosure-count">{papers.length - 5}</span></summary><ul className="paper-list">{papers.slice(5).map(paperRow)}</ul></details></div>
    <div><h3 className="reading-heading"><BookOpen size={18} />{zh ? '文学与生活' : 'Books & perspectives'}</h3><div className="book-list">{books.map((book, i) => <article key={book.en}><span>{String(i + 1).padStart(2, '0')}</span><div><h4>{book.en}</h4><p>{book.author}</p></div></article>)}</div></div></div>
  </SectionWrapper>;
}
