import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const TypingText = ({ text, onComplete, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText((prev) => text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          if (onComplete) setTimeout(onComplete, 1000); // Wait 1s after typing
        }
      }, 150); // Typing speed
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay, onComplete]);

  return <span>{displayedText}</span>;
};

export default function RevealScene() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (step === 5) {
      // Fire confetti
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);
    }
  }, [step]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, backgroundColor: step >= 5 ? '#000000' : '#000000' }}
      transition={{ duration: 2 }}
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Audio element - Using a placeholder royalty free track. Replace src with actual song */}
      <audio ref={audioRef} src="https://cdn.pixabay.com/download/audio/2022/05/16/audio_017b2b0a1a.mp3?filename=soft-romantic-piano-113088.mp3" loop />
      
      {/* Music Controls */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
        <p className="text-white/30 text-xs tracking-widest uppercase">Music</p>
        <button onClick={toggleAudio} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-all border border-white/10">
          {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} className="ml-1" />}
        </button>
      </div>

      {/* Starry background */}
      {step >= 5 && Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: Math.random() * 3,
            height: Math.random() * 3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Heart particles explosion */}
      {step >= 5 && Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-pink-500 text-3xl z-10"
          initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: 0,
            scale: Math.random() * 2 + 1,
            x: (Math.random() - 0.5) * 500,
            y: (Math.random() - 0.5) * 500,
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
          }}
        >
          ❤
        </motion.div>
      ))}

      <div className="z-20 text-center flex flex-col items-center justify-center w-full max-w-4xl px-4">
        {step === 0 && <h2 className="text-4xl md:text-6xl font-light"><TypingText text="I" onComplete={() => setStep(1)} /></h2>}
        {step === 1 && <h2 className="text-4xl md:text-6xl font-light"><TypingText text="Lo" onComplete={() => setStep(2)} /></h2>}
        {step === 2 && <h2 className="text-4xl md:text-6xl font-light"><TypingText text="Love" onComplete={() => setStep(3)} /></h2>}
        {step === 3 && <h2 className="text-4xl md:text-6xl font-light"><TypingText text="I Love" onComplete={() => setStep(4)} /></h2>}
        {step === 4 && <h2 className="text-4xl md:text-6xl font-light"><TypingText text="I Love You ❤️" onComplete={() => setStep(5)} /></h2>}
        
        {step >= 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 2, delay: 1 }}
            className="flex flex-col items-center gap-6"
          >
            <h1 className="text-5xl md:text-8xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 drop-shadow-lg leading-tight p-4">
              Happy Birthday<br/>Shankyyy ❤️
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 2 }}
              className="text-white/60 tracking-[0.3em] uppercase text-sm mt-8 border-t border-white/10 pt-8"
            >
              Made with love, only for you.
            </motion.p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
