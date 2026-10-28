import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Flag } from 'lucide-react';

export default function CompetitionUpdate() {
  const { i18n } = useTranslation();
  const zh = i18n.resolvedLanguage === 'zh';
  return <article id="competition" data-guide-topic="competition" className="competition-update surface">
    <div className="competition-icon"><Flag size={24} /></div>
    <div><p className="eyebrow">{zh ? '2026.10.26 开赛 / 模拟盘' : 'STARTED 26 OCT 2026 / PAPER TRADING'}</p><h3>{zh ? '香港「资管通」比赛' : 'Hong Kong “资管通” competition'}</h3><p>{zh ? '模拟盘人气榜第 1 · 截至 2026-10-28，由参赛者提供。人气排名与收益排名分别统计。' : 'No. 1 on the paper-trading popularity leaderboard, as reported by the participant on 2026-10-28. Popularity and return rankings are separate.'}</p></div>
    <a className="text-link" href="#quant-project">{zh ? '了解研究背景' : 'Research background'}<ArrowUpRight size={16} /></a>
  </article>;
}
