# MCP Unpack

**Live Demo**: [https://vinovator.github.io/my-ai-tools/mcp-unpack/](https://vinovator.github.io/my-ai-tools/mcp-unpack/)

A single-page browser tool that connects to any remote MCP server and renders a clean, shareable reference of every tool, resource, resource template, and prompt it exposes — "the npm package page, but for an MCP server."

## 🌟 Features

*   **Read-only inspector**: Lists every capability the server advertises. Doesn't execute tools, doesn't run prompts.
*   **Function-signature view**: Renders each tool's input schema as `tool_name(param: type, optional?: type)` for instant scanning.
*   **Expandable schema tree**: Drill into nested objects, see required fields, enum values, defaults, and descriptions. Toggle to raw JSON when needed.
*   **Per-section search**: Filter tools, resources, templates, and prompts by name or description.
*   **Copy as Markdown**: One click exports the entire spec as a Markdown reference — paste into a README, Notion page, or Slack message.
*   **Shareable URLs**: The server URL is reflected in `?server=…` so you can deep-link to a specific inspection.
*   **No auto-connect from URL params**: Drive-by links fill the input but never connect until you click — protecting against malicious shortlinks.
*   **Privacy by default**: Runs entirely in your browser. No analytics, no tracking, no persistence.

## 🚀 Usage

Open `index.html` in any modern browser, or visit the live demo above.

1.  Paste a remote MCP server URL (the Streamable HTTP endpoint, e.g. `https://example.com/mcp`).
2.  If the server gates access with a static bearer token, expand **Advanced** and paste it in.
3.  Click **Connect** (or press <kbd>Enter</kbd>).
4.  Browse the rendered gallery. Use the per-section search boxes to filter. Click **Full schema** on any tool card to see the complete input schema as a tree.
5.  Click **Copy as Markdown** to export the full spec to your clipboard.

### Curated examples

The home screen shows a small list of starter examples loaded from `examples.json`. Edit that file to add your own — it's plain JSON with `name`, `url`, and `description` fields.

## 🔒 Privacy & Network Behaviour

Network requests go only to:

*   The MCP server URL you explicitly enter.
*   `fonts.googleapis.com` and `fonts.gstatic.com` for the Inter and JetBrains Mono webfonts.

There is **no** server upload, **no** analytics, **no** telemetry, and **no** persistence — `localStorage`, `sessionStorage`, `IndexedDB`, and cookies are never touched. The only state that survives a refresh is the `?server=` URL parameter (your browser's normal URL/history behaviour).

To verify, open DevTools → Network tab before clicking Connect. You'll see exactly one request to the MCP server (and any in-stream SSE events from it) and nothing else after the page loads.

## 🛠 Limitations (by design)

*   **Streamable HTTP transport only.** This tool can't connect to stdio MCP servers — they don't have a URL.
*   **Bearer-token authentication only.** OAuth flows are out of scope.
*   **CORS-gated.** Browser fetch requests are subject to CORS — if a server hasn't allowlisted your origin, the tool can't connect to it. This is a security feature of the web platform, not a bug. Contact the server operator to add an `Access-Control-Allow-Origin` header.
*   **No tool execution.** This is strictly a documentation / discovery tool.

## 📚 Built With

*   Vanilla HTML, CSS, and JavaScript ES modules — no build step.
*   No runtime dependencies. Webfonts loaded from Google Fonts.
*   Hand-rolled JSON-RPC client implementing the [MCP Streamable HTTP transport](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports).

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](../LICENSE) file for details.
