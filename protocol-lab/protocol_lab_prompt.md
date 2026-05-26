# Build: protocol-lab — Interactive Internet Protocols Explainer

You are building a new tool in the `my-ai-tools` repository. **Read `CLAUDE.md` at
the repo root first** to understand the architecture conventions. This tool must
follow them strictly: single HTML file, all CSS and JS inline, CDN-only
dependencies, no build step, no package manager, no server.

The tool lives at `protocol-lab/index.html`. After you build it:

1. Add a link to it from the root `index.html` portal **at the top of the tool list** (this repo follows a "latest tool first" ordering convention — see CLAUDE.md).
2. Ensure the tool has a **"⬅ Toolshelf"** button in its top-left corner that links back to the root `index.html` (repo-wide convention — see CLAUDE.md).

## What this tool is

An interactive, animated explainer for foundational internet protocols. The
user picks a scenario (e.g. "DNS lookup"), watches packets animate between
nodes on a canvas, and reads synced narration that explains each step. They
can step, play, pause, scrub, and inspect any message's headers/payload.

The goal is pedagogical clarity, not protocol-implementation fidelity. Use
deterministic scripted scenarios, not real network calls.

## Architecture you must build

A small generic animation engine driven by data. Each scenario is a plain JS
object:

```js
{
  id: "dns-lookup",
  title: "DNS Lookup",
  summary: "How example.com becomes an IP address.",
  nodes: [
    { id: "client", label: "Your Browser", x: 80, y: 200 },
    { id: "resolver", label: "Recursive Resolver", x: 320, y: 200 },
    { id: "root", label: "Root Server", x: 560, y: 80 },
    // ...
  ],
  params: [
    { id: "cacheHit", label: "Cache hit", type: "toggle", default: false }
  ],
  steps: (params) => [
    {
      from: "client",
      to: "resolver",
      label: "Query: example.com A?",
      payload: { type: "DNS Query", name: "example.com", qtype: "A" },
      narration: "Your browser asks its configured resolver...",
    },
    // ...
  ],
  takeaway: "DNS is a hierarchical, cached lookup..."
}
```

The engine renders nodes on a canvas, animates a packet (a labeled rectangle
or dot) from `from` to `to` along a straight line, advances on a timer or on
user click, and updates a side panel with the current step's narration and
inspectable payload.

Use the React-via-CDN pattern from `trig-viz/` and `fourier-lab/` (React 18 +
Babel Standalone). Canvas for the animation; handle device pixel ratio
explicitly for retina displays as those existing tools do.

## Layout

Two-column standard from the repo conventions:

- **Top-left corner of the page:** a "⬅ Toolshelf" button linking to `../index.html`. This is a repo-wide convention and must be present on every tool.
- **Left sidebar:** scenario picker, scenario summary, parameter controls,
  glossary lookup, and the "What does this mean?" takeaway panel.
- **Right main area:** the animated canvas on top, a synced narration + payload
  inspector below it, and a transport bar (step back, play/pause, step
  forward, scrub slider) at the bottom.

Use CSS custom properties at `:root` for the palette. Inter for UI, JetBrains
Mono for payload display, both from Google Fonts. Match the visual quality
bar set by `trig-viz` and `fourier-lab`.

## Build in 5 steps. Stop and verify after each.

After each step: open the file in a browser, confirm it works, commit with a
clear message, and only then start the next step. **Do not bundle steps.**

### Step 1 — Engine + DNS scenario

Build the full engine and ship ONE working scenario: a recursive DNS lookup
(client → resolver → root → TLD → authoritative → back to client → back to
browser). Include the cache-hit toggle as the one adjustable parameter.

Engine must support: rendering nodes, animating a packet from any node to any
other along a smooth interpolation, step/play/pause/scrub controls, synced
narration panel, payload inspector when a packet is clicked or when stepping,
and a glossary system where any term wrapped in a defined tag in narration
text gets a hover tooltip.

Also include in this step:

- The "⬅ Toolshelf" button in the top-left, linking to `../index.html`.
- A skeleton root `index.html` update putting `protocol-lab` at the **top** of the tool list.

