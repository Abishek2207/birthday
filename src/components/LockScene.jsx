import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaLock } from 'react-icons/fa';

export default function LockScene({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "1200") {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
      setPassword("");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      className="w-full h-full flex flex-col items-center justify-center p-4 relative"
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glassmorphism p-10 rounded-2xl w-full max-w-md flex flex-col items-center relative z-10"
      >
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 border border-white/20">
          <FaLock className="text-white text-2xl" />
        </div>

        <h2 className="text-2xl font-light tracking-wide text-center mb-2">
          There is one thing I never told you...
        </h2>
        
        <p className="text-white/60 text-sm mb-8 tracking-widest uppercase text-center">
          Hint: The day this surprise arrived
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          <motion.div
            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border-b-2 border-white/30 text-white px-4 py-3 text-center tracking-[0.5em] focus:outline-none focus:border-pink-400 transition-colors bg-transparent placeholder-white/20"
              placeholder="****"
              maxLength={4}
            />
          </motion.div>
          
          {error && <p className="text-pink-400 text-xs text-center mt-2 absolute w-full left-0">Incorrect password</p>}

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full mt-8 py-3 rounded-lg bg-white/10 border border-white/20 text-white tracking-widest hover:bg-white/20 transition-all uppercase text-sm"
          >
            Unlock
          </motion.button>
        </form>
      </motion.div>
      
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-[#0f0c29]/80 to-[#0f0c29]"></div>
    </motion.div>
  );
}
