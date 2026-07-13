# ThunderMax Assistant — Frontend API

The tuning assistant (model auto-routing + RAG grounding + learn/sync) is served
over HTTP by `src/api_server.py`, running as the **`tmax-api`** systemd service.
No pip deps; CORS is open so a browser app can call it directly.

## Base URL

Reachable from any device on your LAN or Tailscale (internet is firewalled off):

| From | URL |
|------|-----|
| the tower itself | `http://127.0.0.1:8181` |
| Tailscale (any tailnet device) | `http://100.81.182.127:8181` |
| LAN | `http://192.168.1.245:8181` |

> If the frontend runs as a **claude.ai Artifact**, its sandbox CSP blocks calls
> to external hosts — run the frontend as a normal local web app (or on the
> tower) so it can reach these URLs.

## Endpoints

| Method | Path | Body | Returns |
|--------|------|------|---------|
| GET  | `/api/health`  | — | `{ok, models:{fast,deep}, profile, modes}` |
| GET  | `/api/profile` | — | the bike-setup profile |
| POST | `/api/ask`     | `{question, mode?}` | **NDJSON stream** |
| POST | `/api/chat`    | `{messages:[{role,content}], mode?}` | **NDJSON stream** |
| POST | `/api/analyze` | `{file, baseline?, mode?}` | **NDJSON stream** |
| POST | `/api/learn`   | `{text, title?, setup?}` | `{ok, doc, setup}` |
| POST | `/api/sync`    | `{path, baseline?}` | `{ok, matched, skipped, base_map_ids}` |

- `mode` (optional): `"auto"` (default — classifier picks), `"fast"` (14B, snappy),
  `"deep"` (70B, slow but smarter). `analyze` defaults to `"deep"`.
- `analyze`/`sync` take **server-side paths** (the tower reads the `.tbw` files;
  it never writes them).

## Streaming format (NDJSON)

`/api/ask`, `/api/chat`, `/api/analyze` stream **one JSON object per line**:

```
{"type":"model","model":"hermes3:70b","tier":"deep"}   ← first: which model answered
{"type":"token","t":"The "}                            ← many of these
{"type":"token","t":"rear "}
{"type":"done"}                                        ← end (or {"type":"error","error":"..."})
```

Show a ⚡ (fast) or 🧠 (deep) badge from the first `model` line, append each
`token.t`, stop on `done`.

## Copy-paste: streaming ask (works with POST + fetch)

```js
const API = "http://100.81.182.127:8181";      // or 127.0.0.1 on the tower

async function ask(question, { mode = "auto", onModel, onToken, onDone } = {}) {
  const res = await fetch(`${API}/api/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, mode }),
  });
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let nl;
    while ((nl = buf.indexOf("\n")) >= 0) {
      const line = buf.slice(0, nl).trim();
      buf = buf.slice(nl + 1);
      if (!line) continue;
      const msg = JSON.parse(line);
      if (msg.type === "model") onModel?.(msg);       // {model, tier}
      else if (msg.type === "token") onToken?.(msg.t);
      else if (msg.type === "done") onDone?.();
      else if (msg.type === "error") throw new Error(msg.error);
    }
  }
}

// usage
ask("why do I get decel pops above 4k rpm?", {
  onModel: m => setBadge(m.tier),           // "fast" | "deep"
  onToken: t => appendToChat(t),
  onDone:  () => finishMessage(),
});
```

Non-streaming calls are plain JSON:

```js
await fetch(`${API}/api/learn`, {
  method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: "Cruise 2600 rpm best at 13.9 AFR", title: "cruise AFR" }),
}).then(r => r.json());   // -> {ok:true, doc:"...", setup:"m8-131-..."}
```

## Service control

```bash
sudo systemctl status tmax-api      # health
sudo systemctl restart tmax-api     # after editing src/
journalctl -u tmax-api -f           # logs
```
