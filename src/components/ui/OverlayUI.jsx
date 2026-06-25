import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';

export default function OverlayUI() {
  const { 
    currentScene, 
    isCountdownFinished, 
    introFinished, 
    cakeClicked,
    heartClicked
  } = useStore();

  return (
    <div className="ui-layer">
      <AnimatePresence>
        {/* SCENE 1: Midnight Lock Screen */}
        {currentScene === 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center justify-center h-full w-full pointer-events-none"
          >
            {!isCountdownFinished ? (
              <div className="flex flex-col items-center mt-64">
                <p className="text-white/80 text-xl md:text-3xl font-serif italic mb-8 tracking-wider shadow-black drop-shadow-md">
                  Shhh... Your birthday surprise is sleeping ✨
                </p>
                <CountdownTimer />
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
                className="flex flex-col items-center mt-64"
              >
              </motion.div>
            )}
          </motion.div>
        )}

        {/* SCENE 2: Cute Character Intro */}
        {currentScene === 2 && (
          <Scene2Text />
        )}

        {/* SCENE 3: Birthday Celebration */}
        {currentScene === 3 && !cakeClicked && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-24 w-full text-center"
          >
            <p className="text-3xl font-serif italic text-white/90 drop-shadow-[0_0_10px_rgba(255,182,193,0.8)]">
              Make a wish ✨
            </p>
          </motion.div>
        )}

        {/* SCENE 6: Secret Garden */}
        {currentScene === 6 && !heartClicked && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-24 w-full text-center"
          >
            <p className="text-3xl font-serif italic text-white/90 drop-shadow-[0_0_10px_rgba(183,110,121,0.8)]">
              Touch the heart ❤️
            </p>
          </motion.div>
        )}

        {/* SCENE 7 & Final: Reveal */}
        {(currentScene === 7 || currentScene === 8) && (
          <Scene7Text currentScene={currentScene} />
        )}
      </AnimatePresence>
    </div>
  );
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const setCountdownFinished = useStore(state => state.setCountdownFinished);

  useEffect(() => {
    // Target is the next midnight
    const target = new Date();
    target.setHours(24, 0, 0, 0);

    // If testing, we might want to fake it to 10 seconds from now
    const testTarget = new Date(Date.now() + 5000); 

    const interval = setInterval(() => {
      const now = new Date();
      const difference = testTarget - now; // Using testTarget for demonstration

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
    <div className="glassmorphism rounded-2xl px-8 py-4 flex gap-6 text-center">
      <div className="flex flex-col">
        <span className="text-4xl font-light text-pink-200">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="text-xs text-white/50 uppercase tracking-widest mt-1">Hours</span>
      </div>
      <span className="text-4xl font-light text-white/30">:</span>
      <div className="flex flex-col">
        <span className="text-4xl font-light text-pink-200">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="text-xs text-white/50 uppercase tracking-widest mt-1">Mins</span>
      </div>
      <span className="text-4xl font-light text-white/30">:</span>
      <div className="flex flex-col">
        <span className="text-4xl font-light text-pink-200">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="text-xs text-white/50 uppercase tracking-widest mt-1">Secs</span>
      </div>
    </div>
  );
}

function Scene2Text() {
  const [step, setStep] = useState(0);
  const setIntroFinished = useStore(state => state.setIntroFinished);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 2000);
    const t2 = setTimeout(() => setStep(2), 5000);
    const t3 = setTimeout(() => setStep(3), 8000);
    const t4 = setTimeout(() => {
      setIntroFinished(true);
    }, 12000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [setIntroFinished]);

  return (
    <div className="flex items-center justify-center h-full w-full pointer-events-none">
      <div className="mt-64 text-center">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.p
              key="t1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
              className="text-4xl font-serif text-pink-200 drop-shadow-lg"
            >
              Hey Shankyyy... 💖
            </motion.p>
          )}
          {step === 2 && (
            <motion.p
              key="t2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
              className="text-3xl font-serif text-white/90 drop-shadow-lg"
            >
              We've been waiting for this moment...
            </motion.p>
          )}
          {step === 3 && (
            <motion.p
              key="t3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
              className="text-4xl font-serif text-pink-300 drop-shadow-[0_0_15px_rgba(255,182,193,0.8)]"
            >
              Because today is your special day!
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Scene7Text({ currentScene }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (currentScene === 7) {
      const t1 = setTimeout(() => setStep(1), 1000); // I
      const t2 = setTimeout(() => setStep(2), 2500); // Lo
      const t3 = setTimeout(() => setStep(3), 4000); // Love
      const t4 = setTimeout(() => setStep(4), 5500); // I Love
      const t5 = setTimeout(() => setStep(5), 7000); // I Love You ❤️
      
      return () => {
        clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
      };
    } else if (currentScene === 8) {
      setStep(6);
    }
  }, [currentScene]);

  return (
    <div className="flex items-center justify-center h-full w-full pointer-events-none">
      <AnimatePresence mode="wait">
        {step > 0 && step < 6 && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-serif text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]"
          >
            {step === 1 && "I"}
            {step === 2 && "Lo"}
            {step === 3 && "Love"}
            {step === 4 && "I Love"}
            {step === 5 && "I Love You ❤️"}
          </motion.div>
        )}

        {step === 6 && (
          <motion.div
            key="final"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            className="flex flex-col items-center text-center mt-32 bg-black/30 p-12 rounded-3xl backdrop-blur-sm"
          >
            <h1 className="text-5xl md:text-7xl font-serif text-pink-300 drop-shadow-[0_0_15px_rgba(255,182,193,0.8)] mb-6">
              Happy Birthday Shankyyy ❤️
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light mb-4">
              You are one of the most special people in my story.
            </p>
            <p className="text-lg md:text-xl text-white/60 font-serif italic">
              Made specially for you ✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
