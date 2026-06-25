import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Sphere, MeshDistortMaterial } from '@react-three/drei';
import confetti from 'canvas-confetti';
import gsap from 'gsap';

export default function Scene7Finale() {
  const orbRef = useRef();

  useEffect(() => {
    // Return of the messenger orb
    gsap.fromTo(orbRef.current.position, 
      { y: 10 }, 
      { y: 2, duration: 4, ease: "bounce.out" }
    );

    // Continuous fireworks
    const duration = 15 * 1000;
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

    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.position.x = Math.sin(state.clock.elapsedTime) * 2;
      orbRef.current.position.z = Math.cos(state.clock.elapsedTime) * 2;
    }
  });

  return (
    <group>
      {/* Returning Messenger Orb */}
      <Sphere ref={orbRef} args={[0.5, 32, 32]}>
        <MeshDistortMaterial color="#ffb6c1" emissive="#ff69b4" emissiveIntensity={2} distort={0.4} speed={2} />
      </Sphere>

      <Html center position={[0, -1, 0]}>
        <div style={{ width: '100vw', textAlign: 'center', animation: 'fadeIn 2s ease-in' }}>
          <h1 style={{ 
            fontFamily: "'Great Vibes', cursive", 
            fontSize: '5rem', 
            background: 'linear-gradient(to right, #ffb6c1, #e0b0ff, #ff69b4)', 
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 20px rgba(255,105,180,0.5)',
            marginBottom: '2rem'
          }}>
            Happy Birthday Shankyyy ❤️
          </h1>
          
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.2rem',
            color: 'rgba(255,255,255,0.8)',
            letterSpacing: '0.1em',
            marginBottom: '1rem'
          }}>
            You are one of the most beautiful chapters in my story.
          </p>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase'
          }}>
            Made specially for you.
          </p>
        </div>
      </Html>
    </group>
  );
}
