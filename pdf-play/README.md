# PDF Merge & Split

**Live Demo**: [https://vinovator.github.io/my-ai-tools/pdf-play/index.html](https://vinovator.github.io/my-ai-tools/pdf-play/index.html)

A single-page browser tool to combine multiple PDFs into one, or split a PDF into several documents at chosen page numbers. Everything runs locally in your browser — your files are never uploaded.

## 🌟 Features

*   **Merge**: Combine 1+ PDFs into one output, in the order you arrange them. Drag &amp; drop, reorder, remove.
*   **Split**: Partition a PDF into 2+ documents by specifying split points (page numbers where each new file starts). Live preview of the resulting parts.
*   **Privacy by default**: Files are processed entirely in-browser. Nothing is uploaded; nothing is persisted.
*   **Safe input handling**: MIME-type and magic-byte validation reject non-PDFs even when extensions lie.
*   **Encrypted-PDF aware**: Password-protected files are flagged and processed best-effort with a clear warning.
*   **Keyboard friendly**: <kbd>Enter</kbd> triggers the active action when the form is valid.
*   **Zero dependencies (runtime)**: Loads only [pdf-lib](https://pdf-lib.js.org/) and [JSZip](https://stuk.github.io/jszip/) from CDN.

## 🚀 Usage

Open `index.html` in any modern browser, or visit the live demo above. Pick a tab — Merge or Split — and follow the flow.

### Merge

1.  Drag PDFs into the left dropzone, or click to browse.
2.  Reorder files with the ↑ ↓ buttons; remove with ×.
3.  Optionally rename the output (default: `merged.pdf`).
4.  Click **Merge & Download** (or press <kbd>Enter</kbd>).

### Split

1.  Drag a single PDF into the left dropzone, or click to browse.
2.  Enter **split points** as comma-separated page numbers — each one marks where a new output file *starts*.
    *   Example: a 10-page PDF with split points `4, 8` produces 3 outputs: pages `1–3`, `4–7`, `8–10`.
3.  The right pane previews the resulting parts in real time.
4.  Optionally adjust the filename prefix (default: original name without `.pdf`).
5.  Click **Split & Download ZIP** (or press <kbd>Enter</kbd>). You get a `.zip` containing `<prefix>-part-1.pdf`, `<prefix>-part-2.pdf`, …

## 🔒 Privacy & File Handling

Your PDFs never leave the browser tab. There is no server upload, no analytics, no telemetry, and no persistence — `localStorage` / `IndexedDB` / cookies are not touched, so a refresh wipes the slate.

To verify, open your browser's DevTools → Network tab before using the tool. Once the page loads, the only requests you should see are the initial CDN script loads (pdf-lib and JSZip). No requests fire when you add files, merge, or split.

Inputs are validated by both MIME type and the `%PDF-` magic-byte signature. Encrypted (password-protected) PDFs are loaded with `ignoreEncryption: true` and flagged inline; the output may be incomplete depending on the PDF's protection scheme.

## 📚 Built With

*   [pdf-lib](https://pdf-lib.js.org/) — reading, writing, and page-copy operations.
*   [JSZip](https://stuk.github.io/jszip/) — bundling split outputs into one download.
*   Vanilla HTML / CSS / JavaScript — no build step.

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](../LICENSE) file for details.
