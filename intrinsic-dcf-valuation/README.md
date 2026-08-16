# Discounted Cash Flow Valuation

**Live Demo**: [https://vinovator.github.io/my-ai-tools/intrinsic-dcf-valuation/index.html](https://vinovator.github.io/my-ai-tools/intrinsic-dcf-valuation/index.html)

A guided, step-by-step discounted cash flow workbench. Enter today's figures, forecast ten years of free cash flow, discount it back, and see what the business is worth, plus what you would have to believe for the market price to make sense.

## Overview

Seven numbered steps down a single page, each opening with a short note on why the step exists rather than how to fill it in. The arithmetic is the easy part of a DCF; the judgement is the hard part, so the tool spends its words on the judgement.

Every figure that can be wrong carries a sentence telling you how you would know, and a severity ladder of notes, warnings and hard stops catches the errors that quietly invalidate an answer.

## Key Features

### Cost of capital, built not assumed
Risk-free rate, beta, equity risk premium and cost of debt combine into a WACC, with a separate terminal WACC where beta drifts to one. The worked example produces 8.69%.

### A ten-year fade, not a single growth rate
Revenue growth, operating margin, tax rate and return on invested capital each fade in a straight line from a year-one value to a year-ten value. Reinvestment is derived from growth and return, so the model cannot quietly assume growth that nobody paid for.

### Two terminal values
A plain perpetuity and a reinvestment-consistent version. They only disagree when the return on capital after year ten differs from the year-ten figure, which is exactly the point. Set the terminal return equal to the terminal WACC and growth is worth precisely nothing.

### Where the value comes from
A split bar showing how much of the enterprise value sits in the first ten years and how much beyond them, with a per-year bar chart of present values. On the worked example 56% sits after year ten, and the tool says so, because a valuation dominated by its terminal value is a view on assumptions rather than on a forecast.

### Sensitivity
A grid of value per share across WACC and long-run growth, with the current combination outlined.

### The verdict
A fixed bar reads value per share against the market price and names the gap, with a note that tells you what to do with it rather than congratulating you. The worked example, Marks and Spencer, comes out at 289p against a 356p quote.

## A note on units

Share price goes in whatever unit it is quoted in and the price-units field reconciles it with accounts in millions. A London price in pence against sterling millions means 100. Per-share outputs are then expressed in the price's unit, and the tool is careful not to label pence as pounds.

## Tech

- Single self-contained `index.html`, all CSS and JS inline
- No libraries, no CDN, no build step
- ES5 throughout, a single global state object, and a two-tier render so focus is never lost mid-typing
- Data is CSV: one sectioned format for the blank template, for saving and for loading
- State persists to `localStorage` under `cftr_dcf_v1`
- Toolshelf back-link to the rest of the collection

## Usage

Open `index.html` in any modern browser. Load the worked example, or download the template, fill it in and load it back.

## Disclaimer

Illustrative maths, not investment advice. The worked example uses rounded, illustrative figures; check them against the annual report before relying on the answer. A DCF is only ever as good as the assumptions you feed it.
