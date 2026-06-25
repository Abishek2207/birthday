import { motion } from 'framer-motion';
import { useState } from 'react';

// Using high-quality unsplash placeholders with a romantic/aesthetic vibe
const photos = [
  "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522026857476-e17578ab61e8?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop"
];

export default function GalleryScene({ onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextPhoto = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Small delay before moving to lock scene
      setTimeout(onNext, 1000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      className="relative w-full h-full flex flex-col items-center justify-center p-4 overflow-hidden"
    >
      {/* Floating hearts in background */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-500/20 text-2xl"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{ duration: 4 + Math.random() * 4, repeat: Infinity }}
        >
          ❤
        </motion.div>
      ))}

      <div className="relative w-full max-w-sm aspect-[3/4] flex items-center justify-center cursor-pointer" onClick={handleNextPhoto}>
        {photos.map((photo, index) => {
          const isCurrent = index === currentIndex;
          const isPast = index < currentIndex;
          if (isPast) return null;

          return (
            <motion.div
              key={index}
              initial={{ scale: 0.8, y: 100, rotate: (Math.random() - 0.5) * 20 }}
              animate={{ 
                scale: isCurrent ? 1 : 0.9, 
                y: isCurrent ? 0 : 20, 
                rotate: isCurrent ? (index % 2 === 0 ? -2 : 2) : (Math.random() - 0.5) * 10,
                zIndex: photos.length - index
              }}
              exit={{ scale: 1.1, opacity: 0, y: -100 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              whileHover={isCurrent ? { scale: 1.05, rotate: 0, boxShadow: "0 0 30px rgba(236, 72, 153, 0.4)" } : {}}
              className="absolute w-full h-full bg-white p-4 pb-16 rounded-sm shadow-2xl origin-bottom"
              style={{
                boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
              }}
            >
              <div className="w-full h-full bg-gray-200 overflow-hidden relative">
                <img src={photo} alt="Memory" className="w-full h-full object-cover" />
              </div>
              <p className="absolute bottom-4 left-0 w-full text-center font-handwriting text-[#333] text-2xl">
                {index === 0 ? "Our Memories" : index === photos.length - 1 ? "To Many More..." : "Beautiful Moments"}
              </p>
            </motion.div>
          );
        })}
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 text-white/50 text-sm tracking-widest uppercase"
      >
        Tap photo to continue
      </motion.p>
    </motion.div>
  );
}
