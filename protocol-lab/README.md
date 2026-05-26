# Protocol Lab

**Live Demo**: [https://vinovator.github.io/my-ai-tools/protocol-lab/index.html](https://vinovator.github.io/my-ai-tools/protocol-lab/index.html)

An interactive, animated explainer for the foundational internet protocols. Pick a scenario, press play, and watch packets fly between nodes with synced narration and a click-to-inspect view of every payload.

## Overview

A single-file pedagogical tool for "what actually happens when I open a URL?" Each scenario is a deterministic, scripted sequence of messages between nodes — no real network calls, no protocol implementation. The goal is clarity, not fidelity. Built on a small generic animation engine: scenarios are plain JS data, the engine renders nodes on a canvas, animates a labeled packet between any two nodes, and keeps the narration and payload inspector in sync.

## Scenarios

### 1. DNS Lookup
The recursive walk that turns `example.com` into `93.184.216.34`. Watch the resolver climb the hierarchy — root → TLD → authoritative — then cache and return. Toggle **Cache hit** to collapse the whole walk into a single round trip.

### 2. TCP Handshake & Teardown
The full lifecycle of a TCP connection: SYN, SYN+ACK, ACK, a couple of data exchanges with their ACKs, then a symmetric four-segment teardown. Each payload shows sequence numbers, ACK numbers, flags, and window size. Toggle **Drop the first SYN** to insert a visibly-lost packet (red, with an ✕) followed by a retransmit after the RTO fires.

### 3. HTTP Request / Response
Assumes a TCP connection is already open. The browser sends a GET; the server responds with `200 OK` and a small HTML body. The payload inspector shows the **literal HTTP bytes** — request line, headers, blank line, body — with CRLF line endings marked explicitly and request/status lines color-coded. The clearest single illustration in the whole tool of how plain-text HTTP really is.

### 4. TLS 1.3 Handshake
The four flights that turn an open TCP connection into a secure one: `ClientHello`, then `ServerHello + EncryptedExtensions + Certificate + CertificateVerify + Finished`, then client `Finished`, then a representative encrypted `Application Data` record. Cipher suites, key shares, and a realistic-looking certificate chain are all inspectable.

### 5. Open https://example.com (the composite)
The headline demo. Chains DNS → TCP → TLS → HTTP into a single end-to-end narrative. A **phase indicator** above the canvas segments the run into the four phases (click to jump). A **layer stack panel** beside the canvas lights up the active layers at each step (Application / TLS / Transport / Network / Link); click any layer for an explanation of what it contributes.

## Engine features

- **Data-driven scenarios** — each scenario is a plain JS object: `nodes`, `params`, `steps(params)`. Adding a new protocol means adding one entry to the `SCENARIOS` array.
- **Animated packet** — eased interpolation between nodes, with a trailing glow, color-coded for normal (amber) vs dropped (red) outcomes. Canvas handles device pixel ratio explicitly for crisp rendering on retina displays.
- **Transport bar** — play/pause, step forward, step back, scrub slider, 0.5× / 1× / 1.5× / 2× speed. Click the canvas to toggle play/pause.
- **Synced narration** — current step's narration is displayed below the canvas. Any term wrapped in `[[term]]` markup in the narration text gets a hover tooltip pulled from the shared glossary.
- **Payload inspector** — pretty-prints any nested JS object; for HTTP payloads, renders the raw text as a colored, monospaced block with explicit `\r\n` markers.
- **Glossary** — 25 terms covering DNS, TCP, HTTP, TLS, and the layer model. Searchable sidebar panel; inline tooltips wherever the term appears in narration.
- **Layer stack** *(composite scenario only)* — five stacked rectangles representing the TCP/IP stack; the layer corresponding to each step lights up with the protocol in use. Click a layer for an in-context explanation.

## Tech

- Single self-contained `index.html` — all CSS and JS inline
- React 18 + Babel Standalone via CDN (same pattern as `trig-viz` and `fourier-lab`)
- Canvas API for the animation
- No build step, no package manager, no server, no analytics

## Usage

Open `index.html` in any modern browser. No install required.

## Out of scope (v1)

See [FUTURE.md](./FUTURE.md) for scenarios and engine features intentionally left out of v1 — BGP, traceroute, HTTP/2 and HTTP/3, WebSockets, ARP, real packet capture, user-authored scenarios, quizzes.

## Pedagogical voice

Narration is plain, conversational, and assumes a curious learner who is new to networking. No textbook paragraphs, no jargon dropped without a glossary link.
