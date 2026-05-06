// MCP client — JSON-RPC 2.0 over the Streamable HTTP transport.
//
// Spec reference: https://modelcontextprotocol.io/specification/2025-11-25
//
// This module is hand-rolled rather than pulled from @modelcontextprotocol/sdk
// because the SDK is Node-flavored and ships dependencies. For a read-only
// browser inspector, ~200 lines of fetch + a tiny SSE parser is plenty, and it
// doubles as a learning artifact for anyone curious about the wire protocol.
//
// What this client does NOT do:
//   - tool execution / resource fetch (read-only inspector — list calls only)
//   - OAuth, server-sent requests back to client, resumability via Last-Event-ID
//   - stdio transport (HTTP only)

const PROTOCOL_VERSION = "2025-11-25";
const CLIENT_INFO = { name: "mcp-unpack", version: "0.1.0" };
const REQUEST_TIMEOUT_MS = 15_000;

// Rich error kinds that main.js translates into UI strings.
// Keep these stable — main.js switches on them.
//   cors              — fetch threw TypeError (most likely CORS, also DNS/offline)
//   network           — non-OK HTTP status that isn't auth-related
//   auth              — 401/403, may be fixable with a bearer token
//   not-mcp           — server responded but the body isn't valid JSON-RPC
//   timeout           — exceeded REQUEST_TIMEOUT_MS
//   protocol-mismatch — server rejected our protocolVersion (rare)
//   rpc-error         — server returned a JSON-RPC error object

export class MCPClient {
  constructor(serverUrl, bearerToken) {
    this.serverUrl = serverUrl;
    this.bearerToken = bearerToken || null;
    this._sessionId = null;       // captured from initialize response headers
    this._nextId = 1;
    this._initialized = false;
    this.serverInfo = null;
    this.capabilities = null;
    this.instructions = null;
    this.negotiatedVersion = null;
    this.rawInitialize = null;
  }

  // initialize handshake + initialized notification.
  // Returns { ok: true, ... } or { ok: false, kind, message }.
  async connect() {
    const initResult = await this._request("initialize", {
      protocolVersion: PROTOCOL_VERSION,
      // Empty capabilities object is valid for a passive read-only client.
      capabilities: {},
      clientInfo: CLIENT_INFO,
    });
    if (!initResult.ok) return initResult;

    const result = initResult.data;
    // Cheap "is this an MCP server?" sniff. A real MCP server always returns
    // serverInfo.name + protocolVersion in the initialize result.
    if (!result || typeof result !== "object" || !result.serverInfo || !result.protocolVersion) {
      return { ok: false, kind: "not-mcp", message: "This URL responded, but the body isn't a valid MCP initialize response." };
    }

    this.serverInfo = result.serverInfo;
    this.capabilities = result.capabilities || {};
    this.instructions = result.instructions || null;
    this.negotiatedVersion = result.protocolVersion;
    this.rawInitialize = result;

    // Per the lifecycle spec, after a successful initialize the client MUST send
    // a `notifications/initialized` notification. It's a notification (no `id`),
    // so the server returns 202 Accepted with no body — fire-and-forget.
    const notifyResult = await this._notify("notifications/initialized");
    if (!notifyResult.ok) return notifyResult;
    this._initialized = true;

    return {
      ok: true,
      serverInfo: this.serverInfo,
      capabilities: this.capabilities,
      instructions: this.instructions,
      protocolVersion: this.negotiatedVersion,
      raw: this.rawInitialize,
    };
  }

  async listTools()             { return this._listPaginated("tools/list",             "tools"); }
  async listResources()         { return this._listPaginated("resources/list",         "resources"); }
  async listResourceTemplates() { return this._listPaginated("resources/templates/list", "resourceTemplates"); }
  async listPrompts()           { return this._listPaginated("prompts/list",           "prompts"); }

  // Paginated list helper. The spec says cursor is optional and may be absent
  // even when more pages exist conceptually (server-defined). We loop until
  // nextCursor is gone, accumulating items. Cap at 50 pages defensively to
  // avoid spinning on a misbehaving server.
  async _listPaginated(method, key) {
    const all = [];
    let cursor;
    for (let page = 0; page < 50; page++) {
      const params = cursor ? { cursor } : undefined;
      const r = await this._request(method, params);
      if (!r.ok) return r;
      const items = (r.data && r.data[key]) || [];
      all.push(...items);
      cursor = r.data && r.data.nextCursor;
      if (!cursor) break;
    }
    return { ok: true, data: all };
  }

  // Core JSON-RPC request. Always POSTs the same body shape; the interesting
  // logic is in headers (session, protocol-version) and in branching on the
  // response Content-Type (application/json vs text/event-stream).
  async _request(method, params) {
    const id = this._nextId++;
    const body = JSON.stringify({ jsonrpc: "2.0", id, method, params });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    let response;
    try {
      response = await fetch(this.serverUrl, {
        method: "POST",
        // The Streamable HTTP transport REQUIRES the client advertise both
        // response modes here, even if a given server only ever uses one.
        headers: this._headers({ json: true }),
        body,
        signal: controller.signal,
        // Don't send cookies — keeps the privacy story clean and avoids
        // accidentally authenticating via a third-party login session.
        credentials: "omit",
      });
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === "AbortError") {
        return { ok: false, kind: "timeout", message: `Request timed out after ${REQUEST_TIMEOUT_MS / 1000}s.` };
      }
      // fetch() throws TypeError for CORS rejection, DNS failure, offline, etc.
      // We can't reliably distinguish these from the browser API, so we lump
      // them under "cors" and surface the most-likely cause in the UI message.
      return { ok: false, kind: "cors", message: "Network request failed. Most often this means the server hasn't allowlisted this origin via CORS, but it could also be DNS, offline, or a bad URL." };
    }
    clearTimeout(timeoutId);

