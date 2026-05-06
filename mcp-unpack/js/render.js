// Gallery rendering — header card, sections, search, individual item cards.
// Pure DOM, no framework. Each render function fully replaces the contents
// of its container so re-renders are idempotent.

import { renderSignature, renderSchemaTree } from "./schema-render.js";

export function renderHeaderCard(state, container) {
  container.innerHTML = "";
  const card = el("div", { class: "header-card" });

  const title = el("h2", { class: "header-card-title" });
  title.append(state.serverInfo.name || "(unnamed server)");
  if (state.serverInfo.version) {
    title.appendChild(el("span", { class: "header-card-version" }, `v${state.serverInfo.version}`));
  }
  card.appendChild(title);

  const meta = el("dl", { class: "header-card-meta" });
  addMeta(meta, "URL", state.url, { mono: true });
  addMeta(meta, "Protocol", state.protocolVersion, { mono: true });
  addMeta(meta, "Inspected", state.inspectedAt);
  card.appendChild(meta);

  if (state.instructions) {
    const details = el("details", { class: "header-card-instructions" });
    details.appendChild(el("summary", {}, "Server instructions"));
    details.appendChild(el("div", { class: "instructions-body" }, state.instructions));
    card.appendChild(details);
  }

  container.appendChild(card);
}

function addMeta(dl, label, value, opts = {}) {
  if (!value) return;
  dl.appendChild(el("dt", {}, label));
  dl.appendChild(el("dd", { class: opts.mono ? "mono" : null }, value));
}

// Generic section renderer. Each gallery wires this up with a per-item card builder
// and the field names to match against in the search box.
export function renderSection(container, items, { title, idPrefix, build, searchFields }) {
  container.innerHTML = "";
  if (!items || items.length === 0) {
    container.setAttribute("hidden", "");
    return;
  }
  container.removeAttribute("hidden");

  const header = el("div", { class: "section-header" });
  const h = el("h2", { class: "section-title" });
  h.append(title);
  h.appendChild(el("span", { class: "section-count" }, String(items.length)));
  header.appendChild(h);

  const search = el("input", {
    type: "search",
    class: "section-search",
    placeholder: `Filter ${title.toLowerCase()}…`,
    "aria-label": `Filter ${title}`,
  });
  header.appendChild(search);
  container.appendChild(header);

  const grid = el("div", { class: "card-grid", id: `${idPrefix}-grid` });
  container.appendChild(grid);

  const renderGrid = (filter) => {
    grid.innerHTML = "";
    const q = (filter || "").trim().toLowerCase();
    const filtered = q
      ? items.filter(it => searchFields.some(f => (it[f] || "").toString().toLowerCase().includes(q)))
      : items;
    if (filtered.length === 0) {
      grid.appendChild(el("div", { class: "empty-filter" }, "No matches."));
      return;
    }
    for (const item of filtered) grid.appendChild(build(item));
  };

  search.addEventListener("input", () => renderGrid(search.value));
  renderGrid("");
}

export function renderTools(container, tools) {
  renderSection(container, tools, {
    title: "Tools",
    idPrefix: "tools",
    searchFields: ["name", "description"],
    build: buildToolCard,
  });
}

export function renderResources(container, resources) {
  renderSection(container, resources, {
    title: "Resources",
    idPrefix: "resources",
    searchFields: ["name", "description", "uri"],
    build: buildResourceCard,
  });
}

export function renderResourceTemplates(container, templates) {
  renderSection(container, templates, {
    title: "Resource Templates",
    idPrefix: "templates",
    searchFields: ["name", "description", "uriTemplate"],
    build: buildTemplateCard,
  });
}

export function renderPrompts(container, prompts) {
  renderSection(container, prompts, {
    title: "Prompts",
    idPrefix: "prompts",
    searchFields: ["name", "description"],
    build: buildPromptCard,
  });
}

function buildToolCard(tool) {
  const card = el("article", { class: "item-card tool-card" });
  card.appendChild(el("h3", { class: "item-name mono" }, tool.name));

  const annotations = collectToolAnnotations(tool);
  if (annotations.length) {
    const row = el("div", { class: "annotation-row" });
    for (const a of annotations) {
      row.appendChild(el("span", { class: `chip chip-${a.kind}`, title: a.title }, a.label));
    }
    card.appendChild(row);
  }

  if (tool.description) {
    card.appendChild(el("p", { class: "item-desc" }, tool.description));
  }

  const sig = renderSignature(tool.name, tool.inputSchema);
  card.appendChild(el("pre", { class: "signature mono" }, sig));

  if (tool.inputSchema && tool.inputSchema.properties && Object.keys(tool.inputSchema.properties).length) {
    const details = el("details", { class: "schema-details" });
    details.appendChild(el("summary", {}, "Full schema"));
    details.appendChild(renderSchemaTree(tool.inputSchema));
    card.appendChild(details);
  }
  return card;
}

