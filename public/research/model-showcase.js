(() => {
  const page = location.pathname.split('/').pop();
  const pageKey = page?.replace('-2026-08-11.html', '') || '';

  const sharedProof = 'Public, dated evidence only. Private rules and diagnostics remain omitted; historical results and model outputs are not promises of future performance.';

  const configs = {
    'quant-report-portal': {
      kicker: 'MODEL RESEARCH SYSTEM · PUBLIC EVIDENCE PORTAL',
      title: 'One research stack, four auditable views',
      lede: 'A compact public surface for regime detection, cross-sectional surveillance, security-level drill-down and portfolio decision evidence. Each view preserves its dated outputs while keeping private implementation logic out of scope.',
      asOf: 'Evidence snapshot · 11 Aug 2026',
      metrics: [
        ['Evidence views', '4', 'Market → security → strategy'],
        ['Monitored universe', '115', 'Named instruments with dated levels'],
        ['Active watches', '3', '2.6% of the displayed universe'],
        ['Allocation records', '8', 'Public shadow / guard decisions'],
      ],
      tags: ['Regime-aware', 'Cross-sectional', 'Risk-gated', 'Walk-forward minded'],
      capabilities: [
        ['01', 'Market context', 'State, sentiment, positioning and bounded next-session risk.'],
        ['02', 'Signal selection', 'Sparse public watches across a broad monitored universe.'],
        ['03', 'Decision audit', 'Security paths, filters, levels and state markers.'],
        ['04', 'Portfolio evidence', 'Multi-window frontiers, drawdowns, gates and allocations.'],
      ],
      visual: `
        <div class="showcase-shot-grid">
          <a class="showcase-shot-card" href="market-dashboard-2026-08-11.html">
            <img src="chart-shots/market-chart.png" alt="SPX daily close chart with public market-state markers" loading="eager">
            <span><b>Market regime</b><small>SPX path + public state markers</small></span>
          </a>
          <a class="showcase-shot-card" href="daily-stock-report-2026-08-11.html">
            <img src="chart-shots/daily-signals.png" alt="Daily model output table for MSFT, SNOW and ANET" loading="lazy">
            <span><b>Signal selection</b><small>Three dated outputs from 115 names</small></span>
          </a>
          <a class="showcase-shot-card showcase-shot-featured" href="interactive-monitor-stocks-2026-08-11.html">
            <img src="chart-shots/monitor-msft.png" alt="Interactive MSFT price history with model markers and levels" loading="lazy">
            <span><b>Interactive path audit</b><small>MSFT · 120-day history · score and levels</small></span>
          </a>
          <a class="showcase-shot-card" href="strategy-report-2026-08-11.html">
            <img src="chart-shots/strategy-frontiers.png" alt="Five public strategy performance frontiers" loading="lazy">
            <span><b>Portfolio evidence</b><small>Five historical return / risk / drawdown frontiers</small></span>
          </a>
        </div>`,
      proof: sharedProof,
    },
    'market-dashboard': {
      kicker: 'MARKET REGIME ENGINE · PUBLIC OUTPUT',
      title: 'From market state to bounded next-session risk',
      lede: 'The dashboard connects index level, sentiment, derivatives positioning, held allocations and benchmark-relative equity paths into one dated market-state decision surface.',
      asOf: 'Daily data through 11 Aug 2026 · next session 12 Aug',
      metrics: [
        ['SPX close', '7,728.2', 'Dated daily close'],
        ['Market state', 'Top watch', 'Public state label'],
        ['Growth sleeve', '44.9%', 'Core 55.1% · cash 0.0%'],
        ['Forecast band', '7,601–7,855', 'Next-session public range'],
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
          <a href="chart-shots/market-chart.png" target="_blank" rel="noopener" aria-label="Open the full-resolution SPX chart capture">
            <img src="chart-shots/market-chart.png" alt="SPX daily close chart with public bottom and top-watch markers" loading="eager">
          </a>
          <figcaption><b>Actual report capture</b><span>SPX daily close · public bottom/top-watch markers · interactive source continues below</span></figcaption>
        </figure>`,
      proof: 'The public evidence retains the dated close, final state, held allocation and next-session range. It demonstrates decision coverage, not a claim of guaranteed forecast accuracy.',
    },
    'daily-stock-report': {
      kicker: 'CROSS-SECTIONAL SIGNAL ENGINE · DATED SNAPSHOT',
      title: 'Broad surveillance, intentionally selective output',
      lede: 'The model monitors a diversified 115-name universe, ranks current conditions and publishes only the small subset that clears the public watch threshold, with support, resistance and explicit example invalidation levels.',
      asOf: 'Market session · 11 Aug 2026',
      metrics: [
        ['Universe', '115', 'Equities and sector proxies'],
        ['Active watches', '3', 'MSFT · SNOW · ANET'],
        ['Signal density', '2.6%', 'Sparse by design'],
        ['Top public score', '69.9', 'Score, not probability'],
      ],
      tags: ['Cross-sectional ranking', 'Sparse activation', 'Sector context', 'Explicit levels'],
      capabilities: [
        ['01', 'Coverage', 'A single dated pass maintains levels across 115 monitored instruments.'],
        ['02', 'Selectivity', 'Only three names carry an active public watch on this snapshot.'],
        ['03', 'State clarity', 'Watch state, price, score, support and resistance remain inspectable.'],
        ['04', 'Risk framing', 'Illustrative triggers include confirmation, invalidation and target format.'],
      ],
      visual: `
        <figure class="showcase-report-shot">
          <a href="chart-shots/daily-signals.png" target="_blank" rel="noopener" aria-label="Open the full-resolution daily signal capture">
            <img src="chart-shots/daily-signals.png" alt="Current public signals for MSFT, SNOW and ANET" loading="eager">
          </a>
          <figcaption><b>Actual report capture</b><span>MSFT · SNOW · ANET · dated state, close and public score</span></figcaption>
        </figure>`,
      proof: 'The 2.6% active rate is evidence of output selectivity, not evidence of accuracy. NVDA trigger rows remain explicitly labelled as format examples rather than live calls.',
    },
    'interactive-monitor-stocks': {
      kicker: 'MODEL AUDIT SURFACE · SECURITY-LEVEL DRILL-DOWN',
      title: 'Inspect the path behind every public state',
      lede: 'The interactive monitor turns a one-line signal into an auditable workflow: search the universe, filter by sector and state, change the history window and inspect dated paths and tooltips before interpreting the model output.',
      asOf: 'Market session · 11 Aug 2026',
      metrics: [
        ['Searchable names', '115', 'Full monitored universe'],
        ['Public watches', '3', 'Consistent with the daily report'],
        ['History windows', '3', '120d · 250d · all'],
        ['Drill-down axes', '3', 'Name · sector · state'],
      ],
      tags: ['Interactive history', 'State filtering', 'Sector slicing', 'Tooltip audit'],
      capabilities: [
        ['01', 'Traceability', 'Every displayed state can be inspected against its dated price path.'],
        ['02', 'Slice-and-test', 'Sector and state filters expose concentration and coverage quickly.'],
        ['03', 'Horizon control', 'Short, medium and full-history windows prevent one-view storytelling.'],
        ['04', 'Consistent outputs', 'The same three watches appear across monitor and daily report.'],
      ],
      visual: `
        <figure class="showcase-report-shot">
          <a href="chart-shots/monitor-msft.png" target="_blank" rel="noopener" aria-label="Open the full-resolution MSFT interactive chart capture">
            <img src="chart-shots/monitor-msft.png" alt="Interactive MSFT 120-day candlestick history with model markers" loading="eager">
          </a>
          <figcaption><b>Actual interactive-chart capture</b><span>MSFT · 120-day history · model markers, score, support and resistance · live controls continue below</span></figcaption>
        </figure>`,
      proof: 'The monitor increases interpretability and consistency checking. It does not expose private features or transform historical alignment into a forward guarantee.',
    },
    'strategy-report': {
      kicker: 'PORTFOLIO RESEARCH · MULTI-WINDOW EVIDENCE',
      title: 'Return, risk and drawdown shown on the same frontier',
      lede: 'The strategy report presents multiple historical frontiers rather than a single winner, preserves gate and pending-status language, and publishes dated shadow allocations so model governance is visible alongside performance.',
      asOf: 'Market/state data through 11 Aug 2026',
      metrics: [
        ['Displayed frontiers', '5', 'Two windows + combined'],
        ['Max combined return', '119.2%', 'Historical displayed frontier'],
        ['Min combined drawdown', '14.1%', 'Among displayed frontiers'],
        ['Allocation records', '8', 'Shadow / guard decisions'],
      ],
      tags: ['Multi-window testing', 'Drawdown-aware', 'Evidence gates', 'Model governance'],
      capabilities: [
        ['01', 'Frontier comparison', 'Five public strategies expose different return, risk and drawdown trade-offs.'],
        ['02', 'Window robustness', 'Window A, Window B and combined figures discourage single-period selection.'],
        ['03', 'Gate discipline', 'Pending statistical, state and forward gates remain visible in status text.'],
        ['04', 'Version governance', 'Leading, frozen, superseded and guard allocations are explicitly separated.'],
      ],
      visual: `
        <figure class="showcase-report-shot">
          <a href="chart-shots/strategy-frontiers.png" target="_blank" rel="noopener" aria-label="Open the full-resolution strategy frontier capture">
            <img src="chart-shots/strategy-frontiers.png" alt="Five public strategy return risk and drawdown frontiers" loading="eager">
          </a>
          <figcaption><b>Actual report capture</b><span>Five public strategies · window A, window B and combined return / risk / drawdown</span></figcaption>
        </figure>`,
      proof: 'All performance values are historical public figures. Several candidates explicitly retain pending forward or state gates; those caveats are part of the quality story, not fine print to remove.',
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
    ];
    document.querySelectorAll('.grid > a.card').forEach((card, index) => {
      const [view, action] = cardLabels[index] || ['EVIDENCE VIEW', 'Open report →'];
      card.insertAdjacentHTML('beforeend', `<div class="showcase-card-meta"><span>${view}</span><strong>${action}</strong></div>`);
    });
  }
})();
