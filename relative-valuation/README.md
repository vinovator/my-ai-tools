# Peer Multiples Valuation

**Live Demo**: [https://vinovator.github.io/my-ai-tools/relative-valuation/index.html](https://vinovator.github.io/my-ai-tools/relative-valuation/index.html)

Value a company against its peers. Pick the multiples that actually fit, enter the target and a set of comparables, and get a fair-value range with built-in sanity checks for the single most common error: mixing time periods across peers.

## Overview

Relative valuation looks easy and is quietly full of traps. Most of them come from pairing a numerator and a denominator that belong to different claimants, or from comparing a trailing figure for one company against a forward figure for another.

The tool is built around that. Its multiple picker deliberately includes two multiples that **fail** the consistency test and explains why, rather than quietly omitting them.

## Key Features

### The consistency test
Eight multiples, each marked pass or fail with a one-line reason. Price over earnings is consistent, because price belongs to shareholders and earnings after interest belong to shareholders. Price over EBITDA is not, because EBITDA is struck before lenders are paid, so a geared company looks cheap for no reason at all. Price over sales fails the same test and survives in practice for loss-makers, which the tool also says.

### Peers as a table
Add and remove comparable companies freely, tick any of them in or out of the calculation without deleting the row, and record in a free-text column why each one belongs. If you cannot write that sentence, it probably does not belong.

### The spread, not just the average
Minimum, first quartile, median, mean, third quartile, maximum, standard deviation and coefficient of variation for every active multiple. Multiples are skewed, so watch the median and the mean diverge: where they are far apart, the median is telling the truth. A wide spread is flagged, because it usually means the peer group is not comparable rather than that the company is cheap.

### Dropped peers are reported
A peer whose denominator is zero, negative or missing drops out of that multiple only, and the tool tells you how many dropped and why, instead of silently shrinking the sample.

### A value scale
Every multiple that produces a value is plotted on a single axis alongside today's price, with the central estimate marked, so the fair-value range is a picture rather than a table.

## A note on units

Per-share figures go in the same unit as the price; totals go in millions. The price-units field reconciles the two, so a London price in pence against sterling millions means 100. That default is set for you and matches what Clear All and the blank template produce.

## Tech

- Single self-contained `index.html`, all CSS and JS inline
- No libraries, no CDN, no build step
- ES5 throughout, a single global state object, and a two-tier render so focus is never lost mid-typing
- Data is CSV: one sectioned format for the blank template, for saving and for loading, with the peer table as a real spreadsheet table you can extend
- State persists to `localStorage` under `cftr_relval_v1`
- Toolshelf back-link to the rest of the collection

## Usage

Open `index.html` in any modern browser. Load the worked example, or download the template, fill it in and load it back.

## Disclaimer

Illustrative maths, not investment advice. The worked example uses rounded, illustrative figures; check them against the annual report before relying on the answer. A multiple tells you what the market pays for a peer, not what a business is worth.