function collectToolAnnotations(tool) {
  // Tool annotations live on tool.annotations per the 2025-11-25 spec.
  // Older drafts put hints directly on the tool object — handle both.
  const a = tool.annotations || tool;
  const out = [];
  if (a.readOnlyHint)    out.push({ kind: "info",    label: "read-only",   title: "readOnlyHint: tool does not modify state" });
  if (a.destructiveHint) out.push({ kind: "danger",  label: "destructive", title: "destructiveHint: tool may perform destructive updates" });
  if (a.idempotentHint)  out.push({ kind: "info",    label: "idempotent",  title: "idempotentHint: repeated calls have no extra effect" });
  if (a.openWorldHint)   out.push({ kind: "warn",    label: "open-world",  title: "openWorldHint: tool interacts with systems outside its inputs" });
  if (a.title)           out.push({ kind: "neutral", label: a.title,       title: "title" });
  return out;
}

function buildResourceCard(r) {
  const card = el("article", { class: "item-card resource-card" });
  card.appendChild(el("h3", { class: "item-name mono" }, r.name || r.uri));
  card.appendChild(el("p", { class: "item-uri mono" }, r.uri));
  if (r.description) card.appendChild(el("p", { class: "item-desc" }, r.description));
  const meta = el("div", { class: "annotation-row" });
  if (r.mimeType) meta.appendChild(el("span", { class: "chip" }, r.mimeType));
  if (r.size) meta.appendChild(el("span", { class: "chip" }, formatBytes(r.size)));
  if (meta.childNodes.length) card.appendChild(meta);
  return card;
}

function buildTemplateCard(t) {
  const card = el("article", { class: "item-card template-card" });
  card.appendChild(el("h3", { class: "item-name mono" }, t.name || t.uriTemplate));
  card.appendChild(highlightUriTemplate(t.uriTemplate || ""));
  if (t.description) card.appendChild(el("p", { class: "item-desc" }, t.description));
  if (t.mimeType) {
    const meta = el("div", { class: "annotation-row" });
    meta.appendChild(el("span", { class: "chip" }, t.mimeType));
    card.appendChild(meta);
  }
  return card;
}

// Render a URI template like `github://repos/{owner}/{repo}` with the
// {placeholders} highlighted.
function highlightUriTemplate(template) {
  const wrap = el("p", { class: "item-uri mono" });
  let i = 0;
  for (const match of template.matchAll(/\{[^}]+\}/g)) {
    if (match.index > i) wrap.appendChild(document.createTextNode(template.slice(i, match.index)));
    wrap.appendChild(el("span", { class: "uri-placeholder" }, match[0]));
    i = match.index + match[0].length;
  }
  if (i < template.length) wrap.appendChild(document.createTextNode(template.slice(i)));
  return wrap;
}

function buildPromptCard(p) {
  const card = el("article", { class: "item-card prompt-card" });
  card.appendChild(el("h3", { class: "item-name mono" }, p.name));
  if (p.description) card.appendChild(el("p", { class: "item-desc" }, p.description));
  if (Array.isArray(p.arguments) && p.arguments.length) {
    const table = el("table", { class: "prompt-args" });
    const thead = el("thead");
    thead.appendChild(rowOf("th", ["Name", "Description", "Required"]));
    table.appendChild(thead);
    const tbody = el("tbody");
    for (const arg of p.arguments) {
      tbody.appendChild(rowOf("td", [
        el("span", { class: "mono" }, arg.name || ""),
        arg.description || "",
        arg.required ? el("span", { class: "schema-required" }, "*") : "",
      ]));
    }
    table.appendChild(tbody);
    card.appendChild(table);
  }
  return card;
}

function rowOf(tag, cells) {
  const tr = el("tr");
  for (const c of cells) tr.appendChild(el(tag, {}, c));
  return tr;
}

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === false || v == null) continue;
    if (v === true) node.setAttribute(k, "");
    else node.setAttribute(k, v);
  }
  for (const child of children) {
    if (child == null || child === false || child === "") continue;
    node.append(typeof child === "string" ? document.createTextNode(child) : child);
  }
  return node;
}
