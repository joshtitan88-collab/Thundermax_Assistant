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

### Host the frontend ON the tower (recommended — same-origin, no CORS/CSP)

Drop your built frontend (Fable5 output — `index.html`, JS, CSS, assets) into the
repo's **`web/`** folder. The API server serves it at the root, same-origin with
`/api/*`, so the frontend can use a **relative** API base (`""`) and there are no
cross-origin or CSP issues at all:

```
web/index.html      ->  http://server-tower:8181/
web/assets/app.js   ->  http://server-tower:8181/assets/app.js
```

A working starter chat UI already lives in `web/index.html` (open
`http://100.81.182.127:8181/`). Replace it with your Fable5 build; unknown routes
fall back to `index.html` for client-side routing. After changing files under
`web/`, no restart is needed (static files are read per request); after editing
`src/`, `sudo systemctl restart tmax-api`.

> A **claude.ai Artifact** frontend can't reach the tower (sandbox CSP blocks
> external hosts) — hosting it here on the tower sidesteps that entirely.

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
