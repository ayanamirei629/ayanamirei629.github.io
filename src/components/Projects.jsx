import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Database, ScanLine, ShieldCheck, Activity, Route, ArrowRight } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

export default function Projects() {
  const { t, i18n } = useTranslation();
  const zh = i18n.resolvedLanguage === 'zh';
  const items = t('projects.items', { returnObjects: true });
  const base = import.meta.env.BASE_URL;
  const [quant, privacy, database, mri, sleep, gis] = ['quant', 'privacy', 'database', 'mri', 'sleep', 'gis'].map(id => items.find(item => item.id === id));
  const tags = item => <div className="project-tags">{item.tech?.split(', ').slice(0, 3).map(tech => <span key={tech}>{tech}</span>)}</div>;

  return (
    <SectionWrapper id="projects" title={zh ? '精选研究与项目' : 'Selected work'} subtitle={zh ? '从数据系统到真实世界的问题。' : 'From data systems to real-world questions.'} action={<a href={`${base}research/quant-report-portal.html`} className="text-link">{zh ? '最新研究报告' : 'Latest research report'}<ArrowUpRight size={16} /></a>}>
      <article className="project-feature surface">
        <div className="project-feature-copy">
          <p className="eyebrow">{zh ? '重点项目 / 量化研究' : 'FEATURED / QUANTITATIVE RESEARCH'}</p>
          <h3>{quant.name}</h3>
          <p className="project-description">{quant.shortDesc || quant.desc}</p>
          {tags(quant)}
          <a className="text-link" href={`${base}${quant.link}`}>{zh ? '打开研究报告' : 'Explore the research'}<ArrowUpRight size={17} /></a>
        </div>
        <a className="project-preview" href={`${base}${quant.link}`} aria-label={zh ? '查看量化研究报告与交互图表' : 'Open quantitative research and interactive charts'}>
          <div className="preview-topline"><span className="status-dot" />{zh ? '模型输出 · 历史快照' : 'MODEL OUTPUT · HISTORICAL SNAPSHOT'}<ArrowUpRight size={15} /></div>
          <img src={`${base}research/chart-shots/current/monitor-stock.png`} width="908" height="799" loading="lazy" alt={zh ? 'ARM 历史价格、成交量与研究模型标记；来自公开报告的静态快照' : 'ARM historical price, volume, and research model markers; a static public-report snapshot'} />
          <span className="preview-caption">{zh ? '历史研究快照；最新日期及验证边界见报告。' : 'Historical research snapshot. See the report for dates and validation limits.'}</span>
        </a>
      </article>
      <div className="project-pair">
        <article className="project-card surface">
          <div className="project-diagram database-diagram" role="img" aria-label={zh ? '研究领域：eBPF网络追踪、TiDB事务、CloudLab基础设施' : 'Research areas: eBPF network tracing, TiDB transactions, CloudLab infrastructure'}>
            <div><Database size={22} /><span>eBPF</span><small>TCP/IP · MAC</small></div><span className="diagram-line" /><div><Database size={22} /><span>TiDB</span><small>{zh ? '分布式事务' : 'Transactions'}</small></div><span className="diagram-line" /><div><Database size={22} /><span>CloudLab</span><small>{zh ? '基础设施' : 'Infrastructure'}</small></div>
          </div>
          <div className="project-card-copy"><p className="eyebrow">{database.tag}</p><h3>{database.name}</h3><p className="project-description">{database.shortDesc || database.desc}</p>{tags(database)}<details className="detail-disclosure"><summary>{zh ? '研究细节' : 'Research details'}</summary><p>{database.desc}</p></details></div>
        </article>
        <article className="project-card surface">
          <div className="project-diagram mri-diagram" role="img" aria-label={zh ? 'MRI研究包含影像去噪与可解释分类两个方向' : 'MRI research spans image denoising and explainable classification'}>
            <div><ScanLine size={26} /><span>{zh ? '影像去噪' : 'Denoising'}</span><small>Restormer · Swin-UNet</small></div><span className="diagram-divider" /><div><ScanLine size={26} /><span>{zh ? '可解释分类' : 'Classification'}</span><small>MaxViT · Grad-CAM++</small></div>
          </div>
          <div className="project-card-copy"><p className="eyebrow">{mri.tag}</p><h3>{mri.name}</h3><p className="project-description">{mri.shortDesc || mri.desc}</p>{tags(mri)}<a href="#publications" className="text-link">{zh ? '阅读研究报告' : 'Read the papers'}<ArrowUpRight size={16} /></a></div>
        </article>
      </div>
      <div className="other-projects">
        {[privacy, sleep, gis].map((item, i) => {
          const Icon = [ShieldCheck, Activity, Route][i];
          return <article className="other-project" key={item.name}><Icon size={21} /><div><h3>{item.name}</h3><p>{item.shortDesc || item.desc}</p></div>{i === 0 && <a href="#experience" className="text-link" aria-label={zh ? '查看隐私研究经历' : 'View privacy research experience'}><ArrowRight size={20} /></a>}</article>;
        })}
      </div>
    </SectionWrapper>
  );
}
