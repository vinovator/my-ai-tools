# Chi-Square Goodness of Fit Test App

**Live Demo**: [https://vinovator.github.io/my-ai-tools/goodness-of-fit/index.html](https://vinovator.github.io/my-ai-tools/goodness-of-fit/index.html)

A single-page interactive HTML application to perform Chi-Square Goodness of Fit tests. This tool helps you statistically determine if your observed data matches expected theoretical values, running entirely in your browser.

## 🌟 Features

*   **Easy Data Import**: Upload your own CSV/Excel files or use the manual entry table.
*   **Automatic Calculation**: Instantly computes Chi-Square Score, P-Value, Critical Value, and Degrees of Freedom.
*   **Interactive Visualizations**:
    *   **Observed vs Expected**: Bar charts with exact count tooltips.
    *   **Chi-Square Distribution**: Dynamic curve showing the critical region and test statistic.
*   **Clear Conclusions**: Automatic "Reject" or "Fail to Reject" null hypothesis interpretations.
*   **Zero Dependencies**: Runs purely in the browser using CDNs (Plotly, SheetJS, jStat).

## 🚀 Usage

Simply open `index.html` in any modern web browser.

1.  **Configure**: Choose "Upload File" or "Manual Entry" in the sidebar.
2.  **Input Data**:
    *   Upload a CSV/Excel file with columns for Categories, Observed values, and Expected values.
    *   Or manually enter data into the editable table.
3.  **Run Test**: Click "Run Test" to see statistics and visualizations.

### Data Format
Your data should be in separate columns:
*   **Category**: Names/Labels for the groups.
*   **Observed**: Actual counts.
*   **Expected**: Theoretical counts (or proportions converted to counts).

## 📊 Visuals
Powered by **Plotly.js** for high-quality, interactive statistical charts.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.
