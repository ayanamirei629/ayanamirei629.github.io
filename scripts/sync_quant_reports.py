from __future__ import annotations

import argparse
import re
import shutil
from datetime import date
from pathlib import Path

import mistune


DEFAULT_SOURCE = Path(r"C:\Users\Yingge Hu\Desktop\quant\sector_flow_alpha")
DEFAULT_MONITOR = Path(r"C:\Users\Yingge Hu\Desktop\quant\monitor_stocks\outputs\charts\interactive_monitor_stocks.html")
REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = REPO_ROOT / "public" / "research"


def replace_report_links(markdown_text: str, names: dict[str, str]) -> str:
    replacements = {
        "../MARKET_DASHBOARD.html": names["market"],
        "../../monitor_stocks/outputs/charts/interactive_monitor_stocks.html": names["monitor"],
        "STRATEGY_MASTER_REPORT.md": names["strategy"],
        "AI_P0_RESEARCH_REPORT.md": names["ai"],
        "MACRO_MARKET_REPORT.md": names["macro"],
        "DAILY_STOCK_REPORT.md": names["daily"],
        "golden_finger.html": names["golden"],
        "../QUANT_REPORT_PORTAL.html": names["portal"],
        "../../sector_flow_alpha/QUANT_REPORT_PORTAL.html": names["portal"],
    }
    for old, new in replacements.items():
        markdown_text = markdown_text.replace(old, new)
    return markdown_text


def inject_showcase(html: str, names: dict[str, str], version: str) -> str:
    html = html.replace("../../../sector_flow_alpha/QUANT_REPORT_PORTAL.html", names["portal"])
    html = html.replace("../../../sector_flow_alpha/outputs/AI_P0_RESEARCH_REPORT.md", names["ai"])
    html = html.replace("QUANT_REPORT_PORTAL.html", names["portal"])
    css = f'<link rel="stylesheet" href="model-showcase.css?v={version}">'
    script = f'<script src="model-showcase-current.js?v={version}" defer></script>'
    if "model-showcase.css" not in html:
        html = html.replace("</head>", f"{css}</head>", 1)
    if "model-showcase-current.js" not in html:
        html = html.replace("</body>", f"{script}</body>", 1)
    return html


def render_markdown_page(
    source_file: Path,
    output_file: Path,
    title: str,
    data_date: str,
    publish_date: str,
    names: dict[str, str],
    version: str,
) -> None:
    markdown_text = replace_report_links(source_file.read_text(encoding="utf-8"), names)
    renderer = mistune.create_markdown(escape=False, plugins=["table", "strikethrough", "url"])
    content = renderer(markdown_text)
    html = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title><link rel="stylesheet" href="report-source.css?v={version}"><link rel="stylesheet" href="model-showcase.css?v={version}"></head>
<body><main><header class="report-header"><div><h1>{title}</h1><p>Published {publish_date} · market data through <b>{data_date}</b></p></div><a href="{names['portal']}">Back to report portal</a></header>
<article class="markdown-body">{content}</article>
<footer class="report-footer">Research output, not investment advice. Historical and shadow results are not promises of future performance.</footer></main>
<script src="model-showcase-current.js?v={version}" defer></script></body></html>'''
    output_file.write_text(html, encoding="utf-8")


def build_portal(names: dict[str, str], data_date: str, publish_date: str, version: str) -> str:
    cards = [
        (names["market"], "Interactive Market & AI-P0 Dashboard", "SPX, sentiment, regimes, risk interval, current 1× frontier, equity and drawdown."),
        (names["daily"], "Daily Stock Intelligence", "130-name cross-sectional ranking, current public signals, levels and model gates."),
        (names["monitor"], "Interactive Monitor Stocks", "Searchable candlestick histories, state filters, signal evidence and entry readiness."),
        (names["strategy"], "Current Strategy Results", "Historical-unseen frontiers, drawdown, shadow allocations and forward gates."),
        (names["golden"], "Golden Finger × AI-P0 Paper Execution", "Frozen paper allocation, current stock targets and execution evidence."),
        (names["macro"], "Macro & Market Decision", "Regime probabilities, sentiment, sector cross-section and production decision."),
        (names["ai"], "AI-P0 Development Audit", "Optimization progress, rejected branches, bottlenecks and frozen validation plan."),
    ]
    card_markup = "".join(
        f'<a class="card" href="{href}"><h2>{title}</h2><p class="muted">{description}</p></a>'
        for href, title, description in cards
    )
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Quant research · current public report portal</title><style>:root{{--bg:#0b1020;--panel:#111a2e;--text:#eef3ff;--muted:#9caac5;--border:#2a3856;--accent:#66a3ff}}*{{box-sizing:border-box}}body{{margin:0;background:var(--bg);color:var(--text);font:14px/1.5 Inter,Segoe UI,Arial,sans-serif}}main{{max-width:1320px;margin:auto;padding:24px}}header{{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;flex-wrap:wrap}}h1{{margin:0;font-size:25px}}h2{{font-size:18px;margin:0 0 5px}}.muted,footer{{color:var(--muted)}}.grid{{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:16px}}.card{{background:var(--panel);color:var(--text);border:1px solid var(--border);border-radius:10px;padding:14px;min-width:0;text-decoration:none}}.card:hover{{border-color:var(--accent)}}footer{{margin-top:20px;font-size:12px}}@media(max-width:680px){{main{{padding:14px}}.grid{{grid-template-columns:1fr}}}}</style><link rel="stylesheet" href="model-showcase.css?v={version}"></head>
<body><main><header><div><h1>Quant research · current public report portal</h1><div class="muted">Published <b>{publish_date}</b> · market data through <b>{data_date}</b></div></div></header><div class="grid">{card_markup}</div><footer>Seven current evidence views. Shadow research, paper execution and production authority are explicitly separated.</footer></main><script src="model-showcase-current.js?v={version}" defer></script></body></html>'''


