# Chi-Square Goodness of Fit Explorer

**Live Demo**: [https://vinovator.github.io/my-ai-tools/chi-square-viz/index.html](https://vinovator.github.io/my-ai-tools/chi-square-viz/index.html)

An interactive educational platform designed to make hypothesis testing intuitive and engaging. This tool functions as an "interactive textbook chapter," guiding users through the concepts of Chi-Square Goodness of Fit testing using real-world scenarios and dynamic visualizations.

## Overview

This single-page application helps users understand how statistical testing works by visualizing the relationship between observed data, expected values, and the resulting statistical metrics. It breaks down complex concepts like Null Hpothesis, P-Value, and Critical Value into digestible, interactive components.

## Key Features

### 🎓 Guided Learning
- **Step-by-Step Tutorial**: A walkthrough mode that explains the hypothesis testing process from the initial question to the final decision.
- **Explicit Hypotheses**: A dedicated "Hypothesis Box" clear states the Null ($H_0$) and Alternative ($H_1$) hypotheses for every scenario.
- **Visual Intuition**: 
  - **Distribution Annotations**: Blue line marks your statistic, Red dashed line marks the critical value, and Red shading highlights the rejection region.
  - **Calculation Clarity**: "Total" row in the data table explicitly connects the sum of $(O-E)^2/E$ to the final Chi-Square Statistic.
- **Plain Language Tooltips**: Hover over any metric (e.g., P-Value, Degrees of Freedom) to see a simple, non-jargon explanation.
- **Glossary**: Built-in definitions for key statistical terms.
- **"What does this mean?"**: A dynamic summary panel that translates the statistical result into a real-world conclusion.

### 📊 Visualization & Analysis
- **Dynamic Charts**:
  - **Bar Chart**: Side-by-side comparison of Observed vs. Expected frequencies.
  - **Distribution Curve**: Visualizes the Chi-Square distribution to show where the test statistic falls relative to the critical region.
- **Detailed Data Table**: Breaks down the calculation (`(O-E)²/E`) row mathematically.
- **Real-Time Metrics**: Live updates for the $\chi^2$ Statistic, P-Value, and Critical Value.

### 🧪 Interactive Scenarios
- **Fair Dice Test**: Is a casino die biased?
- **Mendel's Genetics**: Do pea plants follow the 9:3:3:1 inheritance law?
- **Traffic Patterns**: Is traffic equally distributed throughout the week?
- **Market Share**: Do consumers prefer all brands equally?

### 🎮 Engagement
- **Simulation Animation**: "Play Animation" button to simulate data collection and watch metrics fluctuate in real-time.
- **Quiz Mode**: Test your understanding with an integrated multiple-choice quiz.

## Usage

Simply open `index.html` in any modern web browser. No installation or server is required.

## Generation Prompt

This application was generated using the following design prompt:

> Create an interactive chi-square goodness of fit educational platform as a single HTML file with:
>
> **Core Educational Features:**
> *   Step-by-step tutorial mode walking through hypothesis testing from question to decision
> *   4+ real-world scenarios (dice fairness, genetics, traffic patterns, market research) with context and hypotheses
> *   Tooltip icons (?) beside every metric explaining statistical concepts in plain language
> *   Expandable glossary defining: chi-square, null hypothesis, p-value, degrees of freedom, critical value
> *   Quiz mode with multiple-choice questions testing comprehension
> *   "What does this mean?" summary panel translating statistics into real-world intuition
>
> **Visualizations:**
> *   Side-by-side bar chart: observed vs expected frequencies (clearly labeled)
> *   Chi-square distribution curve showing test statistic position and critical region
> *   Detailed calculation table showing: Observed, Expected, (O-E)², (O-E)²/E for each category
> *   4 animated metric cards displaying: χ² statistic, p-value, critical value, degrees of freedom
>
> **Interactive Elements:**
> *   Clickable scenario cards that load different datasets
> *   "Play Animation" button demonstrating how changing data affects metrics
> *   Highlight effects when values update
> *   Active scenario indication
>
> **Design:**
> *   Modern gradient theme (purple/blue)
> *   Two-column layout: sidebar (controls/scenarios) + main content (charts/data)
> *   Smooth transitions and hover effects
> *   Mobile-responsive
>
> **Goal:** Make hypothesis testing feel like an interactive textbook chapter—intuitive, engaging, and educational.
