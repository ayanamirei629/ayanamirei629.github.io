import { useTranslation } from 'react-i18next';
import { ArrowUpRight, GitBranch, ShieldCheck } from 'lucide-react';
import { paper } from '../data/researchUpdates';

export default function ResearchSpotlight() {
  const { i18n } = useTranslation();
  const zh = i18n.resolvedLanguage === 'zh';
  return <article id="paper" data-guide-topic="paper" className="paper-spotlight surface">
    <div className="paper-copy">
      <div className="paper-meta"><span className="eyebrow">{zh ? '最新研究 / 2026.10' : 'LATEST RESEARCH / 2026.10'}</span><span className="research-badge">{zh ? '第一作者 · 已投稿' : 'FIRST AUTHOR · SUBMITTED'}</span></div>
      <h3>{paper.title}</h3>
      <p className="project-description">{zh ? '用温度平滑的投票机制，探索隐私保护与合成数据质量之间的平衡。BF-Soft 给出由策略图跨度与温度决定的紧致敏感度界，并分析软投票何时优于硬投票。' : 'Exploring the trade-off between privacy and synthetic data quality. BF-Soft uses temperature-smoothed voting with a tight sensitivity bound in policy-graph reach and temperature—and studies when it improves on hard voting.'}</p>
      <p className="paper-authors"><strong>Yingge Hu</strong> · Gautham Ramesh Babu · Mostafa Milani</p>
      <div className="paper-links"><a className="text-link" href={paper.repository} target="_blank" rel="noopener noreferrer"><GitBranch size={17} />{zh ? '论文与复现代码' : 'Paper & reproducible code'}<ArrowUpRight size={16} /></a><span>{zh ? 'EDBT 2027 投稿 · 尚未录用' : 'Submitted to EDBT 2027 · not yet accepted'}</span></div>
    </div>
    <div className="privacy-visual" aria-hidden="true">
      <div className="privacy-visual-heading"><ShieldCheck size={18} /><span>POLICY → PRIVACY</span></div>
      <div className="vote-flow">{[34, 58, 83, 96, 72, 48, 27].map((width, i) => <span key={i} style={{ '--beam-width': `${width}%`, '--beam-delay': `${i * -.7}s` }}><i /><b /></span>)}</div>
      <div className="privacy-equation"><span>BF-Soft</span><small>{zh ? '策略感知 · 温度平滑' : 'Policy-aware · temperature-smoothed'}</small></div>
      <p>{zh ? '概念示意 · 非实验数据' : 'Concept illustration · not experimental data'}</p>
    </div>
  </article>;
}