def main() -> None:
    parser = argparse.ArgumentParser(description="Publish the latest local quant reports into the portfolio site.")
    parser.add_argument("--source", type=Path, default=DEFAULT_SOURCE)
    parser.add_argument("--monitor", type=Path, default=DEFAULT_MONITOR)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--publish-date", default=date.today().isoformat())
    args = parser.parse_args()

    portal_source = args.source / "QUANT_REPORT_PORTAL.html"
    if not portal_source.exists():
        raise FileNotFoundError(portal_source)
    portal_text = portal_source.read_text(encoding="utf-8")
    match = re.search(r"Data through</span><span[^>]*>[^<]*</span>\s*(\d{4}-\d{2}-\d{2})", portal_text)
    if not match:
        match = re.search(r"Data through.*?(\d{4}-\d{2}-\d{2})", portal_text, re.S)
    if not match:
        raise ValueError("Could not determine the latest market date from QUANT_REPORT_PORTAL.html")

    data_date = match.group(1)
    publish_date = args.publish_date
    version = publish_date.replace("-", "")
    args.output.mkdir(parents=True, exist_ok=True)

    names = {
        "portal": "quant-report-portal.html",
        "market": "market-dashboard.html",
        "daily": "daily-stock-report.html",
        "monitor": "interactive-monitor-stocks.html",
        "strategy": "strategy-report.html",
        "macro": "macro-market-report.html",
        "ai": "ai-p0-research-report.html",
        "golden": "golden-finger.html",
        "golden_dashboard": "golden-finger-paper-dashboard.html",
    }

    market_html = inject_showcase((args.source / "MARKET_DASHBOARD.html").read_text(encoding="utf-8"), names, version)
    (args.output / names["market"]).write_text(market_html, encoding="utf-8")

    monitor_html = inject_showcase(args.monitor.read_text(encoding="utf-8"), names, version)
    (args.output / names["monitor"]).write_text(monitor_html, encoding="utf-8")

    render_markdown_page(args.source / "outputs" / "DAILY_STOCK_REPORT.md", args.output / names["daily"], "Daily Stock Intelligence", data_date, publish_date, names, version)
    render_markdown_page(args.source / "outputs" / "STRATEGY_MASTER_REPORT.md", args.output / names["strategy"], "Current Strategy Results", data_date, publish_date, names, version)
    render_markdown_page(args.source / "outputs" / "MACRO_MARKET_REPORT.md", args.output / names["macro"], "Macro & Market Decision", data_date, publish_date, names, version)
    render_markdown_page(args.source / "outputs" / "AI_P0_RESEARCH_REPORT.md", args.output / names["ai"], "AI-P0 Development Audit", data_date, publish_date, names, version)

    golden_html = (args.source / "outputs" / "golden_finger.html").read_text(encoding="utf-8")
    golden_html = golden_html.replace("../QUANT_REPORT_PORTAL.html", names["portal"])
    golden_html = golden_html.replace("golden_finger_paper_dashboard.html", names["golden_dashboard"])
    (args.output / names["golden"]).write_text(golden_html, encoding="utf-8")
    shutil.copy2(args.source / "outputs" / "golden_finger_paper_dashboard.html", args.output / names["golden_dashboard"])

    (args.output / names["portal"]).write_text(build_portal(names, data_date, publish_date, version), encoding="utf-8")
    print(f"Published {len(names)} stable report artifacts for {publish_date}; market data through {data_date}.")


if __name__ == "__main__":
    main()
