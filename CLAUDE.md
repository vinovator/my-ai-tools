# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

A collection of self-contained interactive educational tools deployed to GitHub Pages at `https://vinovator.github.io/my-ai-tools/`. The root `index.html` is a portal linking to each tool.

## Development

**No build step, no package manager.** Every tool is a single HTML file (or a small set of HTML files) with all CSS and JS inline. Open any `index.html` directly in a browser to develop locally. There are no npm scripts, no transpilation, and no server required.

To preview changes, open the file directly:
```
open trig-viz/index.html
open fourier-lab/index.html
```

## Architecture

### Self-Contained Single-File Tools

Each subdirectory is an independent tool. All CSS lives in `<style>` tags and all JavaScript in `<script>` tags within the same HTML file. External libraries are loaded via CDN — never installed locally.

### React Tools (trig-viz, fourier-lab)

These two tools use React 18 + Babel Standalone loaded from CDN, enabling JSX compilation in the browser without a build step. The pattern:

```html
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/babel">
  // JSX here
</script>
```

Canvas rendering in these tools handles device pixel ratio explicitly for retina displays.

### Chart.js Tools (tariff-viz, chi-square-viz)

Use Chart.js (loaded via CDN) for interactive bar/line charts. `tariff-viz` uses Chart.js 4.4.0 with the Annotation plugin; `chi-square-viz` uses 3.9.1.

### Plotly + Statistics Tool (goodness-of-fit)

Uses Plotly.js 2.27.0, SheetJS (xlsx 0.18.5) for CSV/Excel import, and jStat 1.9.6 for statistical calculations — all via CDN.

### Custom Neural Network (fourier-lab)

`fourier-lab` contains a hand-rolled neural network (`TinyNet` class) with forward pass (ReLU + Softmax), backpropagation, and in-browser training. No ML library is used.

## Tool Summary

| Directory | Description | Key Libraries |
|-----------|-------------|---------------|
| `trig-viz/` | Interactive unit circle / sine wave explorer | React 18, Canvas API |
| `fourier-lab/` | Additive synthesis + Fourier viz + in-browser AI training | React 18, Canvas API, custom TinyNet |
| `tariff-viz/` | Supply/demand tariff economics simulator | Chart.js 4.4 + Annotation plugin |
| `chi-square-viz/` | Chi-Square hypothesis testing explorer | Chart.js 3.9 |
| `goodness-of-fit/` | Chi-Square calculator with CSV/Excel import | Plotly.js, SheetJS, jStat |
| `anthropic-viz/` | Animated charts visualizing AI productivity at Anthropic | Vanilla JS/CSS |
| `pdf-play/` | Placeholder (empty) | — |

## Shared Conventions

- CSS custom properties (variables) are used for all theming and color palettes — define at `:root` and reference throughout.
- Educational tools follow a consistent UX pattern: tutorial/guided mode, interactive scenarios, glossary with tooltips, quiz mode, and a "What does this mean?" interpretation panel.
- Two-column layout is standard: sidebar with controls on the left, main visualization on the right.
- Fonts are loaded from Google Fonts: Inter (UI), JetBrains Mono / IBM Plex Mono (code/data display).

## Deployment

Push to `main` — GitHub Pages auto-deploys. No CI/CD configuration file exists in the repo.
