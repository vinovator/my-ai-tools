# Vinoth's AI Tools

Self-contained browser tools for finance, learning and everyday tasks. No installs, no accounts, and nothing leaves your device.

**Live Demo**: <a href="https://vinovator.github.io/my-ai-tools/index.html" target="_blank">https://vinovator.github.io/my-ai-tools/index.html</a>
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

Every tool is a single HTML file with its CSS and JavaScript inline. There is no build step, no package manager and no backend: open any `index.html` directly in a browser and it works. The portal groups the tools the same way this page does, and follows your system light or dark preference with a toggle to override it.

---

## Finance and valuation

Four step-by-step workbenches plus a savings calculator. They share one design: numbered steps down a single page, a fixed verdict bar, a worked example, and CSV for the blank template, for saving and for loading alike, so your data opens directly in Excel, Numbers or Sheets.

### [Mortgage Cost Calculator](./mortgage/README.md)
The monthly payment is the advertised number. This works out the real one.
- **The fix expiry cliff:** the payment recalculated on the remaining balance over the remaining term. On the worked example it jumps 30.8% the month the fix ends.
- **Amortisation made visible:** interest against principal for every year, with the year principal finally overtakes interest marked on the chart.
- **Overpayments:** monthly and lump sum, with the annual allowance checked and the term shortened rather than the payment cut.
- **Fee against rate:** an exact crossover loan size, because cost is linear in the amount borrowed.

### [Term Sheet Exit Waterfall](./term-sheet/README.md)
What a venture round actually costs you, which appears nowhere on the term sheet itself.
- **The option pool shuffle:** take the pool from the pre-money and you fund all of it; the effective valuation drops accordingly.
- **The preference stack:** multiples, participation, caps, and stacked or pari passu seniority.
- **The exit waterfall:** who gets paid across every exit value, with the dead zone where ordinary shares get nothing and each conversion point marked.
- **Founder proceeds by structure:** at a £12m exit a clean 1x returns £3.6m where a 2x participating returns nothing.

### [Discounted Cash Flow Valuation](./intrinsic-dcf-valuation/README.md)
Forecast ten years of free cash flow, discount it back, and see what you would have to believe for the market price to hold.
- **Cost of capital built, not assumed:** WACC from its parts, with a separate terminal WACC where beta drifts to one.
- **A ten-year fade:** growth, margin, tax and return on capital each fade from a year-one to a year-ten value, with reinvestment derived rather than assumed.
- **Two terminal values:** a plain perpetuity and a reinvestment-consistent one, which disagree exactly when they should.
- **Where the value sits:** how much lies beyond year ten, because a valuation dominated by its terminal value is a view on assumptions.

### [Peer Multiples Valuation](./relative-valuation/README.md)
Value a company against its peers on the multiples that actually fit.
- **The consistency test:** eight multiples, each marked pass or fail with the reason. Two of them deliberately fail and are explained rather than omitted.
- **The spread, not just the average:** quartiles, standard deviation and variation, so you can watch the median and the mean diverge.
- **Dropped peers reported:** a missing or negative denominator drops that peer from that multiple only, and the tool says so.
- **A value scale:** every multiple plotted on one axis against today's price.

### [Compound Investment Calculator](./compound-viz/README.md)
A calm what-if for your savings. Drag the sliders and watch the pot grow.
- **Six sliders:** lump sum, monthly contribution, return, inflation, current age, retirement age.
- **Two readings at all times:** the nominal pot and the same pot in today's money.
- **Goal-seek mode:** set a target and the calculator solves for the monthly contribution required.
- **Live canvas chart:** nominal line, today's-money line, and total contributed area, redrawn on drag.

---

## Learning and visualisation

