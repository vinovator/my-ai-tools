# Vinoth's AI Tools

A collection of AI-powered tools, experiments, and visualizations.

**Live Demo**: <a href="https://vinovator.github.io/my-ai-tools/index.html" target="_blank">https://vinovator.github.io/my-ai-tools/index.html</a>
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Projects

### [Protocol Lab](./protocol-lab/README.md)
An interactive, animated explainer for foundational internet protocols. Pick a scenario, press play, watch packets fly.
- **Five scenarios:** DNS lookup, TCP handshake & teardown, HTTP request/response, TLS 1.3 handshake, and a composite "Open https://example.com" that chains all four end-to-end.
- **Inspectable payloads:** pretty-printed protocol fields for DNS/TCP/TLS; raw colored HTTP bytes with `\r\n` markers exposed for HTTP.
- **Transport bar:** play / pause / step / scrub / speed; click the canvas to pause; toggle scenario parameters (cache hit, drop the first SYN) and re-watch.
- **Layer stack panel** *(composite scenario)*: five-layer TCP/IP stack lights up at each step; click any layer for an in-context explanation. A phase indicator above the canvas lets you jump between the DNS / TCP / TLS / HTTP phases.
- **Glossary with inline tooltips:** 25 terms, hover any underlined word in the narration for a definition.

### [Compound Investment Calculator](./compound-viz/README.md)
A calm, single-page what-if for your savings — drag the sliders and watch the pot grow.
- **Six sliders:** lump sum, monthly contribution, return, inflation, current age, retirement age.
- **Two readings at all times:** the nominal pot and the same pot in today's money (after inflation).
- **Live canvas chart:** nominal line, today's-money line, and total contributed area, all redrawn on drag.
- **Calm financial design:** dark green and cream, serif headings, branded top ribbon with a Toolshelf back-link.

### [Markdown Viewer](./md-viewer/README.md)
Drop a `.md` file and view it rendered. Your files never leave your tab.
- **Rich rendering:** GFM tables, task lists, syntax-highlighted code (highlight.js), KaTeX math, and Mermaid diagrams.
- **One-click export:** Print / Save as PDF, download as portable HTML, or copy rendered HTML to clipboard.
- **Local-only:** marked + DOMPurify + KaTeX + Mermaid loaded from CDN; nothing is uploaded or persisted.

### [MCP Unpack](./mcp-unpack/README.md)
Paste any remote MCP server URL and render a clean, shareable reference of every tool, resource, and prompt it exposes: "the npm package page, but for an MCP server."
- **Read-only inspector:** Function-signature view per tool, expandable schema tree, per-section search.
- **Copy as Markdown:** Export the full spec to your clipboard for READMEs, Notion pages, or Slack.
- **Browser-only:** Hand-rolled JSON-RPC client over the Streamable HTTP transport. No build step, no backend, no tracking.

### [PDF Merge & Split](./pdf-play/README.md)
A privacy-first browser tool for everyday PDF wrangling. Files never leave your tab.
- **Merge:** Combine 1+ PDFs into one output, in the order you arrange them.
- **Split:** Partition a PDF into 2+ documents at chosen page numbers, with a live preview of the resulting parts.
- **Local-only:** No upload, no analytics, no persistence. Runs entirely in-browser using pdf-lib and JSZip.

### [Fourier Audio Lab + AI](./fourier-lab/README.md)
Interactive signal processing and AI playground.
- **Synthesis:** Build sounds by mixing sine wave harmonics.
- **Visualization:** Real-time Waveform and FFT (Frequency Spectrum) displays.
- **AI Classification:** Train a neural network in-browser to recognize instrument timbres from their harmonic fingerprints.

### [Trigonometry Visualized](./trig-viz/README.md)
An interactive unit circle explorer designed to build intuition for trigonometric concepts.
- **Interactive Unit Circle**: Manipulate angles to see sine, cosine, and tangent in real-time.
- **Step-by-Step Lessons**: Guided explanations of core concepts.
- **Wave Visualization**: Connects circular motion to sine waves.

### [Chi-Square Goodness of Fit Tool](./goodness-of-fit/README.md)
A dedicated statistical calculator tool for performing Chi-Square Goodness of Fit tests on your own data.
- **Data Import**: Support for CSV/Excel uploads and manual entry.
- **Analysis**: Instant calculation of Test Statistic, P-Value, and Critical Value.
- **Visualization**: Interactive distribution curves and bar charts.

### [Chi-Square Goodness of Fit Explorer](./chi-square-viz/README.md)
Interactive platform for mastering statistical hypothesis testing. Features:
- **Visual Learning**: Dynamic distribution curves and frequency charts.
- **Real-World Scenarios**: Genetics key, Fair Dice, and Market Research presets.
- **Guided Tutorials**: Step-by-step walkthroughs of the testing process.

### [Interactive Tariff Economics Platform](./tariff-viz/README.md)
A comprehensive educational tool designed as an "interactive textbook". Visualizes the impact of tariffs on local markets with features including:
- **Interactive Simulations**: Real-time supply/demand adjustments.
- **Guided Learning**: Step-by-step tutorials and glossary.
- **Scenario Mode**: Preset real-world examples (e.g., Steel Industry).
- **Impact Analysis**: "Winners & Losers" panels and quizzes.

### [Anthropic Viz](./anthropic-viz/README.md)
Experimental HTML/JS visualizations illustrating how AI transforms engineering work, inspired by Anthropic's research on productivity patterns.
Includes sets of animated "Xenographic" charts.

---

*More tools coming soon...*
