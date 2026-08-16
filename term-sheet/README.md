# Term Sheet Exit Waterfall

**Live Demo**: [https://vinovator.github.io/my-ai-tools/term-sheet/index.html](https://vinovator.github.io/my-ai-tools/term-sheet/index.html)

Model what a venture round actually costs you. Set the pre-money, decide who pays for the option pool, build the preference stack, then watch the exit waterfall decide who gets paid and in what order, including the exits where ordinary shares get nothing at all.

## Overview

A term sheet is the one financial document where the headline number actively misleads. A discounted cash flow is hard to estimate but trivial to compute. A term sheet is the reverse: the arithmetic is genuinely tangled, and the answer to "what do I actually walk away with?" appears nowhere on the page.

A £15m pre-money with a 2x participating preference is usually worse for a founder than a £12m pre with a clean 1x non-participating, across most exit values. Nobody can see that by reading. A chart shows it immediately.

The idea the tool exists to teach: **ordinary stock is a call option struck at the preference stack.** Below the stack you get nothing. Above it you get your percentage.

## Key Features

### The option pool shuffle
Take the new pool out of the pre-money and the investor keeps their full nominal stake while the existing shareholders fund the whole pool. On the worked example a £18m headline pre-money becomes an effective £17.2m. Take it from the post-money instead and everyone shares the dilution. One toggle, and the price per share moves.

### The preference stack
Repeatable rows, one per share class: amount invested, shares, preference multiple, participation and cap. Seniority is either stacked, where the newest round is paid in full first, or pari passu, where a shortfall is shared pro rata. Off-market terms are flagged as you build them.

### The exit waterfall
The centrepiece. An inline SVG stacked area chart sweeps exit value from zero upward and shows what each class receives. Two annotations do the teaching: the shaded dead zone where ordinary shares receive nothing, and the point at which a non-participating class stops taking its preference and converts.

The engine resolves the conversion decision as a fixed point, because whether one class is better off converting depends on who else has converted, and it redistributes when a capped participating class hits its ceiling.

### Founder proceeds by structure
A sensitivity grid across exit value and preference structure. At a £12m exit a clean 1x returns founders £3.6m where a 2x participating returns nothing at all. This is the table to take into the negotiation.

## Tech

- Single self-contained `index.html`, all CSS and JS inline
- No libraries, no CDN, no build step; the chart is hand-built inline SVG
- ES5 throughout, a single global state object, and a two-tier render so focus is never lost mid-typing
- Data is CSV: one sectioned format for the blank template, for saving and for loading
- State persists to `localStorage` under `cftr_termsheet_v1`
- Toolshelf back-link to the rest of the collection

Verified against a suite that asserts, among other invariants, that payouts sum exactly to the exit value across a 401-point sweep.

## Scope

Priced equity rounds only. SAFEs and convertible notes, anti-dilution on a down round, and the non-economic terms such as board composition and drag-along are out of scope. This is a modelling surface, not a cap-table system of record.

## Usage

Open `index.html` in any modern browser. Load the worked example, or download the template, fill it in and load it back.

## Disclaimer

Illustrative maths, not legal or financial advice. Real term sheets carry terms this does not model. Have a lawyer read yours.
