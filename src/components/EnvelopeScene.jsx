import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function EnvelopeScene({ onNext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      setShowButton(true);
    }, 4000); // Show button after reading time
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-8"
    >
      {!isOpen ? (
        <motion.div
          onClick={handleOpen}
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          className="relative cursor-pointer group"
        >
          {/* Envelope closed */}
          <div className="w-[300px] h-[200px] bg-[#d1c4e9] rounded-lg shadow-2xl relative overflow-hidden border-2 border-white/20">
            {/* Flap */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[#b39ddb] origin-top" 
                 style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center mt-10">
              <span className="text-white/80 font-handwriting text-3xl drop-shadow-md">For Shankyyy</span>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="relative w-full max-w-2xl h-[80vh] flex flex-col items-center">
          {/* Letter container */}
          <motion.div
            initial={{ y: 200, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full bg-[#fdfbf7] text-[#4a4a4a] p-8 md:p-12 rounded-lg shadow-2xl glassmorphism z-10 flex-1 overflow-y-auto custom-scrollbar"
          >
            <div className="font-handwriting text-2xl md:text-3xl leading-relaxed space-y-6">
              <p>Happy Birthday to my favorite person. 💖</p>
              
              <p>Some people make life brighter just by being in it, and you're one of them. Thank you for the countless memories, endless laughter, and the comfort of knowing I always have a friend like you.</p>
              
              <p>You deserve all the happiness, success, love, and beautiful moments this world has to offer. No matter where life takes us, you'll always be one of the most special people in my story.</p>
              
              <p>Wishing you a year filled with smiles, adventures, and dreams coming true.</p>
              
              <p className="text-right mt-8 font-bold text-[#b39ddb]">Happy Birthday, Shankyyy ! 🎂✨</p>
            </div>
          </motion.div>

          <AnimatePresence>
            {showButton && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold tracking-wide shadow-lg shadow-purple-500/30 z-20"
              >
                One Last Thing...
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
