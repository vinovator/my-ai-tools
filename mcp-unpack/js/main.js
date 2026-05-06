// Entry point — wires DOM to MCPClient, holds in-memory state, dispatches renders.

import { MCPClient } from "./mcp-client.js";
import { renderHeaderCard, renderTools, renderResources, renderResourceTemplates, renderPrompts } from "./render.js";
import { buildMarkdown } from "./markdown-export.js";
import { readServerFromUrl, writeServerToUrl } from "./url-state.js";

const $ = (id) => document.getElementById(id);

// Single source of truth for the connected view.
const state = {
  status: "idle",        // idle | loading | error | connected
  url: null,
  bearerToken: null,
  serverInfo: null,
  capabilities: null,
  instructions: null,
  protocolVersion: null,
  inspectedAt: null,
  tools: [],
  resources: [],
  resourceTemplates: [],
  prompts: [],
  raw: null,
  error: null,
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  loadExamples();

  const urlInput = $("server-url");
  const tokenInput = $("bearer-token");
  const advancedToggle = $("advanced-toggle");
  const advancedPanel = $("advanced-panel");
  const connectBtn = $("connect-btn");
  const form = $("connect-form");
  const copyBtn = $("copy-md-btn");

  advancedToggle.addEventListener("click", () => {
    const open = advancedPanel.hasAttribute("hidden");
    if (open) {
      advancedPanel.removeAttribute("hidden");
      advancedToggle.setAttribute("aria-expanded", "true");
    } else {
      advancedPanel.setAttribute("hidden", "");
      advancedToggle.setAttribute("aria-expanded", "false");
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = urlInput.value.trim();
    const token = tokenInput.value.trim();
    if (!url) return;
    connect(url, token || null);
  });

  copyBtn.addEventListener("click", () => copyMarkdown(copyBtn));

  // ?server= → auto-populate but never auto-connect (drive-by attack hardening).
  const urlParam = readServerFromUrl();
  if (urlParam) {
    urlInput.value = urlParam;
    showConfirmHint(urlParam);
  }
}

async function loadExamples() {
  const list = $("examples-list");
  if (!list) return;
  try {
    const res = await fetch("./examples.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    list.innerHTML = "";
    for (const ex of data.examples || []) {
      const li = document.createElement("li");
      const link = document.createElement("button");
      link.type = "button";
      link.className = "example-link";
      link.innerHTML = `<span class="example-name">${escapeHtml(ex.name)}</span><span class="example-url mono">${escapeHtml(ex.url)}</span>`;
      link.addEventListener("click", () => {
        $("server-url").value = ex.url;
        showConfirmHint(ex.url);
        $("server-url").focus();
      });
      li.appendChild(link);
      if (ex.description) {
        const d = document.createElement("p");
        d.className = "example-desc";
        d.textContent = ex.description;
        li.appendChild(d);
      }
      list.appendChild(li);
    }
  } catch {
    // Examples are optional — no list, no problem.
    list.parentElement?.setAttribute("hidden", "");
  }
}

function showConfirmHint(url) {
  const hint = $("connect-hint");
  if (!hint) return;
  let host = url;
  try { host = new URL(url).host || url; } catch {}
  hint.innerHTML = `Press <strong>Connect</strong> to inspect <span class="mono">${escapeHtml(host)}</span>.`;
  hint.removeAttribute("hidden");
}

async function connect(url, token) {
  state.status = "loading";
  state.url = url;
  state.bearerToken = token;
  state.error = null;
  setStatus("loading");
  hideError();
  writeServerToUrl(url);

  const client = new MCPClient(url, token);
  const init = await client.connect();
  if (!init.ok) return showError(init);

  // Fetch each capability list in parallel, but only the ones the server advertises.
  const tasks = [];
  if (client.capabilities.tools)     tasks.push(client.listTools().then(r => ["tools", r]));
  if (client.capabilities.resources) tasks.push(client.listResources().then(r => ["resources", r]));
  if (client.capabilities.resources) tasks.push(client.listResourceTemplates().then(r => ["resourceTemplates", r]));
  if (client.capabilities.prompts)   tasks.push(client.listPrompts().then(r => ["prompts", r]));
  const settled = await Promise.all(tasks);

  for (const [key, r] of settled) {
    if (r.ok) {
      state[key] = r.data;
    } else if (key === "resourceTemplates" && r.kind === "rpc-error") {
      // Some servers advertise resources but don't implement templates.
      // Treat as "no templates" rather than surfacing a scary error.
      state[key] = [];
    } else if (!r.ok) {
      return showError(r);
    }
  }

  state.serverInfo = client.serverInfo;
  state.capabilities = client.capabilities;
  state.instructions = client.instructions;
  state.protocolVersion = client.negotiatedVersion;
  state.inspectedAt = new Date().toISOString().replace("T", " ").replace(/\..+/, " UTC");
  state.raw = client.rawInitialize;
  state.status = "connected";

  renderAll();
  setStatus("connected");
}

function renderAll() {
  renderHeaderCard(state, $("header-card-section"));
  renderTools($("tools-section"), state.tools);
  renderResources($("resources-section"), state.resources);
  renderResourceTemplates($("templates-section"), state.resourceTemplates);
  renderPrompts($("prompts-section"), state.prompts);

  // Footer raw initialize dump.
  const rawEl = $("raw-initialize");
  if (rawEl) rawEl.textContent = JSON.stringify(state.raw, null, 2);
  $("totals").textContent = `${state.tools.length} tools · ${state.resources.length} resources · ${state.resourceTemplates.length} templates · ${state.prompts.length} prompts`;
}

function showError(err) {
  state.status = "error";
  state.error = err;
  setStatus("error");
  const box = $("error-box");
  const heading = $("error-heading");
  const message = $("error-message");
  const hint = $("error-hint");
  heading.textContent = errorHeading(err.kind);
  message.textContent = err.message;
  hint.innerHTML = errorHint(err.kind);
  box.removeAttribute("hidden");
  // For auth errors, focus the bearer token field so the user can paste right in.
  if (err.kind === "auth") {
    $("advanced-panel").removeAttribute("hidden");
    $("advanced-toggle").setAttribute("aria-expanded", "true");
    $("bearer-token").focus();
  }
}

function hideError() {
  $("error-box").setAttribute("hidden", "");
}

function errorHeading(kind) {
  switch (kind) {
    case "cors":              return "Couldn't reach the server";
    case "network":           return "Network error";
    case "auth":              return "Authentication required";
    case "not-mcp":           return "This URL doesn't look like an MCP server";
    case "timeout":           return "Request timed out";
    case "protocol-mismatch": return "Protocol version mismatch";
    case "rpc-error":         return "Server returned an error";
    default:                  return "Something went wrong";
  }
}

function errorHint(kind) {
  switch (kind) {
    case "cors":
      return `The most common cause is CORS — the server hasn't allowlisted this origin. The server operator must add <code>Access-Control-Allow-Origin</code> for your domain. Less commonly: bad URL, DNS failure, or you're offline.`;
    case "auth":
      return "Paste a bearer token in the Advanced section and try again.";
    case "not-mcp":
      return "The server responded, but the body wasn't a valid MCP initialize response. Double-check the URL — many MCP endpoints are at <code>/mcp</code> or <code>/sse</code>.";
    case "timeout":
      return "The server took too long to respond. Try again, or check that the URL is correct.";
    case "protocol-mismatch":
      return "This client speaks the latest MCP protocol version. The server may be older — contact the server operator.";
    default:
      return "";
  }
}

function setStatus(status) {
  document.body.dataset.status = status;
  const btn = $("connect-btn");
  if (status === "loading") {
    btn.disabled = true;
    btn.textContent = "Connecting…";
  } else {
    btn.disabled = false;
    btn.textContent = "Connect";
  }
}

async function copyMarkdown(btn) {
  const original = btn.textContent;
  try {
    await navigator.clipboard.writeText(buildMarkdown(state));
    btn.textContent = "Copied!";
    setTimeout(() => { btn.textContent = original; }, 1500);
  } catch {
    btn.textContent = "Copy failed";
    setTimeout(() => { btn.textContent = original; }, 1500);
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}