    // Capture session ID from the initialize response (and only then — but
    // checking on every response is harmless and tolerates servers that send
    // it later). HTTP header names are case-insensitive; fetch normalizes.
    const sessionHeader = response.headers.get("mcp-session-id");
    if (sessionHeader && !this._sessionId) {
      this._sessionId = sessionHeader;
    }

    if (response.status === 401 || response.status === 403) {
      return { ok: false, kind: "auth", message: this.bearerToken
        ? "The server rejected the provided bearer token."
        : "This server requires authentication. Provide a bearer token and try again." };
    }
    if (!response.ok) {
      return { ok: false, kind: "network", message: `HTTP ${response.status} ${response.statusText || ""}`.trim() };
    }

    // Branch on Content-Type. The spec allows either:
    //   application/json     — single response body
    //   text/event-stream    — SSE stream that eventually contains the response
    const contentType = (response.headers.get("content-type") || "").toLowerCase();
    let payload;
    try {
      if (contentType.includes("text/event-stream")) {
        payload = await this._readSSE(response, id);
      } else {
        payload = await response.json();
      }
    } catch (err) {
      return { ok: false, kind: "not-mcp", message: `Failed to parse response: ${err.message}` };
    }

    if (!payload || payload.jsonrpc !== "2.0") {
      return { ok: false, kind: "not-mcp", message: "Response wasn't a JSON-RPC 2.0 message." };
    }
    if (payload.error) {
      const e = payload.error;
      // Protocol-version mismatch surfaces as -32602 with { supported, requested } in data.
      if (e.code === -32602 && e.data && Array.isArray(e.data.supported)) {
        return { ok: false, kind: "protocol-mismatch", message: `Server doesn't support protocol version ${PROTOCOL_VERSION}. Supported: ${e.data.supported.join(", ")}.` };
      }
      return { ok: false, kind: "rpc-error", message: `${e.message || "RPC error"} (code ${e.code})`, code: e.code, data: e.data };
    }
    return { ok: true, data: payload.result };
  }

  // Notifications: no id, no response body expected. Server returns 202 Accepted.
  async _notify(method, params) {
    const body = JSON.stringify({ jsonrpc: "2.0", method, params });
    try {
      const response = await fetch(this.serverUrl, {
        method: "POST",
        headers: this._headers({ json: false }),
        body,
        credentials: "omit",
      });
      if (!response.ok && response.status !== 202) {
        return { ok: false, kind: "network", message: `HTTP ${response.status} on ${method}` };
      }
      return { ok: true };
    } catch {
      return { ok: false, kind: "cors", message: `Failed to send ${method}.` };
    }
  }

  _headers({ json }) {
    const h = {
      "Content-Type": "application/json",
      // Per spec: the Accept header MUST list both content types on POST.
      "Accept": "application/json, text/event-stream",
    };
    // After initialize, every subsequent request carries the negotiated
    // protocol version. Servers use this to reject downgrade attempts and to
    // route requests through the right schema version.
    if (this._initialized) h["MCP-Protocol-Version"] = PROTOCOL_VERSION;
    if (this._sessionId)   h["MCP-Session-Id"] = this._sessionId;
    if (this.bearerToken)  h["Authorization"] = `Bearer ${this.bearerToken}`;
    return h;
  }

  // Minimal SSE parser. Reads the response body as a stream, splits on
  // double-newlines (event boundary), and within each event accumulates `data:`
  // lines into one JSON string. The server may interleave server→client
  // requests/notifications before the response we want — we ignore anything
  // that isn't a JSON-RPC response with our matching `id`.
  async _readSSE(response, expectId) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // Process complete events (separated by blank line).
      let boundary;
      while ((boundary = buffer.indexOf("\n\n")) !== -1) {
        const eventBlock = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 2);
        const dataLines = [];
        for (const line of eventBlock.split("\n")) {
          if (line.startsWith("data:")) dataLines.push(line.slice(5).trimStart());
        }
        if (dataLines.length === 0) continue;
        let parsed;
        try { parsed = JSON.parse(dataLines.join("\n")); } catch { continue; }
        // Match by id; skip server→client requests (they carry their own id from
        // a separate id-space) and notifications (no id at all).
        if (parsed && parsed.jsonrpc === "2.0" && parsed.id === expectId) {
          // Best-effort cancel — some servers close cleanly, others keep the
          // stream open expecting more. Either way, we have what we need.
          try { reader.cancel(); } catch {}
          return parsed;
        }
      }
    }
    throw new Error("SSE stream closed before a matching response arrived.");
  }
}

export { PROTOCOL_VERSION, CLIENT_INFO };
