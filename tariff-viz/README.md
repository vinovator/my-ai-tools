# Interactive Tariff Economics Platform

**Live Demo**: [https://vinovator.github.io/my-ai-tools/tariff-viz/index.html](https://vinovator.github.io/my-ai-tools/tariff-viz/index.html)

An educational, interactive web tool designed to look and feel like a "living textbook" chapter. It allows users to visualize and experiment with the economic effects of tariffs on local markets, supply, and demand.

## Overview
This tool goes beyond simple charting to provide a guided learning experience. Users can explore how tariffs transfer wealth, create inefficiencies (deadweight loss), and impact different groups in the economy through interactive simulations, real-world presets, and guided tutorials.

## Key Features

### 1. Visual Clarity & Analysis
- **Dynamic Supply & Demand Charts**: Real-time rendering of equilibrium shifts.
- **Before & After Comparison**: Side-by-side charts showing the market state with and without tariffs.
- **Impact Analysis**: "Winners & Losers" panel that clearly identifies who benefits (Producers, Government) and who pays (Consumers, Efficiency).
- **Visual Annotations**: Color-coded areas for Consumer/Producer Surplus, Revenue, and Deadweight Loss.

### 2. Guided Learning
- **Interactive Tutorial**: Step-by-step walkthrough explaining the graph components and economic concepts.
- **Real-World Scenarios**: One-click presets for common situations like "Steel Industry", "Agricultural Products", or "Inelastic Demand".
- **Glossary**: Built-in definitions for key economic terms.
- **Tooltips**: Contextual help for every metric and control.

### 3. Interactivity
- **Simulation Controls**: Adjust Tariff rates, World Price, and Supply/Demand slopes.
- **Animations**: Watch the market adjust in real-time with the "Play Animation" feature.
- **Quiz Mode**: Test your understanding with an integrated multiple-choice quiz.
- **Portable**: Entirely self-contained in a single `index.html` file (no server required).

## Usage
Simply open `index.html` in any modern web browser.

## Generation Prompt (Claude 3.5 Sonnet)
This application was generated using the following prompt:

> Create an interactive tariff visualization with these educational features:
>
> 1. VISUAL CLARITY:
>    - Add clear annotations directly on the chart labeling each area (consumer surplus, producer surplus, deadweight loss, government revenue)
>    - Use arrows and callouts to highlight changes when toggling tariff on/off
>    - Show imports as a distinct visual element (colored bar or arrow)
>    - Add a mini-chart showing before/after side-by-side
>
> 2. GUIDED LEARNING:
>    - Include a tutorial mode that walks through step-by-step
>    - Add preset scenarios with real-world context (e.g., "Steel Industry - 25% Tariff")
>    - Show "Winners & Losers" panel summarizing who gains/loses with icons
>    - Include tooltips (?) next to every metric explaining economic concepts
>
> 3. INTERACTIVE ELEMENTS:
>    - "Play Animation" button showing market adjusting to tariff over time
>    - Highlight changes in metrics (flash green for gains, red for losses)
>    - Add scenario comparison mode (compare two different tariff levels)
>    - Include quiz questions to test understanding
>
> 4. EDUCATIONAL CONTENT:
>    - Expandable glossary of economic terms
>    - Real-world examples dropdown with historical tariffs
>    - "What if?" scenarios users can explore
>    - Summary panel explaining the economic intuition
>
> Make it feel like an interactive textbook chapter, not just a calculator.
