# Mortgage Cost Calculator

**Live Demo**: [https://vinovator.github.io/my-ai-tools/mortgage/index.html](https://vinovator.github.io/my-ai-tools/mortgage/index.html)

The monthly payment is the advertised number. This works out the real one: how much of each early payment is pure interest, what happens on the day the fixed rate ends, what an overpayment actually buys, and the exact loan size at which a fee-carrying low rate overtakes a fee-free one.

## Overview

You are not buying a payment. You are renting money, and the rent is charged on the balance, which is why the early years are almost all interest. Everything on the page derives from a single month-by-month simulation, so the chart, the overpayment saving and the fee comparison can never disagree with one another.

The tool models the thing most calculators leave out: **the fix expiring**. UK mortgages are quoted on a two or five year fix and then revert. At revert the lender recalculates the remaining balance over the remaining term, which is what produces the payment cliff.

## Key Features

### The fix expiry cliff
On the worked example the payment jumps from about £1,251 to about £1,635 the month the fix ends, a rise of 30.8%. That, not today's quote, is the figure a budget has to survive. The tool warns whenever the jump exceeds 20%.

### Amortisation, made visible
An inline SVG chart stacks interest against principal for every year of the term. Year one of the worked example is 59% interest, and the year principal finally overtakes interest is marked on the chart. A second mode plots the balance remaining, with a dashed baseline showing where you would have been without overpaying.

### Overpayments
Monthly overpayments and a one-off lump sum, with the annual allowance checked. Overpayments shorten the term rather than cut the payment, which is the usual default and the one that saves more. The early repayment charge is deliberately not modelled, because it varies by lender; the tool says so instead of inventing a number.

### Fee against rate
Two deals compared over the same window, where cost is the fee plus the interest it and the loan accrue. Equity built is not a cost, so it stays out of the comparison. Because that is linear in the loan, the crossover is exact rather than searched for. For 4.5% with a £1,499 fee against 4.9% fee-free over two years it lands at about £188,700: below that the fee-free deal wins, above it the low-rate one does.

### Rate against term
A sensitivity grid of total interest across rate and term, holding one rate throughout so the two variables are the only things moving. It shows plainly that a longer term is not a cheaper mortgage, it is a smaller payment and a much larger bill.

## Tech

- Single self-contained `index.html`, all CSS and JS inline
- No libraries, no CDN, no build step; the chart is hand-built inline SVG
- ES5 throughout, a single global state object, and a two-tier render so focus is never lost mid-typing
- Data is CSV: one sectioned format for the blank template, for saving and for loading, which opens directly in Excel, Numbers and Sheets
- State persists to `localStorage` under `cftr_mortgage_v1`
- Toolshelf back-link to the rest of the collection

## Usage

Open `index.html` in any modern browser. Load the worked example to see the shape, or download the template, fill it in and load it back.

## Disclaimer

Illustrative maths, not financial advice. The early repayment charge is not modelled, and real offers carry conditions this does not capture. Check any figure against your actual mortgage offer before relying on it.
