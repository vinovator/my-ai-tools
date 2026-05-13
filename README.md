# Vinoth's AI Tools

A collection of AI-powered tools, experiments, and visualizations.

**Live Demo**: <a href="https://vinovator.github.io/my-ai-tools/index.html" target="_blank">https://vinovator.github.io/my-ai-tools/index.html</a>
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Projects

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
