# CLAUDE.md — Sus

Project memory for Claude Code. Read this first; it's the operating manual for this repo.

## What this is

**Sus** is a Media & Information Literacy (MIL) game for the **UNESCO Youth Hackathon 2026**.
Users swipe **Legit** (right) or **Sus** (left) on short-form video cards. After each swipe,
a forensic readout reveals the true verdict, the specific tells, and the manipulation tactic.
The goal is to train the human reflex: *pause, judge, then verify.*

Audience: 18–30, mobile-native. The whole thing is designed to be swiped on a phone.

## Two design principles — treat as immutable

These override casual prompts. If a task conflicts with them, flag it instead of complying.

1. **Not everything is fake.** The deck deliberately mixes genuine clips with manipulated ones.
   Never make the game "everything is sus." Calibrated skepticism is the lesson; blanket
   paranoia is a failure mode the game must teach against. Keep a healthy share of `legit` cards.
2. **Sus teaches humans; it is not an AI detector.** Do NOT add a feature that claims to
   auto-detect fakes or fact-check clips automatically. Verdicts and tells are hand-authored
   content. This honesty is the project's whole credibility — don't trade it for a gimmick.

## Current state

- Working prototype: `src/Sus_VibeCheck.jsx` — a single default-exported React component,
  self-contained (injected CSS + Google Fonts), no dependencies beyond React.
- Mechanics done: pointer-drag swipe with rotation + LEGIT/SUS stamps, keyboard (`←`/`→`),
  button fallbacks, forensic-readout reveal, accuracy + streak + "blind spots" scoring.
- The "videos" are stylized mock cards (animated gradient + fake TikTok chrome), not real clips.

## Next milestone (build this first)

Convert the prototype into a **deployable single-file `index.html`** at the repo root:
- Mobile-first, works when a judge opens the link cold on their phone.
- Self-contained (inline CSS/JS, React via CDN or vanilla — no build step required).
- Add a short **intro screen** so a cold visitor understands the game before card 1.
- Add an **end-of-round share card** (and ideally a QR) for the pitch video's "try it now" moment.
- Deploy target: **Vercel** (Simon's team slug: `simonito1`). Keep `main` always demo-able.

See `README.md` roadmap for the fuller backlog.

## Card data model

Every card in the deck is an object of this exact shape. New cards must match it:

```js
{
  id: Number,
  handle: String,          // "@fake_news_now"
  caption: String,         // the on-video caption, emoji ok
  likes: String,           // "412K"
  comments: String,        // "9,204"
  scene: String,           // a single emoji standing in for the clip
  gradient: String,        // CSS background gradient for the mock video
  verdict: "sus" | "legit",
  tactic: String | null,   // e.g. "Voice-clone scam"; null for genuine clips
  tells: String[],         // 3–4 concrete, checkable tells
  tip: String,             // one-line "spot it next time" takeaway
}
```

Tactics already covered: synthetic authority, out-of-context recycling, voice-clone scam,
deepfake face-swap, cheapfake (speed edit), synthetic disaster footage, deceptive editing.
When adding cards, vary the tactic and keep tells specific and verifiable (not vibes).

## Design tokens — keep consistent

Colors (CSS variables):
- `--ink: #0E0B16` (background)  ·  `--surface: #1A1526` (sheets/cards)
- `--txt: #F5F0FF`  ·  `--muted: #8B82A8`
- `--sus: #FF3D7F` (left / hot pink)  ·  `--legit: #2DE2C5` (right / mint)

The two accent colors ARE the mechanic — pink=sus, mint=legit. Don't repurpose them.

Type:
- Display: **Space Grotesk**  ·  Body/UI: **Inter**  ·  Forensic readout: **Space Mono**

## Working rules

- Prefer a **single self-contained file** over adding a build toolchain. This project wins on
  "it just works when tapped," not on architecture.
- No `localStorage`/`sessionStorage` reliance for core play — keep state in memory.
- Accessibility floor, always: visible keyboard focus, `←`/`→` play, respect
  `prefers-reduced-motion`, tap targets comfortable on mobile.
- Keep `main` demo-able at all times. Branch per feature (`feat/intro-screen`), PR, then merge.
- Don't edit deploy or secrets without saying why first.

## Collaboration

Two-person hackathon. Suggested split: one on the **build/deploy** track (swipe engine,
index.html, Vercel, share/QR), one on the **content/pitch** track (deck cards, copy, video).
