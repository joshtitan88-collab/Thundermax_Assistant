# Thunderbench — marketing landing page

A single self-contained page: `index.html`. No build step, no `npm install`,
no routing. React 18 + Tailwind, both from CDN, JSX compiled in the browser.

```bash
# view it
python3 -m http.server 8913 --bind 127.0.0.1 --directory marketing
# then open http://127.0.0.1:8913/index.html
```

## Before this goes anywhere public

Three things in here are **invented placeholder content** and must be replaced
with real figures or removed. They are marketing copy, not measurements, and
nothing in this repo backs them up:

| where | what's fake |
|---|---|
| `STATS` | `2,400+ riders`, `18,000 tunes decoded`, `4.9/5 rating` |
| `SHOPS` | all six shop names are made up |
| features / how-it-works | describes the intended product, not what ships today |

The one stat that is *not* invented is **`0` .tbw files ever modified** — that
is the project's hard rule #2 and it holds.

The shop names are deliberately fictional. Real logos would read as
endorsements that were never given. The footer carries the matching
disclaimer: not affiliated with Harley-Davidson or ThunderMax.

## Why the CDN versions are pinned

`@babel/standalone` 8 changed `preset-react`'s default to the **automatic**
JSX runtime, which emits `import ... from "react/jsx-runtime"`. That cannot
resolve against the UMD `React` global this page loads, and the page renders
**blank** with no visible error. Pinned to `7.26.4`, which keeps the classic
`React.createElement` output.

If you ever unpin it, check the page still renders — a syntax check will not
catch this.

## Section order

Built Hero → Social proof → Features → How it works → Stats → CTA → Footer.
The brief listed Features first and the Footer in the middle; that conflicts
with wanting the CTA above the fold, so the conventional order won.

## Verifying a change

```bash
# compile + server-render + assert every section is present
node <scratch>/render.js marketing/index.html
# real browser, console errors, desktop + mobile screenshots
node <scratch>/shot.js
```

Those harness scripts live in the job scratch dir, not the repo. The cheap
version: open the page and confirm it is not blank.
