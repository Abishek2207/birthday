import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';

/* ─── helpers ─────────────────────────────────────────── */
function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '255,255,255';
}

function GlowBtn({ color = '#ffffff', children, onClick, style = {} }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: '14px 40px',
        borderRadius: '40px',
        background: hover
          ? `rgba(${hexToRgb(color)}, 0.28)`
          : `rgba(${hexToRgb(color)}, 0.12)`,
        border: `1.5px solid ${color}`,
        color: '#fff',
        cursor: 'pointer',
        backdropFilter: 'blur(12px)',
        fontSize: 'clamp(0.95rem, 3vw, 1.1rem)',
        letterSpacing: '0.07em',
        fontFamily: "'Playfair Display', serif",
        boxShadow: `0 0 ${hover ? 35 : 20}px rgba(${hexToRgb(color)}, 0.4)`,
        transition: 'all 0.3s ease',
        ...style,
      }}
    >
      {children}
    </button>
  );
}

/* ─── main OverlayUI ──────────────────────────────────── */
export default function OverlayUI() {
  const {
    currentScene, isCountdownFinished,
    letterOpened, revealStarted,
    candlesBlown, setCandlesBlown,
    teddyWished, setTeddyWished,
    houseEntered, setHouseEntered,
    setCurrentScene,
  } = useStore();

  // Per-scene "ready" delay so buttons appear after the 3D animation settles
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(false);
    const delays = { 2: 2800, 3: 3200, 4: 3000, 5: 3500 };
    const t = setTimeout(() => setReady(true), delays[currentScene] ?? 0);
    return () => clearTimeout(t);
  }, [currentScene]);

  const handleBlowCandles = () => {
    setCandlesBlown(true);
    setTimeout(() => setCurrentScene(3), 3000);
  };
  const handleTeddyNext = () => {
    setTeddyWished(true);
    setTimeout(() => setCurrentScene(4), 1500);
  };
  const handleWalkForward = () => {
    setReady(false);
    setTimeout(() => setCurrentScene(5), 600);
  };
  const handleEnterHouse = () => {
    setHouseEntered(true);
    setTimeout(() => setCurrentScene(6), 3300);
  };

  return (
    <div className="ui-layer">
      <AnimatePresence mode="wait">

        {/* ── SCENE 1: Lock Screen ─────────────────────────── */}
        {currentScene === 1 && (
          <motion.div key="s1"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center justify-center h-full w-full pointer-events-none px-4"
          >
            {!isCountdownFinished && (
              <div className="flex flex-col items-center gap-6 mt-32 sm:mt-48 w-full max-w-sm sm:max-w-md mx-auto">
                <div className="text-center">
                  <p className="font-handwriting text-5xl sm:text-6xl text-[#CFB53B] mb-2"
                    style={{ textShadow: '0 0 20px rgba(207,181,59,0.6)' }}>
                    Shankyyy
                  </p>
                  <p className="font-serif italic text-white/60 text-sm sm:text-base tracking-widest">
                    Your surprise unlocks at midnight ✨
                  </p>
                </div>
                <CountdownTimer />
              </div>
            )}
          </motion.div>
        )}

        {/* ── SCENE 2: Cake ────────────────────────────────── */}
        {currentScene === 2 && (
          <motion.div key="s2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex flex-col items-center pointer-events-none"
          >
            <AnimatePresence>
              {ready && !candlesBlown && (
                <motion.div key="cake-ui"
                  initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="pointer-events-auto flex flex-col items-center gap-5"
                  style={{ marginTop: '8vh' }}
                >
                  <h2 style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: 'clamp(2.8rem, 9vw, 4.5rem)',
                    color: '#fff',
                    textShadow: '0 0 30px #ff69b4, 0 0 60px #ff1493',
                    margin: 0, textAlign: 'center',
                  }}>
                    Make a Wish! 🎂
                  </h2>
                  <GlowBtn color="#ff69b4" onClick={handleBlowCandles}>
                    💨 Blow the Candles
                  </GlowBtn>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── SCENE 3: Teddy ───────────────────────────────── */}
        {currentScene === 3 && (
          <motion.div key="s3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex flex-col items-center pointer-events-none"
          >
            <AnimatePresence>
              {ready && !teddyWished && (
                <motion.div key="teddy-ui"
                  initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="pointer-events-auto flex flex-col items-center gap-4"
                  style={{ marginTop: '7vh' }}
                >
                  <h2 style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: 'clamp(2.8rem, 9vw, 4.5rem)',
                    color: '#fff',
                    textShadow: '0 0 30px #ffb6c1, 0 0 60px #ff69b4',
                    margin: 0, textAlign: 'center',
                  }}>
                    Happy Birthday! 🐻
                  </h2>
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: 'clamp(0.9rem,3vw,1.1rem)',
                    fontStyle: 'italic', margin: 0,
                  }}>
                    Someone very special is wishing you well...
                  </p>
                  <GlowBtn color="#ffb6c1" onClick={handleTeddyNext}>
                    Let's go forward ➡️
                  </GlowBtn>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── SCENE 4: Road ────────────────────────────────── */}
        {currentScene === 4 && (
          <motion.div key="s4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex flex-col items-center pointer-events-none"
          >
            <AnimatePresence>
              {ready && (
                <motion.div key="road-ui"
                  initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="pointer-events-auto flex flex-col items-center gap-5"
                  style={{ marginTop: '8vh' }}
                >
                  <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(1.8rem, 6vw, 3rem)',
                    color: '#fff',
                    textShadow: '0 0 30px #ff1493, 0 0 60px #bf00ff',
                    fontStyle: 'italic', margin: 0, textAlign: 'center',
                    maxWidth: '80vw',
                  }}>
                    A new path opens up...
                  </h2>
                  <GlowBtn color="#ff1493" onClick={handleWalkForward}>
                    🚶 Walk Forward
                  </GlowBtn>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── SCENE 5: House ───────────────────────────────── */}
        {currentScene === 5 && (
          <motion.div key="s5"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex flex-col items-end justify-center pointer-events-none"
            style={{ paddingBottom: '8vh', alignItems: 'center', justifyContent: 'flex-end' }}
          >
            <AnimatePresence>
              {ready && !houseEntered && (
                <motion.div key="house-ui"
                  initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="pointer-events-auto flex flex-col items-center gap-5 mb-16 sm:mb-24"
                >
                  <h2 style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                    color: '#fff',
                    textShadow: '0 0 30px rgba(255,215,0,0.9), 0 0 60px rgba(255,165,0,0.5)',
                    margin: 0, textAlign: 'center',
                  }}>
                    Welcome Home 🏠
                  </h2>
                  <GlowBtn color="#ffd700" onClick={handleEnterHouse}>
                    🚪 Enter
                  </GlowBtn>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── SCENE 6: Letter & Final Reveal ───────────────── */}
        {currentScene === 6 && (
          <motion.div key="s6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className={`flex flex-col items-center justify-center h-full w-full ${!letterOpened && !revealStarted ? 'pointer-events-none' : 'interactive'}`}
          >
            {!letterOpened ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="flex flex-col items-center gap-3 absolute bottom-16 sm:bottom-24 px-4 text-center pointer-events-auto cursor-pointer"
                onClick={() => useStore.getState().setLetterOpened(true)}
              >
                <span className="text-4xl animate-bounce">✉️</span>
                <p className="font-serif italic text-white/80 text-lg sm:text-xl"
                  style={{ textShadow: '0 0 12px rgba(207,181,59,0.5)' }}>
                  Tap to open your letter
                </p>
              </motion.div>
            ) : !revealStarted ? (
              <LuxuryLetterContent onNext={() => useStore.getState().setRevealStarted(true)} />
            ) : (
              <ILoveYouReveal />
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

/* ─── Luxury Letter ────────────────────────────────────── */
function LuxuryLetterContent({ onNext }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden interactive"
      style={{ scrollbarWidth: 'none' }}>
      <div className="w-full flex flex-col items-center px-4 sm:px-8 pt-8 pb-12 gap-6">

        {/* Paper Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-xl"
          style={{
            background: 'linear-gradient(160deg, #1a1430 0%, #0d1222 60%, #0a0f1e 100%)',
            borderRadius: '20px',
            border: '1px solid rgba(207,181,59,0.3)',
            boxShadow: '0 0 80px rgba(207,181,59,0.1), 0 30px 60px rgba(0,0,0,0.6)',
            overflow: 'hidden',
          }}
        >
          {/* Gold top accent bar */}
          <div style={{
            height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, #CFB53B 30%, #F0D060 50%, #CFB53B 70%, transparent 100%)',
          }} />

          {/* Inner content */}
          <div className="px-6 sm:px-10 py-8 sm:py-10">

            {/* Top ornament + seal */}
            <div className="flex flex-col items-center mb-7">
              <div className="text-3xl mb-3" style={{ filter: 'drop-shadow(0 0 8px rgba(207,181,59,0.6))' }}>🕯️</div>
              <div className="flex items-center w-full gap-3">
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(207,181,59,0.5))' }} />
                <span style={{ color: '#CFB53B', fontSize: '11px', letterSpacing: '0.25em', fontFamily: 'Playfair Display, serif' }}>
                  ✦ A LETTER FOR YOU ✦
                </span>
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(207,181,59,0.5), transparent)' }} />
              </div>
            </div>

            {/* Salutation */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              style={{
                fontFamily: 'Great Vibes, cursive',
                fontSize: 'clamp(2rem, 8vw, 3.2rem)',
                color: '#CFB53B',
                textAlign: 'center',
                lineHeight: 1.3,
                textShadow: '0 0 25px rgba(207,181,59,0.45)',
                marginBottom: '28px',
              }}
            >
              My Dearest Shankyyy,
            </motion.p>

            {/* Letter paragraphs */}
            <div style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(0.95rem, 3.5vw, 1.1rem)',
              color: 'rgba(244,246,240,0.88)',
              lineHeight: '1.95',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
                Some people come into your life and make it brighter — simply by being there. You are one of those rare, wonderful people. Every conversation with you carries warmth; every moment shared becomes a cherished memory.
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}>
                You deserve every ounce of happiness this world holds — the laughter that doesn't stop, the love that feels like home, and the peace that comes from knowing you are enough, always.
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 1 }}>
                No matter where our journeys lead, know that you will always hold a irreplaceable place in my story — and in my heart.
              </motion.p>
            </div>

            {/* Closing signature */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1 }}
              className="mt-8"
              style={{ textAlign: 'right' }}
            >
              <div style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                color: 'rgba(207,181,59,0.5)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}>
                Written with love,
              </div>
              <p style={{
                fontFamily: 'Great Vibes, cursive',
                fontSize: 'clamp(1.6rem, 6vw, 2.4rem)',
                color: '#CFB53B',
                textShadow: '0 0 15px rgba(207,181,59,0.35)',
                lineHeight: 1.3,
              }}>
                Someone who cares 🌹
              </p>
            </motion.div>

            {/* Bottom ornament */}
            <div className="flex items-center w-full gap-3 mt-8">
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(207,181,59,0.4))' }} />
              <span style={{ color: 'rgba(207,181,59,0.5)', fontSize: '14px' }}>✦</span>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(207,181,59,0.4), transparent)' }} />
            </div>
          </div>

          {/* Gold bottom accent bar */}
          <div style={{
            height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, #CFB53B 30%, #F0D060 50%, #CFB53B 70%, transparent 100%)',
          }} />
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          onClick={onNext}
          className="pointer-events-auto transition-all duration-300 active:scale-95"
          style={{
            padding: '14px 36px',
            borderRadius: '50px',
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(0.9rem, 3.5vw, 1.05rem)',
            color: '#CFB53B',
            background: 'rgba(207,181,59,0.08)',
            border: '1px solid rgba(207,181,59,0.5)',
            boxShadow: '0 0 25px rgba(207,181,59,0.15)',
            cursor: 'pointer',
          }}
        >
          Open The Last Page ❤️
        </motion.button>
      </div>
    </div>
  );
}

