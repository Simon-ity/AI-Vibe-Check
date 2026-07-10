# Sus — an AI vibe check for short-form video

Swipe **Legit** or **Sus** on a feed of short-form clips. Guess wrong and the app
flips into a forensic readout showing the actual verdict, the specific tells, and
the manipulation tactic at play. It trains the one reflex that matters online:
*pause, judge, then check.*

A **Media & Information Literacy (MIL)** game built for the
**UNESCO Youth Hackathon 2026** — "Play Your Part: Youth Designing the Future of MIL."

---

## Why this exists

Most media-literacy tools obsess over articles and images. But youth misinformation
actually travels through **short-form video** — TikTok, Reels, Shorts. Sus meets people
where the problem lives and teaches detection through the swipe mechanic they already use.

Two design choices carry the whole idea:

- **Not everything is fake.** The deck mixes genuine clips in with the fakes. Trusting
  *nothing* is as broken as trusting everything — so the game rewards calibrated
  skepticism, not blanket paranoia.
- **It teaches humans, it isn't an AI oracle.** Sus doesn't claim to auto-detect fakes.
  It builds the human's radar. That's an honest promise — and a durable one.

The full manipulation spectrum is represented: AI deepfakes, voice clones, out-of-context
recycling, cheapfakes (slowed footage — no AI needed), synthetic disaster footage, and
deceptive editing.

---

## Tech

- React (single-component prototype), no build dependencies beyond React itself
- Self-contained styling (injected CSS + Google Fonts), theme via CSS variables
- Pointer-drag swipe physics with keyboard (`←` / `→`) and button fallbacks
- Respects `prefers-reduced-motion`

## Run it

The current prototype lives in [`src/Sus_VibeCheck.jsx`](src/Sus_VibeCheck.jsx) as a
default-exported React component. Drop it into any React sandbox (Vite, CodeSandbox,
Claude Artifacts) and it runs.

A deployable **single-file `index.html`** version (Vercel-ready, mobile-first) is the
next milestone — see the roadmap.

---

## Roadmap

- [x] Swipe mechanic + forensic-readout reveal
- [x] Balanced deck (genuine + manipulated clips)
- [x] Accuracy, streak, and "blind spots" scoring
- [ ] Single-file `index.html` build for Vercel deploy
- [ ] Landing / intro screen for cold visitors
- [ ] Share card + QR at end of round
- [ ] Real short-form clips swapped in for the mock cards
- [ ] Expand deck; tag each card by tactic for a "weakest tactic" report

---

## Collaborating

Two-person hackathon split that tends to work well:

- **Build track** — swipe engine, deploy pipeline, share/QR flow
- **Content track** — the deck (clips, tells, tactics), copy, and the pitch video

Workflow: branch per feature (`feat/intro-screen`), open a PR, quick review, merge.
Keep `main` always demo-able — you never know when a judge opens the link.

## License

MIT — see [LICENSE](LICENSE).

---

*Built for the UNESCO Youth Hackathon 2026.*
