import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Database, ScanLine, ShieldCheck, Activity, Route, ArrowRight } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import ResearchSpotlight from './ResearchSpotlight';
import PaperPerformance from './PaperPerformance';

export default function Projects() {
  const { t, i18n } = useTranslation();
  const zh = i18n.resolvedLanguage === 'zh';
  const items = t('projects.items', { returnObjects: true });
  const base = import.meta.env.BASE_URL;
  const [quant, privacy, database, mri, sleep, gis] = ['quant', 'privacy', 'database', 'mri', 'sleep', 'gis'].map(id => items.find(item => item.id === id));
  const tags = item => <div className="project-tags">{item.tech?.split(', ').slice(0, 3).map(tech => <span key={tech}>{tech}</span>)}</div>;

  return (
    <SectionWrapper id="projects" title={zh ? '精选研究与项目' : 'Selected work'} subtitle={zh ? '从数据系统到真实世界的问题。' : 'From data systems to real-world questions.'} action={<a href={`${base}research/quant-report-portal.html`} className="text-link">{zh ? '最新研究报告' : 'Latest research report'}<ArrowUpRight size={16} /></a>}>
      <ResearchSpotlight />
      <article id="quant-project" data-guide-topic="quant" className="project-feature surface">
        <div className="project-feature-copy">
          <p className="eyebrow">{zh ? '重点项目 / 量化研究' : 'FEATURED / QUANTITATIVE RESEARCH'}</p>
          <h3>{quant.name}</h3>
          <p className="project-description">{quant.shortDesc || quant.desc}</p>
          {tags(quant)}
          <div className="quant-current"><span className="status-dot" /><div><strong>Golden Finger / P8</strong><p>{zh ? '时点信号 · 版本化规则 · IBKR 模拟执行' : 'Point-in-time signals · versioned rules · IBKR paper execution'}</p></div></div>
          <p className="quant-boundary">{zh ? 'P8 前瞻模拟记录自 2026 年 10 月版本切换后开始，与历史研究结果分开。' : 'P8’s forward paper record begins after the October 2026 cutover, separately from historical research.'}</p>
          <a className="text-link" href={`${base}${quant.link}`}>{zh ? '打开研究报告' : 'Explore the research'}<ArrowUpRight size={17} /></a>
        </div>
        <PaperPerformance />
      </article>
      <div className="project-pair">
        <article id="database-project" data-guide-topic="database" className="project-card surface">
          <div className="project-diagram database-diagram" role="img" aria-label={zh ? '研究领域：eBPF网络追踪、TiDB事务、CloudLab基础设施' : 'Research areas: eBPF network tracing, TiDB transactions, CloudLab infrastructure'}>
            <div><Database size={22} /><span>eBPF</span><small>TCP/IP · MAC</small></div><span className="diagram-line" /><div><Database size={22} /><span>TiDB</span><small>{zh ? '分布式事务' : 'Transactions'}</small></div><span className="diagram-line" /><div><Database size={22} /><span>CloudLab</span><small>{zh ? '基础设施' : 'Infrastructure'}</small></div>
          </div>
          <div className="project-card-copy"><p className="eyebrow">{database.tag}</p><h3>{database.name}</h3><p className="project-description">{database.shortDesc || database.desc}</p>{tags(database)}<details className="detail-disclosure"><summary>{zh ? '研究细节' : 'Research details'}</summary><p>{database.desc}</p></details></div>
        </article>
        <article id="imaging-project" data-guide-topic="imaging" className="project-card surface">
          <div className="project-diagram mri-diagram" role="img" aria-label={zh ? 'MRI研究包含影像去噪与可解释分类两个方向' : 'MRI research spans image denoising and explainable classification'}>
            <div><ScanLine size={26} /><span>{zh ? '影像去噪' : 'Denoising'}</span><small>Restormer · Swin-UNet</small></div><span className="diagram-divider" /><div><ScanLine size={26} /><span>{zh ? '可解释分类' : 'Classification'}</span><small>MaxViT · Grad-CAM++</small></div>
          </div>
          <div className="project-card-copy"><p className="eyebrow">{mri.tag}</p><h3>{mri.name}</h3><p className="project-description">{mri.shortDesc || mri.desc}</p>{tags(mri)}<a href="#publications" className="text-link">{zh ? '阅读研究报告' : 'Read the papers'}<ArrowUpRight size={16} /></a></div>
        </article>
      </div>
      <div className="other-projects">
        {[privacy, sleep, gis].map((item, i) => {
          const Icon = [ShieldCheck, Activity, Route][i];
          return <article className="other-project" key={item.name}><Icon size={21} /><div><h3>{item.name}</h3><p>{item.shortDesc || item.desc}</p></div>{i === 0 && <a href="#paper" className="text-link" aria-label={zh ? '查看隐私研究论文' : 'View privacy research paper'}><ArrowRight size={20} /></a>}</article>;
        })}
      </div>
    </SectionWrapper>
  );
}
