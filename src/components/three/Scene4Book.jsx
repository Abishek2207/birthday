import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Box } from '@react-three/drei';
import gsap from 'gsap';

export default function Scene4Book({ onNext }) {
  const bookRef = useRef();
  const [showText, setShowText] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    // Book enters
    gsap.fromTo(bookRef.current.position,
      { y: -10, z: -5 },
      { y: 0, z: -2, duration: 3, ease: "power2.out" }
    );
    gsap.fromTo(bookRef.current.rotation,
      { x: Math.PI / 2 },
      { x: -0.2, duration: 3, ease: "power2.out" }
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

    // Book exits
    gsap.to(bookRef.current.rotation, { x: Math.PI / 2, duration: 2, ease: "power2.in" });
    gsap.to(bookRef.current.position, { y: -10, duration: 2, delay: 0.5, ease: "power2.in" });

    setTimeout(onNext, 3000);
  };

  return (
    <group>
      <group ref={bookRef}>
        {/* Book Base (Abstract Glowing Plane) */}
        <Box args={[6, 8, 0.2]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#fff0f5" emissive="#ffffff" emissiveIntensity={0.2} roughness={0.1} />
        </Box>
        <Box args={[6.2, 8.2, 0.1]} position={[0, 0, -0.1]}>
          <meshStandardMaterial color="#4a0e4e" />
        </Box>

        {showText && !closed && (
          <Html transform position={[0, 0, 0.12]} rotation={[0, 0, 0]} scale={0.15}>
            <div className="w-[800px] h-[1000px] p-12 flex flex-col justify-center text-[#333] font-handwriting text-4xl leading-loose" style={{ background: 'transparent' }}>
              <p className="mb-6 opacity-0 animate-[fadeIn_1s_forwards_0s]">Happy Birthday to my favorite person. 💖</p>
              
              <p className="mb-6 opacity-0 animate-[fadeIn_1s_forwards_2s]">Some people make life brighter just by being in it, and you're one of them. Thank you for the countless memories, endless laughter, and the comfort of knowing I always have a friend like you.</p>
              
              <p className="mb-6 opacity-0 animate-[fadeIn_1s_forwards_5s]">You deserve all the happiness, success, love, and beautiful moments this world has to offer. No matter where life takes us, you'll always be one of the most special people in my story.</p>
              
              <p className="mb-10 opacity-0 animate-[fadeIn_1s_forwards_8s]">Wishing you a year filled with smiles, adventures, and dreams coming true.</p>
              
              <p className="text-right font-bold text-[#8a2be2] opacity-0 animate-[fadeIn_1s_forwards_10s]">Happy Birthday, Shankyyy ! 🎂✨</p>

              <div className="mt-12 text-center opacity-0 animate-[fadeIn_1s_forwards_12s]">
                <button 
                  onClick={handleClose}
                  className="px-8 py-3 rounded-full bg-purple-600 text-white font-sans text-xl tracking-widest shadow-xl hover:bg-purple-700 transition-colors"
                >
                  Close Book
                </button>
              </div>
            </div>
          </Html>
        )}
      </group>
      
      {/* We need global keyframes for fadeIn */}
      <Html>
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
      </Html>
    </group>
  );
}