### [Protocol Lab](./protocol-lab/README.md)
An interactive, animated explainer for foundational internet protocols. Pick a scenario, press play, watch packets fly.
- **Five scenarios:** DNS lookup, TCP handshake and teardown, HTTP request/response, TLS 1.3 handshake, and a composite that chains all four end to end.
- **Inspectable payloads:** pretty-printed protocol fields for DNS/TCP/TLS; raw coloured HTTP bytes with `\r\n` markers exposed.
- **Transport bar:** play, pause, step, scrub, speed; toggle scenario parameters such as a cache hit or a dropped first SYN and re-watch.
- **Layer stack panel:** the five-layer TCP/IP stack lights up at each step, and any layer explains itself in context.
- **Glossary with inline tooltips:** 25 terms, hover any underlined word in the narration.

### [Fourier Audio Lab + AI](./fourier-lab/README.md)
Interactive signal processing and AI playground.
- **Synthesis:** build sounds by mixing sine wave harmonics.
- **Visualization:** real-time waveform and FFT frequency spectrum displays.
- **AI classification:** train a neural network in-browser to recognise instrument timbres from their harmonic fingerprints.

### [Trigonometry Visualized](./trig-viz/README.md)
An interactive unit circle explorer designed to build intuition for trigonometric concepts.
- **Interactive unit circle:** manipulate angles to see sine, cosine and tangent in real time.
- **Step-by-step lessons:** guided explanations of core concepts.
- **Wave visualization:** connects circular motion to sine waves.

### [Chi-Square Goodness of Fit Tool](./goodness-of-fit/README.md)
A dedicated statistical calculator for running Chi-Square goodness of fit tests on your own data.
- **Data import:** CSV and Excel uploads, or manual entry.
- **Analysis:** instant test statistic, p-value and critical value.
- **Visualization:** interactive distribution curves and bar charts.

### [Chi-Square Goodness of Fit Explorer](./chi-square-viz/README.md)
Interactive platform for mastering statistical hypothesis testing.
- **Visual learning:** dynamic distribution curves and frequency charts.
- **Real-world scenarios:** genetics, fair dice and market research presets.
- **Guided tutorials:** step-by-step walkthroughs of the testing process.

### [Interactive Tariff Economics Platform](./tariff-viz/README.md)
A comprehensive educational tool designed as an interactive textbook, visualising the impact of tariffs on local markets.
- **Interactive simulations:** real-time supply and demand adjustments.
- **Guided learning:** step-by-step tutorials and a glossary.
- **Scenario mode:** preset real-world examples such as the steel industry.
- **Impact analysis:** winners and losers panels, and quizzes.

### [Anthropic Viz](./anthropic-viz/README.md)
Experimental HTML/JS visualizations illustrating how AI transforms engineering work, inspired by Anthropic's research on productivity patterns. Includes sets of animated xenographic charts.

---

## Utilities

### [Markdown Viewer](./md-viewer/README.md)
Drop a `.md` file and view it rendered. Your files never leave your tab.
- **Rich rendering:** GFM tables, task lists, syntax-highlighted code, KaTeX maths and Mermaid diagrams.
- **One-click export:** print or save as PDF, download as portable HTML, or copy rendered HTML to the clipboard.
- **Local-only:** marked, DOMPurify, KaTeX and Mermaid loaded from CDN; nothing is uploaded or persisted.

### [MCP Unpack](./mcp-unpack/README.md)
Paste any remote MCP server URL and render a clean, shareable reference of every tool, resource and prompt it exposes: the npm package page, but for an MCP server.
- **Read-only inspector:** function-signature view per tool, expandable schema tree, per-section search.
- **Copy as Markdown:** export the full spec for READMEs, Notion pages or Slack.
- **Browser-only:** hand-rolled JSON-RPC client over the Streamable HTTP transport. No build step, no backend, no tracking.

### [PDF Merge & Split](./pdf-play/README.md)
A privacy-first browser tool for everyday PDF wrangling. Files never leave your tab.
- **Merge:** combine several PDFs into one, in the order you arrange them.
- **Split:** partition a PDF at chosen page numbers, with a live preview of the resulting parts.
- **Local-only:** no upload, no analytics, no persistence. Runs entirely in-browser using pdf-lib and JSZip.

---

## Licence

MIT. The finance tools are illustrative and are not financial advice.
