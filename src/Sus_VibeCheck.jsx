import React, { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// SUS — an AI vibe check for short-form video
// Swipe LEGIT (right) or SUS (left). Then learn the tells.
// A Media & Information Literacy prototype.
// ============================================================

const DECK = [
  {
    id: 1,
    handle: "@daily_brief_now",
    caption: "🚨 BREAKING: Officials confirm nationwide policy change effective tomorrow",
    likes: "412K", comments: "9,204", scene: "📺",
    gradient: "linear-gradient(160deg,#16213e,#0f3460 60%,#3a0d2e)",
    verdict: "sus",
    tactic: "Synthetic authority",
    tells: [
      "Anchor blinks at a fixed, unnatural rhythm",
      "Lip movement drifts ~0.2s behind the audio",
      "No masthead, no named outlet, no reporter byline",
      "Studio lighting is flawless — too clean for live news",
    ],
    tip: "Real breaking news is carried by more than one named outlet. Search the claim before you trust the face.",
  },
  {
    id: 2,
    handle: "@truth.unfiltered",
    caption: "Happening RIGHT NOW in our streets 🇺🇸 they don't want you to see this",
    likes: "1.1M", comments: "22,940", scene: "🔥",
    gradient: "linear-gradient(160deg,#3d2c1e,#5a4632 55%,#1c1c1c)",
    verdict: "sus",
    tactic: "Out-of-context recycling",
    tells: [
      "Reverse image search dates the footage to 2019",
      "Signage in the background is in another language",
      "Caption swaps the real location for a trending one",
      "Account posts 'happening now' clips daily",
    ],
    tip: "Real footage, fake caption is the most common trick. Check when and where it actually happened.",
  },
  {
    id: 3,
    handle: "@baileythecorgi",
    caption: "she finally learned to ring the bell for treats 🐶🔔",
    likes: "88K", comments: "1,203", scene: "🐕",
    gradient: "linear-gradient(160deg,#f6c453,#e8833a 60%,#b5651d)",
    verdict: "legit",
    tactic: null,
    tells: [
      "Consistent lighting, shadows, and motion physics",
      "Creator has years of the same dog, same apartment",
      "No claim, no urgency, nothing to sell you",
      "Casual imperfections a generator wouldn't add",
    ],
    tip: "Not everything is fake. Over-suspicion is its own failure — genuine content has a history and nothing to push.",
  },
  {
    id: 4,
    handle: "@crypto_wealth_live",
    caption: "I'm giving back to my fans — send 1 ETH, get 2 back. Link in bio 🤝",
    likes: "204K", comments: "5,551", scene: "💰",
    gradient: "linear-gradient(160deg,#1a1a1a,#3d3416 55%,#0d0d0d)",
    verdict: "sus",
    tactic: "Voice-clone scam",
    tells: [
      "Voice cadence is flat, no natural breaths",
      "Mouth shapes don't match the harder consonants",
      "Classic 'send money, get double' urgency hook",
      "The 'celebrity' never says today's date or anything specific",
    ],
    tip: "If a famous voice asks you to send money to get more back, it's cloned. Always. No exceptions.",
  },
  {
    id: 5,
    handle: "@realpolitics247",
    caption: "He actually SAID this on camera and the media is silent 😳",
    likes: "670K", comments: "18,002", scene: "🎙️",
    gradient: "linear-gradient(160deg,#241b3a,#3b2a5c 55%,#101725)",
    verdict: "sus",
    tactic: "Deepfake face-swap",
    tells: [
      "Faint shimmer along the jaw and hairline",
      "Teeth blur into a smear when he speaks fast",
      "Skin tone doesn't quite match the neck",
      "No credible outlet is reporting a quote this explosive",
    ],
    tip: "A shocking quote no real newsroom is covering is a red flag. Watch the edges of the face for warping.",
  },
  {
    id: 6,
    handle: "@exposed.daily",
    caption: "Is he okay?? He can barely stand 😟 #concerned",
    likes: "533K", comments: "14,870", scene: "🥴",
    gradient: "linear-gradient(160deg,#1f3324,#2f4a35 55%,#12160f)",
    verdict: "sus",
    tactic: "Cheapfake (speed edit)",
    tells: [
      "Audio pitch is dropped — a tell of slowed footage",
      "Everyone in the background also moves in slow-mo",
      "The original clip runs at normal speed",
      "Framed to imply 'drunk' without saying it",
    ],
    tip: "You don't need AI to lie. Slowing a clip to fake impairment is a 'cheapfake' — check the audio pitch.",
  },
  {
    id: 7,
    handle: "@studywithlina",
    caption: "the 2-minute method that finally made flashcards work for me 📚",
    likes: "142K", comments: "2,340", scene: "📖",
    gradient: "linear-gradient(160deg,#ff8a7a,#ffd6c9 55%,#f6efe6)",
    verdict: "legit",
    tactic: null,
    tells: [
      "Real hands, real desk, real natural pauses",
      "Advice is checkable and low-stakes",
      "Creator's back catalogue is consistent",
      "No manufactured outrage or urgency",
    ],
    tip: "Legit content usually asks nothing of your emotions. Calm, specific, and verifiable is a good sign.",
  },
  {
    id: 8,
    handle: "@world_alerts",
    caption: "Wildfire reaches the city limits — pray for them 🙏🔥",
    likes: "980K", comments: "31,110", scene: "🌆",
    gradient: "linear-gradient(160deg,#5a1e0e,#a83318 55%,#2b0a05)",
    verdict: "sus",
    tactic: "Synthetic disaster footage",
    tells: [
      "Smoke plume loops in a repeating pattern",
      "Building edges warp and melt at the skyline",
      "No geolocation, no local outlet, no cross-post",
      "Engineered to farm shares through fear",
    ],
    tip: "AI disaster clips spread on fear. Real emergencies have local news, official alerts, and a findable place.",
  },
  {
    id: 9,
    handle: "@gotcha.clips",
    caption: "She admits the whole thing was a lie 🤯 (wait for it)",
    likes: "445K", comments: "12,003", scene: "✂️",
    gradient: "linear-gradient(160deg,#0e3b3b,#155e5e 55%,#08201f)",
    verdict: "sus",
    tactic: "Deceptive editing",
    tells: [
      "Hard cut lands mid-sentence, before the point",
      "The question she's answering was removed",
      "Audio jumps — the clip is stitched",
      "Uploader has an obvious axe to grind",
    ],
    tip: "A clip that starts mid-answer is hiding the setup. Find the full, unedited source before you react.",
  },
  {
    id: 10,
    handle: "@courtside.reels",
    caption: "buzzer beater from the logo to win game 6 🤯🏀",
    likes: "760K", comments: "8,900", scene: "🏀",
    gradient: "linear-gradient(160deg,#1d6b3a,#2fa35a 55%,#0c2f1a)",
    verdict: "legit",
    tactic: null,
    tells: [
      "Crowd, commentary, and scoreboard all line up",
      "Multiple angles of the same moment exist online",
      "Covered by real sports outlets minutes later",
      "Physics of the ball and players are consistent",
    ],
    tip: "Big real moments get filmed from many angles and picked up fast. Cross-checking confirms it in seconds.",
  },
];

const THRESHOLD = 110;

export default function App() {
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [flyDir, setFlyDir] = useState(0);
  const [phase, setPhase] = useState("swiping"); // swiping | revealed | done
  const [reveal, setReveal] = useState(null);

  const [correct, setCorrect] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [missed, setMissed] = useState([]); // {tactic, verdict, handle}

  const startX = useRef(0);
  const card = DECK[index];

  const commit = useCallback(
    (guess) => {
      if (phase !== "swiping" || !card) return;
      const isCorrect = guess === card.verdict;
      setFlyDir(guess === "legit" ? 1 : -1);
      setAnswered((a) => a + 1);
      if (isCorrect) {
        setCorrect((c) => c + 1);
        setStreak((s) => {
          const ns = s + 1;
          setBestStreak((b) => Math.max(b, ns));
          return ns;
        });
      } else {
        setStreak(0);
        setMissed((m) => [...m, { tactic: card.tactic || "Genuine content", verdict: card.verdict, handle: card.handle }]);
      }
      setReveal({ card, guess, isCorrect });
      setPhase("revealed");
    },
    [phase, card]
  );

  const next = useCallback(() => {
    setDragX(0);
    setFlyDir(0);
    setReveal(null);
    if (index + 1 >= DECK.length) {
      setPhase("done");
    } else {
      setIndex((i) => i + 1);
      setPhase("swiping");
    }
  }, [index]);

  const restart = () => {
    setIndex(0); setDragX(0); setDragging(false); setFlyDir(0);
    setPhase("swiping"); setReveal(null);
    setCorrect(0); setAnswered(0); setStreak(0); setBestStreak(0); setMissed([]);
  };

  // pointer drag
  const onDown = (e) => {
    if (phase !== "swiping") return;
    setDragging(true);
    startX.current = e.clientX;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    if (!dragging) return;
    setDragX(e.clientX - startX.current);
  };
  const onUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (dragX > THRESHOLD) commit("legit");
    else if (dragX < -THRESHOLD) commit("sus");
    else setDragX(0);
  };

  // keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (phase === "swiping") {
        if (e.key === "ArrowLeft") commit("sus");
        if (e.key === "ArrowRight") commit("legit");
      } else if (phase === "revealed") {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); next(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, commit, next]);

  const rot = dragX * 0.05;
  const legitOpacity = Math.max(0, Math.min(1, dragX / THRESHOLD));
  const susOpacity = Math.max(0, Math.min(1, -dragX / THRESHOLD));
  const cardTransform = flyDir
    ? `translateX(${flyDir * 800}px) rotate(${flyDir * 22}deg)`
    : `translateX(${dragX}px) rotate(${rot}deg)`;

  const accuracy = answered ? Math.round((correct / answered) * 100) : 0;

  return (
    <div className="sus-root">
      <style>{CSS}</style>

      <header className="topbar">
        <div className="brand">
          <span className="logo">sus</span>
          <span className="tagline">an ai vibe check</span>
        </div>
        <div className="stats">
          <div className="stat"><span className="snum">{answered ? accuracy : "—"}<span className="pct">%</span></span><span className="slab">accuracy</span></div>
          <div className="stat"><span className="snum" style={{ color: streak >= 2 ? "var(--legit)" : "var(--txt)" }}>{streak}🔥</span><span className="slab">streak</span></div>
        </div>
      </header>

      {phase !== "done" && (
        <>
          <div className="progress">
            {DECK.map((_, i) => (
              <span key={i} className={"pdot" + (i < index ? " done" : i === index ? " now" : "")} />
            ))}
          </div>

          <div className="stage">
            {/* next card peeking */}
            {DECK[index + 1] && (
              <div className="card peek" style={{ background: DECK[index + 1].gradient }} aria-hidden>
                <div className="scrim" />
              </div>
            )}

            {/* active card */}
            {card && (
              <div
                className={"card active" + (dragging ? " grabbing" : "") + (flyDir ? " flying" : "")}
                style={{ background: card.gradient, transform: cardTransform, transition: dragging ? "none" : "transform .35s cubic-bezier(.2,.8,.2,1)" }}
                onPointerDown={onDown}
                onPointerMove={onMove}
                onPointerUp={onUp}
                onPointerCancel={onUp}
              >
                <div className="scrim" />
                <div className="scene">{card.scene}</div>

                <div className="stamp legit" style={{ opacity: legitOpacity }}>LEGIT</div>
                <div className="stamp sus" style={{ opacity: susOpacity }}>SUS</div>

                <div className="ui-rail">
                  <div className="rail-ic">❤<span>{card.likes}</span></div>
                  <div className="rail-ic">💬<span>{card.comments}</span></div>
                  <div className="rail-ic">↗<span>share</span></div>
                </div>

                <div className="meta">
                  <div className="handle">{card.handle}</div>
                  <div className="caption">{card.caption}</div>
                  <div className="playbar"><span /></div>
                </div>
              </div>
            )}
          </div>

          <div className="actions">
            <button className="act act-sus" onClick={() => commit("sus")} disabled={phase !== "swiping"}>
              <span className="act-ic">✕</span> Sus
            </button>
            <div className="hint">drag or use ← →</div>
            <button className="act act-legit" onClick={() => commit("legit")} disabled={phase !== "swiping"}>
              <span className="act-ic">✓</span> Legit
            </button>
          </div>
        </>
      )}

      {/* REVEAL */}
      {phase === "revealed" && reveal && (
        <div className="sheet-wrap">
          <div className="sheet">
            <div className={"verdict-bar " + (reveal.isCorrect ? "good" : "bad")}>
              <span className="vb-tag">{reveal.isCorrect ? "Nice catch" : "Got you"}</span>
              <span className="vb-truth">
                Actually <b>{reveal.card.verdict === "sus" ? "SUS" : "LEGIT"}</b>
                {reveal.card.tactic ? ` · ${reveal.card.tactic}` : ""}
              </span>
            </div>

            <div className="scanhead">
              <span className="dot" /> forensic readout
            </div>
            <ul className="tells">
              {reveal.card.tells.map((t, i) => (
                <li key={i}><span className="tno">{String(i + 1).padStart(2, "0")}</span>{t}</li>
              ))}
            </ul>

            <div className="tip"><span className="tip-k">spot it next time</span>{reveal.card.tip}</div>

            <button className="next" onClick={next}>
              {index + 1 >= DECK.length ? "See your results" : "Next clip"} →
            </button>
          </div>
        </div>
      )}

      {/* RESULTS */}
      {phase === "done" && (
        <div className="results">
          <div className="res-score">
            <span className="big">{accuracy}<span className="pct">%</span></span>
            <span className="res-lab">{correct} of {answered} clips read correctly</span>
          </div>

          <div className="res-grid">
            <div className="res-cell"><span className="rc-num">{bestStreak}🔥</span><span className="rc-lab">best streak</span></div>
            <div className="res-cell"><span className="rc-num">{missed.length}</span><span className="rc-lab">tricks that fooled you</span></div>
          </div>

          <div className="verdict-label">{judge(accuracy)}</div>

          {missed.length > 0 && (
            <div className="blindspots">
              <div className="bs-head">your blind spots</div>
              {dedupe(missed.map((m) => m.tactic)).map((t) => (
                <span key={t} className="bs-chip">{t}</span>
              ))}
            </div>
          )}

          <button className="next" onClick={restart}>Run it back ↺</button>
          <p className="foot">A Media &amp; Information Literacy prototype · built for the UNESCO Youth Hackathon 2026</p>
        </div>
      )}
    </div>
  );
}

