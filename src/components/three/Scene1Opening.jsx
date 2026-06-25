import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Sphere, Box, MeshDistortMaterial } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

export default function Scene1Opening({ onNext }) {
  const orbRef = useRef();
  const giftRef = useRef();
  const [textIndex, setTextIndex] = useState(0);
  const [exploded, setExploded] = useState(false);

  const texts = [
    "",
    "Hey Shankyyy...",
    "Someone wanted to make this night special for you..."
  ];

  useEffect(() => {
    // Orb entrance animation
    gsap.fromTo(orbRef.current.position, 
      { x: -10, y: 0, z: -5 }, 
      { x: 0, y: 0, z: 0, duration: 4, ease: "power2.out" }
    );

    // Text sequence
    setTimeout(() => setTextIndex(1), 3000);
    setTimeout(() => setTextIndex(2), 6000);
  }, []);

  useFrame((state) => {
    if (!exploded) {
      // Bouncing animation for orb
      orbRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.5;
      // Gift rotating
      if (giftRef.current) {
        giftRef.current.rotation.x += 0.01;
        giftRef.current.rotation.y += 0.01;
      }
    }
  });

  const handleGiftClick = () => {
    if (exploded) return;
    setExploded(true);
    setTextIndex(0);
    
    // Explosion animation
    gsap.to(orbRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.5 });
    gsap.to(giftRef.current.scale, { x: 5, y: 5, z: 5, duration: 1, opacity: 0 });
    
    // Move to next scene after explosion
    setTimeout(() => {
      onNext();
    }, 1500);
  };

  return (
    <group>
      {/* Magical Messenger Orb (Teddy alternative) */}
      <Sphere ref={orbRef} args={[0.5, 32, 32]} position={[-10, 0, -5]}>
        <MeshDistortMaterial color="#ffb6c1" emissive="#ff69b4" emissiveIntensity={2} distort={0.4} speed={2} />
        
        {/* Gift Box carried by the orb */}
        {!exploded && (
          <Box ref={giftRef} args={[0.4, 0.4, 0.4]} position={[0.8, -0.2, 0.5]} onClick={handleGiftClick} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'}>
            <meshStandardMaterial color="#ffd700" emissive="#ff8c00" emissiveIntensity={1} wireframe />
          </Box>
        )}
      </Sphere>

      {/* Cinematic Text Overlay */}
      {textIndex > 0 && (
        <Html center position={[0, 2, 0]}>
          <div style={{ width: '100vw', textAlign: 'center', opacity: 0 }} 
               ref={(el) => { if(el) gsap.to(el, {opacity: 1, duration: 1}) }}>
            <h1 style={{ 
              color: 'white', 
              fontFamily: "'Inter', sans-serif", 
              fontWeight: 300, 
              fontSize: '2rem',
              textShadow: '0 0 10px rgba(255,255,255,0.5)',
              letterSpacing: '0.1em'
            }}>
              {texts[textIndex]}
            </h1>
            {textIndex === 2 && (
              <p style={{ color: '#aaa', fontSize: '0.8rem', marginTop: '20px', letterSpacing: '0.2em' }}>
                CLICK THE GLOWING GIFT
              </p>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}
