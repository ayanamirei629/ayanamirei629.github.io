import { useTranslation } from 'react-i18next';
import snapshot from '../data/paperSnapshot.json';

export default function PaperPerformance() {
  const { i18n } = useTranslation();
  const zh = i18n.resolvedLanguage === 'zh';
  const chart = snapshot.points.map((point, i) => ({ x: 28 + i * 80.8, y: 134 - (point.index - .98) * 2500 }));
  const points = chart.map(p => `${p.x},${p.y}`).join(' ');
  const last = chart.at(-1);
  const percent = value => `${(value * 100).toFixed(2)}%`;
  return <div id="p8-performance" className="paper-performance">
    <div className="performance-header"><span className="status-dot" /><span>P8 / PAPER FORWARD</span><span>{zh ? '报告快照' : 'REPORT SNAPSHOT'}</span></div>
    <div className="performance-value"><strong>+{percent(snapshot.return)}</strong><span>{zh ? `${snapshot.days} 个有效交易日 · 累计收益` : `${snapshot.days} complete trading days · cumulative return`}</span></div>
    <svg viewBox="0 0 460 190" role="img" aria-label={zh ? 'P8 模拟净值：10 月 20 日收盘归一为 1，10 月 27 日为 1.0165；期间存在回撤。' : 'P8 paper equity: normalized to 1 at the October 20 close and 1.0165 on October 27, with an intervening drawdown.'}>
      <defs><linearGradient id="paper-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#67d5b7" stopOpacity=".18" /><stop offset="100%" stopColor="#67d5b7" stopOpacity="0" /></linearGradient></defs>
      {[34, 84, 134].map((y, i) => <g key={y}><line x1="28" x2="432" y1={y} y2={y} stroke="#ffffff0d" strokeDasharray={i === 1 ? '3 5' : undefined} /><text x="432" y={y - 7} textAnchor="end" fill="#829b94" fontSize="10">{['1.02', '1.00', '0.98'][i]}</text></g>)}
      <polygon points={`28,150 ${points} 432,150`} fill="url(#paper-fill)" />
      <polyline points={points} fill="none" stroke="#76d8bd" strokeWidth="2" strokeLinejoin="round" />
      {chart.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3" fill="#c5e6d6" />)}
      <circle className="performance-pulse" cx={last.x} cy={last.y} r="7" fill="#7ee8ca" opacity=".2" />
      <text x="28" y="177" fill="#879f98" fontSize="10">20 OCT 2026</text><text x="432" y="177" textAnchor="end" fill="#879f98" fontSize="10">27 OCT 2026</text>
    </svg>
    <div className="performance-footer"><div><span>{zh ? '区间最大回撤' : 'Period max drawdown'}</span><strong>{percent(snapshot.maxDrawdown)}</strong></div><div><span>{zh ? '收盘基准日' : 'Closing baseline'}</span><strong>{snapshot.baseline}</strong></div></div>
    <p>{zh ? '来源：Golden Finger 本地报告，截至 2026-10-27。此处为 P8 模拟记录，不是比赛起始区间收益或实盘收益。' : 'Source: Golden Finger local report, through 2026-10-27. P8 paper results; this window is distinct from the competition period and live returns.'}</p>
  </div>;
}