/* ─── Countdown Timer ──────────────────────────────────── */
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const setCountdownFinished = useStore(state => state.setCountdownFinished);
  const setCurrentScene = useStore(state => state.setCurrentScene);

  useEffect(() => {
    const target = new Date();
    target.setSeconds(target.getSeconds() + 5); // 5 seconds countdown for preview

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target - now;
      if (difference <= 0) {
        clearInterval(interval);
        setCountdownFinished(true);
        setCurrentScene(2);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [setCountdownFinished, setCurrentScene]);

  const blocks = [
    { label: 'HRS', value: timeLeft.hours },
    { label: 'MIN', value: timeLeft.minutes },
    { label: 'SEC', value: timeLeft.seconds },
  ];

  return (
    <div
      className="flex items-center gap-3 sm:gap-5 px-6 sm:px-10 py-5 sm:py-7 rounded-2xl"
      style={{
        background: 'rgba(11,16,33,0.7)',
        backdropFilter: 'blur(14px)',
        border: '1px solid rgba(207,181,59,0.2)',
        boxShadow: '0 0 40px rgba(207,181,59,0.06)',
      }}
    >
      {blocks.map((block, i) => (
        <React.Fragment key={block.label}>
          <div className="flex flex-col items-center gap-1">
            <span
              className="text-4xl sm:text-6xl tabular-nums leading-none"
              style={{ fontFamily: 'Playfair Display, serif', color: '#CFB53B', textShadow: '0 0 20px rgba(207,181,59,0.4)' }}
            >
              {String(block.value).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[11px] text-white/35 tracking-[0.22em] uppercase font-sans">
              {block.label}
            </span>
          </div>
          {i < 2 && <span className="text-3xl sm:text-5xl text-white/20 leading-none -mt-4">:</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ─── Reveal Text ──────────────────────────────────────── */
function RevealText({ onNext }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 5000),
      setTimeout(() => setStep(3), 7500),
      setTimeout(() => setStep(4), 9500),
      setTimeout(() => setStep(5), 11000),
      setTimeout(() => setStep(6), 12500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex items-center justify-center h-full w-full px-6 pointer-events-none">
      <AnimatePresence mode="wait">

        {step === 1 && (
          <motion.p key="pre"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="font-serif italic text-center text-white/80 max-w-xl leading-relaxed"
            style={{ fontSize: 'clamp(1.1rem, 4vw, 2rem)', textShadow: '0 0 15px rgba(255,255,255,0.2)' }}
          >
            "There was one thing I never found the courage to say..."
          </motion.p>
        )}

        {step > 1 && step < 6 && (
          <motion.p key={`step-${step}`}
            initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.9 }}
            className="font-serif text-center text-white"
            style={{ fontSize: 'clamp(2.8rem, 14vw, 7rem)', textShadow: '0 0 35px rgba(207,181,59,0.5)' }}
          >
            {step === 2 && 'Y'}{step === 3 && 'You'}{step === 4 && 'You Are'}{step === 5 && 'You Are So'}
          </motion.p>
        )}

        {step === 6 && (
          <motion.div key="final"
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.5 }}
            className="flex flex-col items-center gap-4 text-center pointer-events-auto"
          >
            <p className="font-serif text-[#CFB53B]"
              style={{ fontSize: 'clamp(2.6rem, 12vw, 7rem)', textShadow: '0 0 60px rgba(207,181,59,0.8), 0 0 120px rgba(207,181,59,0.3)' }}>
              You Are So Special
            </p>
            <p className="text-4xl sm:text-5xl">❤️</p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 1 }}
              onClick={onNext}
              className="mt-4 transition-all duration-300 active:scale-95"
              style={{
                padding: '13px 32px',
                borderRadius: '50px',
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(0.85rem, 3vw, 1rem)',
                color: '#ff9eb5',
                background: 'rgba(255,105,180,0.08)',
                border: '1px solid rgba(255,105,180,0.45)',
                boxShadow: '0 0 25px rgba(255,26,106,0.18)',
                cursor: 'pointer',
              }}
            >
              There's more... 💌
            </motion.button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

/* ─── Final Message Reveal ────────────────────────────────── */
function ILoveYouReveal() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 3500),
      setTimeout(() => setStep(3), 6000),
      setTimeout(() => setStep(4), 8500),
      setTimeout(() => setStep(5), 11000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex items-center justify-center h-full w-full px-6 pointer-events-none">
      <AnimatePresence mode="wait">

        {step === 1 && (
          <motion.p key="s1"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="font-serif italic text-center text-white/75 max-w-md leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 4vw, 1.7rem)', textShadow: '0 0 12px rgba(255,255,255,0.15)' }}
          >
            "And one more thing I need you to know..."
          </motion.p>
        )}

        {step === 2 && (
          <motion.p key="s2"
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="font-serif text-center text-white"
            style={{ fontSize: 'clamp(2.5rem, 12vw, 6rem)', textShadow: '0 0 40px rgba(255,105,180,0.5)' }}
          >
            I am so lucky...
          </motion.p>
        )}

        {step === 3 && (
          <motion.p key="s3"
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="font-serif text-center text-white"
            style={{ fontSize: 'clamp(2rem, 10vw, 5rem)', textShadow: '0 0 40px rgba(255,105,180,0.5)' }}
          >
            To have you in my life
          </motion.p>
        )}

        {step === 4 && (
          <motion.p key="s4"
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="font-serif text-center text-white"
            style={{ fontSize: 'clamp(2rem, 8vw, 4rem)', textShadow: '0 0 40px rgba(255,105,180,0.5)' }}
          >
            You are so special ❤️
          </motion.p>
        )}

        {step === 5 && (
          <motion.div key="s5"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.5 }}
            className="flex flex-col items-center gap-6 text-center pointer-events-auto"
          >
            <p
              className="font-serif"
              style={{
                fontSize: 'clamp(2rem, 8vw, 4.5rem)',
                color: '#ff9eb5',
                textShadow: '0 0 60px rgba(255,105,180,0.9), 0 0 120px rgba(255,26,106,0.4)',
                lineHeight: 1.3,
              }}
            >
              I am so lucky to have you in my life!
            </p>
            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1.5 }}
              className="font-serif italic text-white"
              style={{ fontSize: 'clamp(1.2rem, 5vw, 2rem)', textShadow: '0 0 20px rgba(255,105,180,0.8)' }}
            >
              "Unaku enkita ethachum sollanum na... inikae sollu 😉"
            </motion.p>
            <p style={{ fontSize: 'clamp(2rem, 8vw, 4rem)' }}>❤️</p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
