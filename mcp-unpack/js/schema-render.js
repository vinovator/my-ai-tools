// JSON Schema rendering — both the inline signature line and the expanded tree.
//
// We don't try to be a fully-correct JSON Schema renderer (the spec is huge).
// We handle the dialect that MCP tools actually use in practice: type, enum,
// anyOf/oneOf, properties + required, items, default, description, $ref.

export function renderSignature(name, schema) {
  if (!schema || typeof schema !== "object" || schema.type !== "object" || !schema.properties) {
    return `${name}()`;
  }
  const required = new Set(schema.required || []);
  const parts = Object.entries(schema.properties).map(([propName, prop]) => {
    const optional = required.has(propName) ? "" : "?";
    return `${propName}${optional}: ${typeLabel(prop, { inline: true })}`;
  });
  return `${name}(${parts.join(", ")})`;
}

// Compact type label for the signature line. Nested objects collapse to one
// inline level: { a: string, b: number }. Deeper nesting becomes "object".
function typeLabel(prop, { inline = false } = {}) {
  if (!prop || typeof prop !== "object") return "any";
  if (prop.$ref) return prop.$ref.split("/").pop();
  if (Array.isArray(prop.enum) && prop.enum.length) {
    return prop.enum.map(v => JSON.stringify(v)).join(" | ");
  }
  const variants = prop.anyOf || prop.oneOf;
  if (Array.isArray(variants) && variants.length) {
    return variants.map(v => typeLabel(v, { inline })).join(" | ");
  }
  const t = Array.isArray(prop.type) ? prop.type.join(" | ") : prop.type;
  if (t === "array") {
    const item = prop.items ? typeLabel(prop.items, { inline }) : "any";
    return `${item}[]`;
  }
  if (t === "object" && prop.properties) {
    if (!inline) return "object";
    const required = new Set(prop.required || []);
    const inner = Object.entries(prop.properties).map(([k, v]) => {
      const opt = required.has(k) ? "" : "?";
      return `${k}${opt}: ${typeLabel(v, { inline: false })}`;
    });
    return inner.length ? `{ ${inner.join(", ")} }` : "object";
  }
  return t || "any";
}

// Build an expandable tree view of a schema. Returns an HTMLElement.
// The tree is augmented with a "Show raw JSON" toggle that swaps the rendered
// view for a syntax-uncoloured pretty-printed dump.
export function renderSchemaTree(schema) {
  const wrap = el("div", { class: "schema-tree" });
  const toolbar = el("div", { class: "schema-toolbar" });
  const toggle = el("button", { class: "btn-link", type: "button" }, "Show raw JSON");
  toolbar.appendChild(toggle);

  const treeView = el("div", { class: "schema-view" });
  treeView.appendChild(renderSchemaNode(schema, { topLevel: true }));

  const rawView = el("pre", { class: "schema-raw", hidden: true }, JSON.stringify(schema, null, 2));

  toggle.addEventListener("click", () => {
    const showingRaw = !rawView.hasAttribute("hidden");
    if (showingRaw) {
      rawView.setAttribute("hidden", "");
      treeView.removeAttribute("hidden");
      toggle.textContent = "Show raw JSON";
    } else {
      treeView.setAttribute("hidden", "");
      rawView.removeAttribute("hidden");
      toggle.textContent = "Show tree view";
    }
  });

  wrap.append(toolbar, treeView, rawView);
  return wrap;
}

function renderSchemaNode(schema, { topLevel = false } = {}) {
  const node = el("div", { class: "schema-node" });
  if (!schema || typeof schema !== "object") {
    node.appendChild(el("span", { class: "schema-type" }, "any"));
    return node;
  }

  // For object schemas, render each property as a child row.
  if (schema.type === "object" && schema.properties) {
    const required = new Set(schema.required || []);
    const list = el("ul", { class: "schema-props" });
    for (const [key, prop] of Object.entries(schema.properties)) {
      list.appendChild(renderProperty(key, prop, required.has(key)));
    }
    node.appendChild(list);
    if (!topLevel && schema.description) {
      node.prepend(el("div", { class: "schema-desc" }, schema.description));
    }
    return node;
  }

  // Non-object root (rare but legal): render as a single row.
  node.appendChild(renderProperty("(value)", schema, true));
  return node;
}

function renderProperty(name, prop, required) {
  const li = el("li", { class: "schema-prop" });
  const head = el("div", { class: "schema-prop-head" });

  head.appendChild(el("span", { class: "schema-name" }, name));
  if (required) head.appendChild(el("span", { class: "schema-required", title: "Required" }, "*"));
  head.appendChild(el("span", { class: "schema-type" }, typeLabel(prop, { inline: false })));
  li.appendChild(head);

  if (prop && typeof prop === "object") {
    if (prop.description) {
      li.appendChild(el("div", { class: "schema-desc" }, prop.description));
    }
    const chips = el("div", { class: "schema-chips" });
    if (Array.isArray(prop.enum) && prop.enum.length) {
      for (const v of prop.enum) {
        chips.appendChild(el("span", { class: "chip chip-enum" }, JSON.stringify(v)));
      }
    }
    if (prop.default !== undefined) {
      chips.appendChild(el("span", { class: "chip chip-default" }, `default: ${JSON.stringify(prop.default)}`));
    }
    if (prop.format) {
      chips.appendChild(el("span", { class: "chip" }, `format: ${prop.format}`));
    }
    if (chips.childNodes.length) li.appendChild(chips);

    // Recurse into nested object properties.
    if (prop.type === "object" && prop.properties) {
      const required = new Set(prop.required || []);
      const sub = el("ul", { class: "schema-props schema-props-nested" });
      for (const [k, v] of Object.entries(prop.properties)) {
        sub.appendChild(renderProperty(k, v, required.has(k)));
      }
      li.appendChild(sub);
    }
    // Recurse into array items if items is an object schema.
    if (prop.type === "array" && prop.items && typeof prop.items === "object") {
      if (prop.items.type === "object" && prop.items.properties) {
        const required = new Set(prop.items.required || []);
        const sub = el("ul", { class: "schema-props schema-props-nested" });
        const label = el("li", { class: "schema-array-label" }, "items:");
        sub.appendChild(label);
        for (const [k, v] of Object.entries(prop.items.properties)) {
          sub.appendChild(renderProperty(k, v, required.has(k)));
        }
        li.appendChild(sub);
      }
    }
  }
  return li;
}

// Tiny DOM helper. Strings become text nodes; objects become attributes.
function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === false || v == null) continue;
    if (v === true) node.setAttribute(k, "");
    else node.setAttribute(k, v);
  }
  for (const child of children) {
    if (child == null || child === false) continue;
    node.append(typeof child === "string" ? document.createTextNode(child) : child);
  }
  return node;
}
