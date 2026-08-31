(() => {
  const page = location.pathname.split('/').pop();
  const pageKey = page?.replace(/-\d{4}-\d{2}-\d{2}\.html$/, '').replace(/\.html$/, '') || '';

  const sharedProof = 'Public, dated evidence only. Private rules and diagnostics remain omitted; historical results and model outputs are not promises of future performance.';

  const configs = {
    'quant-report-portal': {
      kicker: 'MODEL RESEARCH SYSTEM · PUBLIC EVIDENCE PORTAL',
      title: 'One research stack, seven auditable views',
      lede: 'A current public surface spanning regime detection, cross-sectional ranking, security-level drill-down, portfolio research, paper execution and model-development governance. Production, shadow and paper authority remain explicitly separated.',
      asOf: 'Published 1 Sep · market data through 28 Aug 2026',
      metrics: [
        ['Evidence views', '7', 'Market → security → research governance'],
        ['Monitored universe', '130', '127 full-model · 3 limited-history'],
        ['Current signals', '19', '16 bottom · 3 top / overheat'],
        ['Ready setups', '2', 'ARM · HUBB · shadow only'],
      ],
      tags: ['Regime-aware', 'Cross-sectional', 'Risk-gated', 'Append-only forward'],
      capabilities: [
        ['01', 'Market context', 'State, sentiment, positioning and bounded next-session risk.'],
        ['02', 'Signal selection', 'Ranks 130 names while distinguishing watch, readiness and authority.'],
        ['03', 'Decision audit', 'Security paths, filters, levels, evidence gates and state markers.'],
        ['04', 'Governed execution', 'Keeps historical, frozen-forward, paper and production layers separate.'],
      ],
      visual: `
        <div class="showcase-shot-grid">
          <a class="showcase-shot-card" href="market-dashboard.html">
            <img src="chart-shots/current/market-chart.png" alt="SPX daily close and forecast interval through 28 August 2026" loading="eager">
            <span><b>Market regime</b><small>SPX 7,711.76 · Range posterior 54.5%</small></span>
          </a>
          <a class="showcase-shot-card" href="daily-stock-report.html">
            <img src="chart-shots/current/daily-ranking.png" alt="Top market-neutral stock shadow rankings through 28 August 2026" loading="lazy">
            <span><b>Cross-sectional ranking</b><small>130 names · model gates remain closed</small></span>
          </a>
          <a class="showcase-shot-card showcase-shot-featured" href="interactive-monitor-stocks.html">
            <img src="chart-shots/current/monitor-stock.png" alt="Interactive ARM price history with model markers and readiness evidence" loading="lazy">
            <span><b>Interactive path audit</b><small>ARM · ready shadow setup · live controls in report</small></span>
          </a>
          <a class="showcase-shot-card" href="strategy-report.html">
            <img src="chart-shots/current/strategy-frontiers.png" alt="Current historical-unseen strategy frontiers through 28 August 2026" loading="lazy">
            <span><b>Portfolio evidence</b><small>62.1% CAGR · 2.22 Sharpe · 14.9% drawdown</small></span>
          </a>
        </div>`,
      proof: sharedProof,
    },
    'market-dashboard': {
      kicker: 'MARKET REGIME ENGINE · GATED PUBLIC OUTPUT',
      title: 'From regime probability to gated execution',
      lede: 'The current dashboard joins SPX, sentiment, put/call context, latent-state probability, shadow budgets and a bounded next-session interval while keeping the formal production gate visible.',
      asOf: 'Data through 28 Aug 2026 · target session 31 Aug',
      metrics: [
        ['SPX close', '7,711.76', 'Dated daily close'],
        ['Market state', 'Range 54.5%', 'Bull 40.3% · rebound 5.3%'],
        ['Production gross', '0.0%', 'NO_TRADE · formal production action'],
        ['Forecast band', '7,625.87–7,800.36', 'Research-only next-session interval'],
      ],
      tags: ['Regime classification', 'Range forecast', 'Dynamic allocation', 'Risk overlay'],
      capabilities: [
        ['01', 'State detection', 'Condenses multiple market inputs into an explicit public state.'],
        ['02', 'Allocation translation', 'Turns state into held core, growth and cash exposures.'],
        ['03', 'Bounded forecast', 'Publishes a dated next-session range instead of a point promise.'],
        ['04', 'Benchmark context', 'Keeps growth, defensive and guarded paths visible together.'],
      ],
      visual: `
        <figure class="showcase-report-shot">
          <a href="chart-shots/current/market-chart.png" target="_blank" rel="noopener" aria-label="Open the full-resolution SPX chart capture">
            <img src="chart-shots/current/market-chart.png" alt="SPX daily close and model context through 28 August 2026" loading="eager">
          </a>
          <figcaption><b>Actual report capture</b><span>SPX path · regime, timing and interval context · interactive source continues below</span></figcaption>
        </figure>`,
      proof: 'The interval is research-only and the formal production action remains NO_TRADE at 0% gross. A shadow risk-on budget does not override the production gate.',
    },
    'daily-stock-report': {
      kicker: 'CROSS-SECTIONAL SIGNAL ENGINE · DATED SNAPSHOT',
      title: 'Broad surveillance with closed production gates',
      lede: 'The current report ranks a 130-name universe, preserves current technical and option context, and explicitly separates shadow rankings from production eligibility and individual-stock leverage authority.',
      asOf: 'Market session · 28 Aug 2026',
      metrics: [
        ['Universe', '130', '127 full-model · 3 limited-history'],
        ['Current signals', '19', '16 bottom · 3 top / overheat'],
        ['OOS direction', '51.3%', 'Five-day model · not production eligible'],
        ['Top neutral rank', 'MXL', '100.0 percentile · shadow ranking'],
      ],
      tags: ['Cross-sectional ranking', 'Gated activation', 'Sector context', 'Explicit levels'],
      capabilities: [
        ['01', 'Coverage', 'A single dated pass maintains model or limited-history context across 130 names.'],
        ['02', 'Ranking discipline', 'Neutral percentile and residual momentum are shown without claiming production eligibility.'],
        ['03', 'State clarity', 'Signal, price, evidence gate, support, resistance and action remain inspectable.'],
        ['04', 'Risk framing', 'Readiness, confirmation and invalidation are separated from production authority.'],
      ],
      visual: `
        <figure class="showcase-report-shot">
          <a href="chart-shots/current/daily-ranking.png" target="_blank" rel="noopener" aria-label="Open the full-resolution daily ranking capture">
            <img src="chart-shots/current/daily-ranking.png" alt="Current market-neutral stock shadow ranking" loading="eager">
          </a>
          <figcaption><b>Actual report capture</b><span>Market-neutral shadow ranking · percentile inputs · production gates shown above the table</span></figcaption>
        </figure>`,
      proof: 'Directional accuracy is 51.3%, production eligibility is false and individual-stock leverage is closed. Rankings are research evidence, not authorized trades.',
    },
    'interactive-monitor-stocks': {
      kicker: 'MODEL AUDIT SURFACE · SECURITY-LEVEL DRILL-DOWN',
      title: 'Inspect the path behind every public state',
      lede: 'The interactive monitor turns a one-line signal into an auditable workflow: search the universe, filter by sector and state, change the history window and inspect dated paths and tooltips before interpreting the model output.',
      asOf: 'Market session · 28 Aug 2026',
      metrics: [
        ['Searchable names', '130', 'Full monitored universe'],
        ['Current signals', '19', '16 new today · 3 awaiting confirmation'],
        ['History windows', '3', '120d · 250d · all'],
        ['Ready setups', '2', 'ARM · HUBB · shadow only'],
      ],
      tags: ['Interactive history', 'State filtering', 'Sector slicing', 'Tooltip audit'],
      capabilities: [
        ['01', 'Traceability', 'Every displayed state can be inspected against its dated price path.'],
        ['02', 'Slice-and-test', 'Sector and state filters expose concentration and coverage quickly.'],
        ['03', 'Horizon control', 'Short, medium and full-history windows prevent one-view storytelling.'],
        ['04', 'Consistent outputs', 'The same 130-name session and 19 public states remain traceable across reports.'],
      ],
      visual: `
        <figure class="showcase-report-shot">
          <a href="chart-shots/current/monitor-stock.png" target="_blank" rel="noopener" aria-label="Open the full-resolution current interactive chart capture">
            <img src="chart-shots/current/monitor-stock.png" alt="Interactive ARM candlestick history with a ready shadow setup" loading="eager">
          </a>
          <figcaption><b>Actual interactive-chart capture</b><span>ARM · ready shadow setup · score, support, resistance and evidence gates · live controls continue below</span></figcaption>
        </figure>`,
      proof: 'Ready means the frozen shadow entry checks passed; it does not grant production authority. The report retains action gates and historical evidence limits.',
    },
    'strategy-report': {
      kicker: 'PORTFOLIO RESEARCH · MULTI-WINDOW EVIDENCE',
      title: 'Historical frontier, forward authority still pending',
      lede: 'The updated strategy report shows six current model frontiers against matched SPY, corrects the maturity embargo and keeps independent append-only evidence requirements visible beside historical return, Sharpe and drawdown.',
      asOf: 'Market data through 28 Aug 2026',
      metrics: [
        ['Current models', '6 + SPY', 'Historical-unseen comparison'],
        ['Lead CAGR', '62.1%', 'Historical unseen · 1× shadow'],
        ['Lead Sharpe', '2.22', 'Drawdown 14.9%'],
        ['Forward maturity', '0 / 26', 'No production override'],
      ],
      tags: ['Multi-window testing', 'Drawdown-aware', 'Evidence gates', 'Model governance'],
      capabilities: [
        ['01', 'Frontier comparison', 'Six current models and matched SPY expose different return, risk and drawdown trade-offs.'],
        ['02', 'Window robustness', 'Validation, confirmation and historical-unseen figures discourage single-period selection.'],
        ['03', 'Gate discipline', 'Pending statistical, state and forward gates remain visible in status text.'],
        ['04', 'Version governance', 'Leading, frozen, superseded and guard allocations are explicitly separated.'],
      ],
      visual: `
        <figure class="showcase-report-shot">
          <a href="chart-shots/current/strategy-frontiers.png" target="_blank" rel="noopener" aria-label="Open the full-resolution strategy frontier capture">
            <img src="chart-shots/current/strategy-frontiers.png" alt="Current strategy historical-unseen return risk and drawdown frontiers" loading="eager">
          </a>
          <figcaption><b>Actual report capture</b><span>Validation, confirmation and historical-unseen CAGR / Sharpe / drawdown · matched SPY included</span></figcaption>
        </figure>`,
      proof: 'All performance values are historical. The lead model has 0 of 26 independent matured weeks and no production override; no leveraged candidate is currently valid.',
    },
  };

  const config = configs[pageKey];
  if (!config || document.querySelector('.model-showcase')) return;

  const metricMarkup = config.metrics
    .map(([label, value, note]) => `<div class="showcase-metric"><span>${label}</span><strong>${value}</strong><small>${note}</small></div>`)
    .join('');
  const tagMarkup = config.tags.map((tag) => `<span class="showcase-tag">${tag}</span>`).join('');
  const capabilityMarkup = config.capabilities
    .map(([index, title, detail]) => `<div class="showcase-capability"><span class="showcase-card-index">${index}</span><b>${title}</b><p>${detail}</p></div>`)
    .join('');

  const showcase = document.createElement('section');
  showcase.className = 'model-showcase';
  showcase.setAttribute('aria-label', 'Model capability evidence');
  showcase.innerHTML = `
    <div class="showcase-hero">
      <div>
        <div class="showcase-kicker">${config.kicker}</div>
        <h2 class="showcase-title">${config.title}</h2>
        <p class="showcase-lede">${config.lede}</p>
        <div class="showcase-tags">${tagMarkup}</div>
      </div>
      <div class="showcase-metrics">${metricMarkup}</div>
    </div>
    <div class="showcase-evidence">${capabilityMarkup}</div>
    <div class="showcase-visual">
      <div class="showcase-visual-header">
        <div><span class="showcase-panel-label">MODEL OUTPUT SNAPSHOT</span><h3>What the public evidence demonstrates</h3></div>
        <span class="showcase-asof">${config.asOf}</span>
      </div>
      ${config.visual}
      <div class="showcase-proof-note"><b>Evidence boundary</b><span>${config.proof}</span></div>
    </div>`;

  const header = document.querySelector('header');
  if (header) header.insertAdjacentElement('afterend', showcase);
  else document.querySelector('main')?.prepend(showcase);
  document.body.classList.add('showcase-enhanced');

  if (pageKey === 'quant-report-portal') {
    const cardLabels = [
      ['VIEW 01', 'Open regime evidence →'],
      ['VIEW 02', 'Open signal evidence →'],
      ['VIEW 03', 'Open audit surface →'],
      ['VIEW 04', 'Open strategy evidence →'],
      ['VIEW 05', 'Open paper execution →'],
      ['VIEW 06', 'Open macro decision →'],
      ['VIEW 07', 'Open development audit →'],
    ];
    document.querySelectorAll('.grid > a.card').forEach((card, index) => {
      const [view, action] = cardLabels[index] || ['EVIDENCE VIEW', 'Open report →'];
      card.insertAdjacentHTML('beforeend', `<div class="showcase-card-meta"><span>${view}</span><strong>${action}</strong></div>`);
    });
  }
})();
