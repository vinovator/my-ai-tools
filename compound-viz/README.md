# Compound Investment Calculator

**Live Demo**: [https://vinovator.github.io/my-ai-tools/compound-viz/index.html](https://vinovator.github.io/my-ai-tools/compound-viz/index.html)

A calm what-if calculator for your savings. Drag the sliders and watch the pot grow on a live canvas chart, with side-by-side readings for the nominal pot and the same pot in today's money.

## Overview

A single-file interactive tool for exploring monthly-compounded investment growth. Built for the pleasure of dragging things and seeing numbers respond — not for serious financial planning. Two readings sit side-by-side at all times: the nominal pot (the eye-watering number on paper) and the same pot in today's money (after inflation has had its way with it).

## Key Features

### Two modes
- **Forward** *(default)* — drag any of the six sliders to see how the projected pot changes.
- **Goal-seek** — set a target final pot (nominal or in today's money) and the calculator solves for the **monthly contribution** required, given the other parameters. The Monthly slider becomes a read-only computed output; drag any other slider and the required monthly recalculates live.

### Inputs (six sliders)
- **Starting lump sum**: £0 – £500,000
- **Monthly contribution**: £0 – £2,000 *(driven by the solver in Goal-seek mode)*
- **Annual return**: 0 – 12 %
- **Inflation**: 0 – 6 %
- **Current age**: 0 – 80
- **Retirement age**: 0 – 100 (auto-clamped to ≥ current age)

### Live output
- Two big headline numbers — **On paper** (nominal) and **In today's money** (inflation-adjusted)
- Canvas line chart: nominal pot (solid green), the same pot in today's money (dashed sand), and total contributed (shaded area)
- Stat row: total contributed, growth, and the contribution multiple (e.g. `4.32×`)
- Branded top ribbon with a Toolshelf back-link to the rest of the collection

### Design
- Calm financial palette: dark green and cream, with sand accents
- Serif headings (Playfair Display) over Inter body text, tabular figures throughout
- Two-column layout on desktop; single-column on mobile with larger touch targets
- Smooth live updates on slider drag via `requestAnimationFrame`

## Tech

- Single self-contained `index.html` — all CSS and JS inline
- No JavaScript libraries; chart drawn directly on `<canvas>` with hi-DPI handling
- No `localStorage`, no analytics, no network calls (apart from the Google Fonts stylesheet)

## Usage

Open `index.html` in any modern browser. No build step, no server, no install.

## Disclaimer

Illustrative maths, not financial advice. Returns and inflation are assumed constant — a polite fiction. Past performance, as they say, is no guarantee of future results.
