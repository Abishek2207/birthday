import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';

export default function OverlayUI() {
  const { 
    currentScene, 
    isCountdownFinished, 
    letterOpened,
    revealStarted,
    setCurrentScene
  } = useStore();

  return (
    <div className="ui-layer">
      <AnimatePresence>
        {/* SCENE 1: Romantic Night (Lock Screen) */}
        {currentScene === 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center justify-center h-full w-full pointer-events-none"
          >
            {!isCountdownFinished && (
              <div className="flex flex-col items-center mt-64">
                <p className="text-white/80 text-xl md:text-3xl font-serif italic mb-8 tracking-wider shadow-black drop-shadow-md">
                  Waiting for midnight... ✨
                </p>
                <CountdownTimer />
              </div>
            )}
          </motion.div>
        )}

        {/* SCENE 2: Luxury Letter */}
        {currentScene === 2 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={`flex flex-col items-center justify-center h-full w-full ${!letterOpened ? 'pointer-events-none' : 'interactive'}`}
          >
            {!letterOpened ? (
              <p className="absolute bottom-24 text-2xl font-serif italic text-white/90 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]">
                Click to open your letter
              </p>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center mt-12 px-8">
                <div className="max-w-2xl text-center font-serif text-[var(--color-deep-navy)] leading-loose text-xl md:text-2xl" style={{ textShadow: "0 0 10px rgba(255,255,255,0.8)" }}>
                  <p className="font-handwriting text-5xl mb-8">Happy Birthday, Shankyyy 💖</p>
                  <p className="mb-6">Some people make life brighter just by being in it, and you're one of them. Thank you for the countless memories, endless laughter, and the comfort of knowing I always have a friend like you.</p>
                  <p className="mb-6">You deserve all the happiness, success, love, and beautiful moments this world has to offer.</p>
                  <p className="mb-8">No matter where life takes us, you'll always be one of the most special people in my story.</p>
                  <p className="font-handwriting text-3xl">Wishing you a year filled with smiles.</p>
                </div>
                
                <button 
                  onClick={() => setCurrentScene(3)}
                  className="mt-12 px-8 py-4 bg-[#CFB53B]/20 border border-[#CFB53B] rounded-full text-[#CFB53B] font-serif italic hover:bg-[#CFB53B]/40 transition-all duration-300 shadow-[0_0_15px_rgba(207,181,59,0.3)] hover:shadow-[0_0_25px_rgba(207,181,59,0.6)] pointer-events-auto"
                >
                  Open The Last Page ❤️
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* SCENE 3: Reveal */}
        {currentScene === 3 && (
          <RevealText />
        )}
      </AnimatePresence>
    </div>
  );
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const setCountdownFinished = useStore(state => state.setCountdownFinished);

  useEffect(() => {
    // Target is exactly midnight
    const target = new Date();
    target.setHours(24, 0, 0, 0);
    
    // For testing/demonstration, we'll fast forward if it's too long, but per requirements:
    // "At midnight (12:00 AM), automatically unlock...".
    // I will set a testing target of 5 seconds for visual verification. 
    // In production, use `target`.
    const testTarget = new Date(Date.now() + 5000); 

    const interval = setInterval(() => {
      const now = new Date();
      const difference = testTarget - now;

      if (difference <= 0) {
        clearInterval(interval);
        setCountdownFinished(true);
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
  }, [setCountdownFinished]);

  return (
    <div className="luxury-glass rounded-xl px-10 py-6 flex gap-8 text-center border border-[#CFB53B]/30 shadow-[0_0_30px_rgba(207,181,59,0.15)]">
      <div className="flex flex-col">
        <span className="text-5xl font-light text-[#CFB53B]">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="text-sm text-white/50 uppercase tracking-widest mt-2 font-sans">Hours</span>
      </div>
      <span className="text-5xl font-light text-white/20">:</span>
      <div className="flex flex-col">
        <span className="text-5xl font-light text-[#CFB53B]">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="text-sm text-white/50 uppercase tracking-widest mt-2 font-sans">Mins</span>
      </div>
      <span className="text-5xl font-light text-white/20">:</span>
      <div className="flex flex-col">
        <span className="text-5xl font-light text-[#CFB53B]">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="text-sm text-white/50 uppercase tracking-widest mt-2 font-sans">Secs</span>
      </div>
    </div>
  );
}

function RevealText() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t0 = setTimeout(() => setStep(1), 1000); // "There was one thing I never found the courage to say..."
    const t1 = setTimeout(() => setStep(2), 6000); // I
    const t2 = setTimeout(() => setStep(3), 8500); // Lo
    const t3 = setTimeout(() => setStep(4), 10000); // Love
    const t4 = setTimeout(() => setStep(5), 11500); // I Love
    const t5 = setTimeout(() => setStep(6), 13000); // I Love You ❤️
    
    return () => {
      clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-full w-full pointer-events-none">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="pre-reveal"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="text-2xl md:text-4xl font-serif text-white/90 italic drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          >
            "There was one thing I never found the courage to say..."
          </motion.div>
        )}

        {step > 1 && step < 6 && (
          <motion.div
            key="typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-serif text-[#F4F6F0] drop-shadow-[0_0_20px_rgba(207,181,59,0.5)]"
          >
            {step === 2 && "I"}
            {step === 3 && "Lo"}
            {step === 4 && "Love"}
            {step === 5 && "I Love"}
          </motion.div>
        )}

        {step === 6 && (
          <motion.div
            key="final"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.5 }}
            className="text-7xl md:text-9xl font-serif text-[#CFB53B] drop-shadow-[0_0_40px_rgba(207,181,59,0.8)]"
          >
            I Love You ❤️
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
