# Protocol Lab — Out of scope for v1

Things that would be natural additions but were intentionally left out of the
first version, so the MVP stayed focused on the four foundational protocols.

## Scenarios considered

- **UDP-specific** (NTP, QUIC handshake, DTLS) — UDP shows up only as the
  DNS transport today. A dedicated UDP scenario with packet loss + no
  retransmit would contrast nicely with TCP.
- **HTTP/2 multiplexing** — show a single connection carrying several
  concurrent streams.
- **HTTP/3 / QUIC** — UDP-based transport, 0-RTT handshake, stream
  multiplexing without head-of-line blocking. A great follow-up once
  HTTP/2 lands.
- **WebSockets upgrade** — HTTP/1.1 `Upgrade: websocket` flow, then
  bidirectional framed messages.
- **Traceroute / TTL expiry** — show ICMP Time Exceeded responses as a
  packet's TTL counts down hop-by-hop.
- **BGP route announcements** — autonomous systems peering, prefix
  advertisements, path selection.
- **ARP / Ethernet** — the link-layer story we hand-wave today. Could
  pair with a NAT scenario to show how IP addresses change at the gateway.
- **SMTP / IMAP** — an email send + retrieve walk-through.
- **OCSP / CT logs** — what actually happens during certificate validation.
- **IPv6, subnetting, CIDR** — addressing fundamentals that complement
  the protocol scenarios.

## Engine features considered

- **User-authored scenarios** — a JSON/YAML editor or import mechanism so
  visitors can build their own.
- **Quiz mode** — given a payload, identify which protocol and step it
  belongs to.
- **Replay timeline** — a horizontal timeline showing all steps with
  their relative durations.
- **Real packet capture import** — drop a `.pcap` file, watch it animate.
  Would need a JS parser like pcapjs and significant UI for filter/
  selection.
- **Multiple parallel packets** — show e.g. HTTP/2 streams interleaved.
- **Speed-of-light delays** — visually represent realistic RTTs based on
  physical distance between nodes.

## Pedagogy ideas

- **"Why did this fail?" troubleshooting scenarios** — DNS NXDOMAIN, TLS
  handshake failure (cert expired / hostname mismatch), TCP RST.
- **Per-layer deep dives** — a separate page per layer with its own
  scenarios.