function judge(acc) {
  if (acc >= 90) return "Elite radar. Fakes don't get past you.";
  if (acc >= 70) return "Sharp eye — a few slipped through.";
  if (acc >= 50) return "Coin-flip territory. The tells are learnable.";
  return "The feed is winning. Good thing that's fixable.";
}
function dedupe(a) { return [...new Set(a)]; }

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');

.sus-root{
  --ink:#0E0B16; --surface:#1A1526; --txt:#F5F0FF; --muted:#8B82A8;
  --sus:#FF3D7F; --legit:#2DE2C5; --line:rgba(245,240,255,.09);
  max-width:440px; margin:0 auto; min-height:640px;
  background:radial-gradient(120% 80% at 50% -10%, #241a3a 0%, var(--ink) 55%);
  color:var(--txt); font-family:'Inter',system-ui,sans-serif;
  padding:18px 18px 22px; position:relative; overflow:hidden;
  border-radius:22px; user-select:none;
}
.sus-root *{box-sizing:border-box}

.topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.brand{display:flex;flex-direction:column;line-height:1}
.logo{font-family:'Space Grotesk';font-weight:700;font-size:30px;letter-spacing:-1.5px;
  background:linear-gradient(90deg,var(--sus),var(--legit));-webkit-background-clip:text;background-clip:text;color:transparent}
.tagline{font-family:'Space Mono';font-size:10px;color:var(--muted);letter-spacing:1.5px;text-transform:uppercase;margin-top:3px}
.stats{display:flex;gap:16px}
.stat{display:flex;flex-direction:column;align-items:flex-end}
.snum{font-family:'Space Grotesk';font-weight:600;font-size:20px}
.pct{font-size:12px;color:var(--muted)}
.slab{font-family:'Space Mono';font-size:9px;color:var(--muted);text-transform:uppercase;letter-spacing:1px}

.progress{display:flex;gap:5px;margin-bottom:14px}
.pdot{height:3px;flex:1;border-radius:3px;background:var(--line);transition:.3s}
.pdot.done{background:var(--muted)}
.pdot.now{background:linear-gradient(90deg,var(--sus),var(--legit))}

.stage{position:relative;height:430px;margin-bottom:16px}
.card{position:absolute;inset:0;border-radius:20px;overflow:hidden;
  box-shadow:0 30px 60px -20px rgba(0,0,0,.7);will-change:transform}
.card.peek{transform:scale(.94) translateY(10px);filter:brightness(.7)}
.card.active{cursor:grab;touch-action:none}
.card.active.grabbing{cursor:grabbing}
.scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.15) 0%,transparent 30%,transparent 55%,rgba(0,0,0,.82) 100%)}
.scene{position:absolute;top:46%;left:50%;transform:translate(-50%,-50%);font-size:96px;filter:drop-shadow(0 8px 24px rgba(0,0,0,.5));opacity:.92}

