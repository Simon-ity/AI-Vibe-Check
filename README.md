# Sus

A Media & Information Literacy (MIL) game for the **UNESCO Youth Hackathon 2026**.

Swipe **Legit** (right) or **Sus** (left) on short-form video cards. After each swipe, a
forensic readout reveals the true verdict, the specific tells, and the manipulation tactic.
The goal is to train the human reflex: *pause, judge, then verify.*

Audience: 18–30, mobile-native. Designed to be swiped on a phone.

## Design principles

1. **Not everything is fake.** The deck deliberately mixes genuine clips with manipulated ones.
   Calibrated skepticism is the lesson; blanket paranoia is a failure mode the game teaches against.
2. **Sus teaches humans; it is not an auto-detector.** Verdicts and tells are hand-authored
   content — the game never claims to auto-detect fakes or fact-check clips automatically.

## Status

Working prototype in `src/Sus_VibeCheck.jsx` — a single self-contained React component
(injected CSS + Google Fonts, no dependencies beyond React). Mechanics done: pointer-drag
swipe with rotation + LEGIT/SUS stamps, keyboard (`←`/`→`), button fallbacks, forensic-readout
reveal, and accuracy + streak + "blind spots" scoring.

## Next milestone

Convert the prototype into a deployable single-file `index.html` at the repo root:
mobile-first, self-contained (inline CSS/JS), an intro screen, and an end-of-round share card.
Deploy target: **Vercel**. Keep `main` always demo-able.
