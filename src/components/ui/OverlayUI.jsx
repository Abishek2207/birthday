import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';

export default function OverlayUI() {
  const { 
    currentScene, 
    isCountdownFinished, 
    letterOpened,
    setCurrentScene
  } = useStore();

  return (
    <div className="ui-layer">
      <AnimatePresence>

        {/* SCENE 1: Romantic Night (Lock Screen) */}
        {currentScene === 1 && (
          <motion.div 
            key="scene1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center justify-center h-full w-full pointer-events-none px-4"
          >
            {!isCountdownFinished && (
              <div className="flex flex-col items-center gap-6 mt-32 sm:mt-48 w-full max-w-sm sm:max-w-md mx-auto">
                {/* Title */}
                <div className="text-center">
                  <p className="font-handwriting text-4xl sm:text-5xl text-[#CFB53B] drop-shadow-[0_0_15px_rgba(207,181,59,0.6)] mb-2">
                    Shankyyy
                  </p>
                  <p className="font-serif italic text-white/70 text-sm sm:text-base tracking-widest">
                    Your surprise unlocks at midnight ✨
                  </p>
                </div>
                <CountdownTimer />
              </div>
            )}
          </motion.div>
        )}

        {/* SCENE 2: Luxury Letter */}
        {currentScene === 2 && (
          <motion.div 
            key="scene2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={`flex flex-col items-center justify-center h-full w-full ${!letterOpened ? 'pointer-events-none' : 'interactive'}`}
          >
            {!letterOpened ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute bottom-16 sm:bottom-24 text-lg sm:text-2xl font-serif italic text-white/90 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)] text-center px-4"
              >
                ✉️ Tap to open your letter
              </motion.p>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-start overflow-y-auto pt-6 pb-10 px-4 sm:px-8 interactive">
                {/* Luxury paper card */}
                <div
                  className="relative w-full max-w-lg sm:max-w-2xl rounded-2xl shadow-[0_0_60px_rgba(207,181,59,0.2)] overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(20,16,40,0.96) 0%, rgba(11,16,33,0.98) 100%)',
                    border: '1px solid rgba(207,181,59,0.35)',
                  }}
                >
                  {/* Gold foil top border */}
                  <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, transparent, #CFB53B, #D4AF37, #CFB53B, transparent)' }} />

                  <div className="px-6 sm:px-10 py-8 sm:py-12 text-center">
                    {/* Wax seal icon */}
                    <div className="mb-4 flex justify-center">
                      <span className="text-3xl sm:text-4xl filter drop-shadow-[0_0_8px_rgba(207,181,59,0.5)]">💌</span>
                    </div>

                    {/* Heading */}
                    <p className="font-handwriting text-3xl sm:text-5xl text-[#CFB53B] mb-6 leading-relaxed drop-shadow-[0_0_10px_rgba(207,181,59,0.4)]">
                      Happy Birthday, Shankyyy
                    </p>

                    {/* Gold divider */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #CFB53B)' }} />
                      <span className="text-[#CFB53B] text-xs">❧</span>
                      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #CFB53B, transparent)' }} />
                    </div>

                    {/* Letter body */}
                    <div className="font-serif text-white/85 leading-relaxed text-base sm:text-lg space-y-4 text-left">
                      <p>
                        Some people make life brighter just by being in it — and you are one of them. Thank you for the countless memories, the endless laughter, and the comfort of knowing I always have a friend like you.
                      </p>
                      <p>
                        You deserve all the happiness, success, love, and beautiful moments this world has to offer.
                      </p>
                      <p>
                        No matter where life takes us, you'll always be one of the most special people in my story.
                      </p>
                    </div>

                    {/* Closing */}
                    <div className="mt-8 text-right">
                      <p className="font-handwriting text-2xl sm:text-3xl text-[#CFB53B]/80">
                        Wishing you a year full of smiles 🌹
                      </p>
                    </div>

                    {/* Gold divider */}
                    <div className="flex items-center gap-3 mt-8">
                      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #CFB53B)' }} />
                      <span className="text-[#CFB53B] text-xs">❧</span>
                      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #CFB53B, transparent)' }} />
                    </div>
                  </div>

                  {/* Gold foil bottom border */}
                  <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, transparent, #CFB53B, #D4AF37, #CFB53B, transparent)' }} />
                </div>

                {/* CTA Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  onClick={() => setCurrentScene(3)}
                  className="mt-8 mb-4 px-6 sm:px-10 py-3 sm:py-4 rounded-full font-serif italic text-sm sm:text-base pointer-events-auto transition-all duration-300 active:scale-95"
                  style={{
                    background: 'rgba(207,181,59,0.12)',
                    border: '1px solid rgba(207,181,59,0.7)',
                    color: '#CFB53B',
                    boxShadow: '0 0 20px rgba(207,181,59,0.2)',
                  }}
                >
                  Open The Last Page ❤️
                </motion.button>
              </div>
            )}
          </motion.div>
        )}

        {/* SCENE 3: Reveal */}
        {currentScene === 3 && (
          <RevealText key="scene3" />
        )}

      </AnimatePresence>
    </div>
  );
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const setCountdownFinished = useStore(state => state.setCountdownFinished);
  const setCurrentScene = useStore(state => state.setCurrentScene);

  useEffect(() => {
    // Target is exactly midnight tonight
    const target = new Date();
    target.setHours(24, 0, 0, 0);

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
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(207,181,59,0.25)',
        boxShadow: '0 0 40px rgba(207,181,59,0.08)',
      }}
    >
      {blocks.map((block, i) => (
        <React.Fragment key={block.label}>
          <div className="flex flex-col items-center gap-1">
            <span className="text-4xl sm:text-6xl font-light tabular-nums text-[#CFB53B] leading-none" style={{ fontFamily: 'Playfair Display, serif', textShadow: '0 0 20px rgba(207,181,59,0.4)' }}>
              {String(block.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-white/40 tracking-[0.2em] uppercase font-sans">
              {block.label}
            </span>
          </div>
          {i < 2 && (
            <span className="text-3xl sm:text-5xl font-light text-white/20 leading-none -mt-3">:</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function RevealText() {
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
    <div className="flex items-center justify-center h-full w-full pointer-events-none px-6">
      <AnimatePresence mode="wait">

        {step === 1 && (
          <motion.p
            key="pre"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="font-serif italic text-center text-white/85 text-lg sm:text-3xl md:text-4xl max-w-xl leading-relaxed drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]"
          >
            "There was one thing I never found the courage to say..."
          </motion.p>
        )}

        {step > 1 && step < 6 && (
          <motion.p
            key={`step-${step}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.9 }}
            className="font-serif text-center text-white text-5xl sm:text-7xl md:text-8xl leading-tight"
            style={{ textShadow: '0 0 30px rgba(207,181,59,0.5)' }}
          >
            {step === 2 && 'Y'}
            {step === 3 && 'You'}
            {step === 4 && 'You Are'}
            {step === 5 && 'You Are So'}
          </motion.p>
        )}

        {step === 6 && (
          <motion.div
            key="final"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.5 }}
            className="flex flex-col items-center gap-3 sm:gap-5 text-center"
          >
            <p
              className="font-serif text-[#CFB53B] text-5xl sm:text-7xl md:text-9xl leading-tight"
              style={{ textShadow: '0 0 50px rgba(207,181,59,0.8), 0 0 100px rgba(207,181,59,0.3)' }}
            >
              You Are So Special
            </p>
            <p className="text-3xl sm:text-5xl">❤️</p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
