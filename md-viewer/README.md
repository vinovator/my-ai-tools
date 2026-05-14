# Markdown Viewer

**Live Demo**: [https://vinovator.github.io/my-ai-tools/md-viewer/index.html](https://vinovator.github.io/my-ai-tools/md-viewer/index.html)

A single-page browser tool to view rendered Markdown. Drop a `.md` file and see it formatted with code highlighting, math, and diagrams. Everything runs locally in your browser; your files are never uploaded.

## 🌟 Features

*   **Reader-first layout**: No persistent sidebar. The empty page IS the drop zone. Once loaded, content sits in a centered ~760 px reading column with a slim sticky top bar of icon actions.
*   **Drag & drop anywhere**: Drop a `.md`, `.markdown`, or `.txt` file anywhere on the page (or click the drop target to browse). Up to 5 MB.
*   **GitHub-Flavored Markdown**: Tables, task lists, strikethrough, fenced code blocks.
*   **Syntax highlighting**: Fenced code blocks are highlighted by [highlight.js](https://highlightjs.org/) with language auto-detection.
*   **Math**: Inline `$...$` and display `$$...$$` rendered with [KaTeX](https://katex.org/).
*   **Diagrams**: Mermaid code blocks rendered as inline SVGs ([mermaid.js](https://mermaid.js.org/)).
*   **Auto TOC + heading anchors**: Documents with 3 or more headings get a floating outline (or a drawer on narrow viewports) with scroll-spy. Hover any heading to copy a deep link.
*   **Dark mode**: Auto-detects your OS preference at load; toggle in the top bar. In-memory only, never persisted.
*   **Export**:
    *   **Print / Save as PDF**: forces light theme and hides chrome so only the document prints.
    *   **Download HTML**: portable `.html` file with inline styles; KaTeX/Mermaid output is embedded; KaTeX and highlight.js themes are CDN-linked for compactness.
    *   **Copy HTML**: copy the rendered HTML markup to your clipboard.
*   **Sanitization by default**: Output is passed through [DOMPurify](https://github.com/cure53/DOMPurify) before rendering, so `<script>` and event-handler attributes in the source markdown can never execute.
*   **Privacy by default**: No upload, no analytics, no persistence.

## 🚀 Usage

Open `index.html` in any modern browser, or visit the live demo above.

1.  Drop a Markdown file anywhere on the page, or click the drop target to browse.
2.  The rendered document fills the reading column; a slim top bar holds the file name and action buttons.
3.  Use the top-bar icon buttons:
    *   **☰** opens the outline drawer on narrow viewports (on wide ones the outline is always visible).
    *   **Print / Save as PDF**: opens your browser's print dialog.
    *   **Download HTML**: saves a portable `.html` file you can share.
    *   **Copy HTML**: copies the rendered HTML to the clipboard.
    *   **✕** clears the current file and returns to the empty drop state.
    *   **☾ / ☀** toggles dark mode.

A `sample.md` fixture is included that exercises every feature (tables, task lists, three highlighted code languages, inline + display math, two Mermaid diagram types, plus an XSS attempt that should appear inert).

## 🔒 Privacy & File Handling

Your Markdown files never leave the browser tab. There is no server upload, no analytics, no telemetry, and no persistence. `localStorage` / `IndexedDB` / cookies are not touched, so a refresh wipes the slate.

To verify, open your browser's DevTools → Network tab before using the tool. After page load, the only outbound requests you should see are the initial CDN script and stylesheet loads (Inter & JetBrains Mono, marked, DOMPurify, highlight.js, KaTeX, mermaid). No requests fire when you load, render, or export a file.

All rendered HTML is sanitized through DOMPurify with `<script>`, `<iframe>`, and event-handler attributes forbidden, so a hostile `.md` cannot run code or exfiltrate data.

## 📚 Built With

*   [marked](https://marked.js.org/) for the Markdown → HTML parser (GFM enabled).
*   [DOMPurify](https://github.com/cure53/DOMPurify) for XSS sanitization.
*   [highlight.js](https://highlightjs.org/) for syntax highlighting of fenced code blocks.
*   [KaTeX](https://katex.org/) for fast math rendering.
*   [mermaid](https://mermaid.js.org/) for diagram-as-code rendering.
*   Vanilla HTML / CSS / JavaScript. No build step.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