Define the glossary as a JS object keyed by term. Seed it with: DNS, A
record, recursive resolver, authoritative server, root server, TLD, TTL,
cache, NXDOMAIN.

**Verify:** the DNS scenario plays end to end, scrubbing works, the cache-hit
toggle correctly produces a shorter sequence, glossary tooltips appear, the
Toolshelf button returns to the portal, and `protocol-lab` appears first in
the root portal list.

### Step 2 — TCP three-way handshake + teardown

Add a second scenario reusing the engine. Two nodes (client, server). Steps:
SYN, SYN-ACK, ACK, a couple of data segments with ACKs, FIN, ACK, FIN, ACK.
Payloads show sequence numbers and flags.

Adjustable parameter: a "drop the first SYN" toggle that, when on, inserts
a retransmission step before the handshake completes — to teach reliability
without building full congestion control.

Add to glossary: SYN, ACK, FIN, sequence number, three-way handshake, MSS.

**Verify:** scenario plays, the drop-SYN toggle inserts the retransmit step
visibly, and switching between DNS and TCP scenarios in the picker works
without state bleed.

### Step 3 — HTTP request/response

Add a third scenario. Two nodes (browser, web server). One TCP connection is
assumed already open (don't re-animate the handshake — that's what step 5 is
for). Steps: GET request flies to server, server processes, response flies
back with status line, headers, and a short HTML body.

The payload inspector must show the literal HTTP text for both messages, e.g.
`GET / HTTP/1.1\r\nHost: example.com\r\n...`. This is the highest-value
teaching moment in the whole tool — make the formatting crisp and monospaced.

Add to glossary: HTTP, status code, request headers, response headers,
Content-Type, User-Agent, Host header.

**Verify:** payload inspector renders the raw HTTP cleanly with newlines visible.

### Step 4 — TLS 1.3 handshake

Add a fourth scenario. Two nodes (client, server). Steps: ClientHello with
cipher suites and key share, ServerHello with chosen cipher and key share +
Certificate + Finished, client Finished, then a representative encrypted
Application Data message.

Payloads show simplified field contents (cipher suite name, a fake but
realistic-looking certificate subject and issuer). Do not invent real crypto
math; the lesson is the message flow, not the algebra.

Add to glossary: TLS, cipher suite, certificate, certificate authority, key
exchange, ClientHello, ServerHello, encrypted application data.

**Verify:** scenario plays, certificate detail is inspectable and readable.

### Step 5 — The composite: "Open https://example.com"

Add a fifth scenario that chains all four protocols into one end-to-end
narrative. This is the headline demo.

Add a layering panel: a small stacked-rectangles diagram on the right side
that, at each step, highlights which OSI/TCP-IP layers are active (e.g.
during the DNS phase, application + UDP + IP are lit; during TLS handshake,
application + TLS + TCP + IP are lit). When the user clicks a layer, the
narration explains what that layer contributes.

The scenario should visually segment into four phases (DNS → TCP → TLS →
HTTP) with a phase indicator above the canvas. The user can scrub through
the whole thing or jump to a phase.

Confirm the root `index.html` portal still has `protocol-lab` at the **top**
of the tool list with a one-line description.

**Verify:** full composite scenario plays end to end, phase indicator updates,
layering panel highlights correctly at each step, navigation back to other
scenarios still works, Toolshelf button still returns to portal.

## Out of scope for this MVP

Do not build any of these, even if they seem like natural additions:
BGP, traceroute, UDP-specific scenarios, QUIC, WebSockets, IPv6, NAT,
subnetting, SMTP/IMAP, ARP, Ethernet, real packet capture, user-authored
scenarios, quizzes, multi-user, persistence, login. Note any you're tempted
by in a `FUTURE.md` file inside `protocol-lab/` and move on.

## Quality bar

This tool will sit next to `trig-viz` and `fourier-lab` in the same repo.
It must feel like it belongs there — same typographic polish, same
two-column rhythm, same "play with controls and feel the concept" pedagogy.
If a step's animation feels janky or its narration feels like a textbook
paragraph, fix it before moving on. The narration voice should be plain,
conversational, and assume an intelligent learner who is new to networking.

**Start by reading CLAUDE.md, then begin step 1.**
