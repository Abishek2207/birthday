import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Box } from '@react-three/drei';
import gsap from 'gsap';

export default function Scene4Book({ onNext }) {
  const bookRef = useRef();
  const [showText, setShowText] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    // Book enters from bottom
    gsap.fromTo(bookRef.current.position,
      { y: -10, z: -5 },
      { y: 0, z: -2, duration: 3, ease: "power2.out" }
    );
    gsap.fromTo(bookRef.current.rotation,
      { x: Math.PI / 2 },
      { x: -0.15, duration: 3, ease: "power2.out" }
    );

    setTimeout(() => setShowText(true), 3000);
  }, []);

  useFrame((state) => {
    if (bookRef.current && !closed) {
      bookRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.001;
    }
  });

  const handleClose = () => {
    if (closed) return;
    setClosed(true);
    setShowText(false);

    // Cinematic zoom and exit
    gsap.to(bookRef.current.position, { z: 5, duration: 2, ease: "power2.in" });
    gsap.to(bookRef.current.rotation, { x: 0, duration: 2, ease: "power2.in" });
    
    setTimeout(onNext, 2500);
  };

  // Cursor trail effect handler
  const handleMouseMove = (e) => {
    if (closed) return;
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const sparkle = document.createElement('div');
    sparkle.className = 'absolute w-2 h-2 rounded-full bg-yellow-300 pointer-events-none mix-blend-screen';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.boxShadow = '0 0 10px 2px rgba(255, 215, 0, 0.8)';
    
    container.appendChild(sparkle);

    gsap.to(sparkle, {
      y: y + (Math.random() * 40 - 20),
      x: x + (Math.random() * 40 - 20),
      opacity: 0,
      scale: 0,
      duration: 1,
      onComplete: () => sparkle.remove()
    });
  };

  return (
    <group>
      <group ref={bookRef}>
        
        {/* Leather Cover */}
        <Box args={[6.2, 8.2, 0.1]} position={[0, 0, -0.1]}>
          <meshStandardMaterial color="#1a052b" roughness={0.9} />
        </Box>
        
        {/* Golden Edges */}
        <Box args={[6.05, 8.05, 0.15]} position={[0, 0, -0.05]}>
          <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.3} emissive="#d4af37" emissiveIntensity={0.2} />
        </Box>

        {/* Paper Base */}
        <Box args={[5.9, 7.9, 0.05]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#fdfbf7" roughness={1} />
        </Box>

        {showText && !closed && (
          <Html transform position={[0, 0, 0.03]} rotation={[0, 0, 0]} scale={0.14}>
            <div 
              onMouseMove={handleMouseMove}
              className="relative overflow-hidden w-[800px] h-[1060px] p-12 text-[#2a2a2a] flex flex-col items-center shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]"
              style={{ 
                backgroundColor: '#fdfbf7',
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
              }}
            >
              {/* Golden Frame */}
              <div className="absolute inset-6 border-2 border-[#d4af37] opacity-60 pointer-events-none"></div>
              <div className="absolute inset-8 border border-[#d4af37] opacity-30 pointer-events-none"></div>

              {/* Corner Ornaments */}
              <div className="absolute top-4 left-4 text-[#d4af37] text-4xl opacity-80 pointer-events-none">✥</div>
              <div className="absolute top-4 right-4 text-[#d4af37] text-4xl opacity-80 pointer-events-none">✥</div>
              <div className="absolute bottom-4 left-4 text-[#d4af37] text-4xl opacity-80 pointer-events-none">✥</div>
              <div className="absolute bottom-4 right-4 text-[#d4af37] text-4xl opacity-80 pointer-events-none">✥</div>

              {/* CSS Butterflies / Particles inside HTML */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({length: 10}).map((_, i) => (
                  <div key={i} className="absolute text-pink-300/40 text-xl animate-float" style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDuration: `${10 + Math.random() * 10}s`,
                    animationDelay: `${Math.random() * 5}s`
                  }}>
                    ❁
                  </div>
                ))}
              </div>

              {/* Heading */}
              <h1 className="mt-8 mb-6 font-handwriting text-7xl text-center animate-[fadeSlideDown_2s_ease-out_forwards] opacity-0"
                  style={{
                    background: 'linear-gradient(to right, #b8860b, #ffd700, #b8860b)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.4))'
                  }}>
                ✨ Happy Birthday Shankyyy ✨
              </h1>

              {/* Golden Separator */}
              <div className="w-64 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-12 opacity-0 animate-[fadeIn_2s_forwards_1s]"></div>

              {/* Body Text */}
              <div className="w-full max-w-[650px] font-serif text-2xl leading-[2.2] tracking-wide space-y-8 text-center relative z-10">
                <p className="opacity-0 animate-[fadeInUp_2s_forwards_2s]">
                  <span className="text-4xl text-[#d4af37] font-handwriting mr-1">"</span>
                  Happy Birthday to my favorite person.
                </p>
                
                <p className="opacity-0 animate-[fadeInUp_2s_forwards_5s]">
                  Some people make life brighter just by being in it, and you're one of them. Thank you for the countless memories, endless laughter, and the comfort of knowing I always have a friend like you.
                </p>
                
                <p className="opacity-0 animate-[fadeInUp_2s_forwards_9s]">
                  You deserve all the happiness, success, love, and beautiful moments this world has to offer. No matter where life takes us, you'll always be one of the most special people in my story.
                </p>
                
                <p className="opacity-0 animate-[fadeInUp_2s_forwards_13s]">
                  Wishing you a year filled with smiles, adventures, and dreams coming true.
                  <span className="text-4xl text-[#d4af37] font-handwriting ml-1">"</span>
                </p>
                
                <p className="text-right font-handwriting text-5xl text-[#8a2be2] pt-8 opacity-0 animate-[fadeInUp_2s_forwards_16s]" style={{textShadow: '0 0 10px rgba(138,43,226,0.2)'}}>
                  Happy Birthday, Shankyyy ! 🎂✨
                </p>
              </div>

              {/* Giant Glowing Crystal Button */}
              <div className="absolute bottom-16 left-0 w-full flex justify-center opacity-0 animate-[fadeInUp_2s_forwards_18s]">
                <button 
                  onClick={handleClose}
                  className="group relative px-12 py-5 rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    boxShadow: '0 8px 32px 0 rgba(138, 43, 226, 0.37)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8a2be2]/40 via-[#ff69b4]/40 to-[#8a2be2]/40 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10 font-serif text-xl tracking-widest text-[#2a0a3d] font-bold" style={{textShadow: '0 0 20px rgba(255,255,255,0.8)'}}>
                    ✨ One Last Surprise Awaits ✨
                  </span>
                  {/* Button Glow Particle */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#ffb6c1] blur-[30px] mix-blend-screen"></div>
                  </div>
                </button>
              </div>
            </div>
          </Html>
        )}
      </group>
      
      <Html>
        <style>
          {`
            @keyframes fadeIn {
              to { opacity: 1; }
            }
            @keyframes fadeSlideDown {
              from { opacity: 0; transform: translateY(-20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes float {
              0% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-20px) rotate(10deg); }
              100% { transform: translateY(0) rotate(0deg); }
            }
          `}
        </style>
      </Html>
    </group>
  );
}
