import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LandingScene({ onNext }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Particles background */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white opacity-40 blur-[1px]"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="z-10 flex flex-col items-center gap-12"
      >
        <h1 className="text-4xl md:text-6xl font-light tracking-wide text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 font-sans">
          Someone has a surprise for you...
        </h1>

        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(236, 72, 153, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 rounded-full glassmorphism text-white font-semibold tracking-wider uppercase text-sm border border-white/30 hover:bg-white/20 transition-all duration-300"
        >
          Open
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