.ui-rail{position:absolute;right:12px;bottom:120px;display:flex;flex-direction:column;gap:16px;align-items:center}
.rail-ic{display:flex;flex-direction:column;align-items:center;gap:3px;font-size:22px;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.6)}
.rail-ic span{font-family:'Space Mono';font-size:10px;opacity:.85}

.meta{position:absolute;left:16px;right:64px;bottom:18px}
.handle{font-family:'Space Grotesk';font-weight:600;font-size:15px;margin-bottom:5px;text-shadow:0 2px 8px rgba(0,0,0,.6)}
.caption{font-size:13.5px;line-height:1.4;color:#f3eeff;text-shadow:0 2px 10px rgba(0,0,0,.7)}
.playbar{margin-top:12px;height:3px;background:rgba(255,255,255,.25);border-radius:3px;overflow:hidden}
.playbar span{display:block;height:100%;width:38%;background:#fff;border-radius:3px}

.stamp{position:absolute;top:26px;font-family:'Space Grotesk';font-weight:700;font-size:34px;
  letter-spacing:1px;padding:6px 14px;border-radius:10px;border:3px solid;pointer-events:none}
.stamp.legit{right:20px;transform:rotate(12deg);color:var(--legit);border-color:var(--legit);text-shadow:0 0 20px rgba(45,226,197,.5)}
.stamp.sus{left:20px;transform:rotate(-12deg);color:var(--sus);border-color:var(--sus);text-shadow:0 0 20px rgba(255,61,127,.5)}

.actions{display:flex;align-items:center;justify-content:space-between;gap:12px}
.act{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:15px 0;border-radius:15px;
  font-family:'Space Grotesk';font-weight:600;font-size:16px;border:1.5px solid;background:transparent;cursor:pointer;transition:.16s}
.act:disabled{opacity:.35;cursor:default}
.act-ic{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;font-size:13px}
.act-sus{color:var(--sus);border-color:rgba(255,61,127,.5)}
.act-sus .act-ic{background:rgba(255,61,127,.15)}
.act-sus:not(:disabled):hover{background:rgba(255,61,127,.12);border-color:var(--sus)}
.act-legit{color:var(--legit);border-color:rgba(45,226,197,.5)}
.act-legit .act-ic{background:rgba(45,226,197,.15)}
.act-legit:not(:disabled):hover{background:rgba(45,226,197,.12);border-color:var(--legit)}
.hint{font-family:'Space Mono';font-size:9.5px;color:var(--muted);text-align:center;white-space:nowrap;letter-spacing:.5px}

.sheet-wrap{position:absolute;inset:0;background:rgba(8,6,14,.6);backdrop-filter:blur(3px);
  display:flex;align-items:flex-end;z-index:5;animation:fade .2s ease}
.sheet{width:100%;background:var(--surface);border-top:1px solid var(--line);
  border-radius:22px 22px 0 0;padding:20px 20px 22px;box-shadow:0 -20px 50px rgba(0,0,0,.6);animation:rise .32s cubic-bezier(.2,.85,.25,1)}
@keyframes rise{from{transform:translateY(100%)}to{transform:translateY(0)}}
@keyframes fade{from{opacity:0}to{opacity:1}}

.verdict-bar{display:flex;flex-direction:column;gap:3px;padding:12px 14px;border-radius:12px;margin-bottom:16px}
.verdict-bar.good{background:rgba(45,226,197,.12);border:1px solid rgba(45,226,197,.35)}
.verdict-bar.bad{background:rgba(255,61,127,.12);border:1px solid rgba(255,61,127,.35)}
.vb-tag{font-family:'Space Grotesk';font-weight:700;font-size:17px}
.verdict-bar.good .vb-tag{color:var(--legit)}
.verdict-bar.bad .vb-tag{color:var(--sus)}
.vb-truth{font-size:12.5px;color:var(--muted)}
.vb-truth b{color:var(--txt)}

.scanhead{display:flex;align-items:center;gap:8px;font-family:'Space Mono';font-size:10px;
  text-transform:uppercase;letter-spacing:2px;color:var(--muted);margin-bottom:10px}
.scanhead .dot{width:7px;height:7px;border-radius:50%;background:var(--legit);box-shadow:0 0 10px var(--legit);animation:pulse 1.4s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
.tells{list-style:none;padding:0;margin:0 0 16px;display:flex;flex-direction:column;gap:9px}
.tells li{display:flex;gap:11px;font-size:13px;line-height:1.35;color:#d9d2ec;font-family:'Space Mono'}
.tno{color:var(--sus);font-weight:700;flex-shrink:0}

.tip{background:rgba(245,240,255,.04);border:1px solid var(--line);border-radius:12px;padding:12px 14px;
  font-size:13px;line-height:1.45;color:#e6dffa;margin-bottom:16px}
.tip-k{display:block;font-family:'Space Mono';font-size:9px;text-transform:uppercase;letter-spacing:1.5px;color:var(--legit);margin-bottom:5px}

.next{width:100%;padding:15px;border:none;border-radius:14px;cursor:pointer;
  font-family:'Space Grotesk';font-weight:600;font-size:15px;color:#0E0B16;
  background:linear-gradient(90deg,var(--legit),#5af0d8)}
.next:hover{filter:brightness(1.06)}

.results{text-align:center;padding:26px 6px;animation:fade .3s ease}
.res-score{margin-bottom:22px}
.big{font-family:'Space Grotesk';font-weight:700;font-size:78px;letter-spacing:-3px;line-height:1;
  background:linear-gradient(90deg,var(--sus),var(--legit));-webkit-background-clip:text;background-clip:text;color:transparent}
.big .pct{font-size:34px}
.res-lab{display:block;color:var(--muted);font-size:13px;margin-top:8px}
.res-grid{display:flex;gap:12px;margin-bottom:20px}
.res-cell{flex:1;background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px 8px;display:flex;flex-direction:column;gap:4px}
.rc-num{font-family:'Space Grotesk';font-weight:700;font-size:26px}
.rc-lab{font-family:'Space Mono';font-size:9.5px;text-transform:uppercase;letter-spacing:1px;color:var(--muted)}
.verdict-label{font-family:'Space Grotesk';font-weight:500;font-size:17px;margin-bottom:20px;color:#efeaff;padding:0 10px}
.blindspots{margin-bottom:22px}
.bs-head{font-family:'Space Mono';font-size:10px;text-transform:uppercase;letter-spacing:2px;color:var(--muted);margin-bottom:10px}
.bs-chip{display:inline-block;margin:4px;padding:7px 12px;border-radius:20px;font-size:12px;
  background:rgba(255,61,127,.12);border:1px solid rgba(255,61,127,.3);color:#ffc4d9;font-weight:500}
.foot{font-family:'Space Mono';font-size:9.5px;color:var(--muted);margin-top:18px;line-height:1.6;letter-spacing:.3px}

@media (prefers-reduced-motion: reduce){
  .card,.sheet,.sheet-wrap,.results{animation:none!important;transition:none!important}
  .scanhead .dot{animation:none}
}
`;
