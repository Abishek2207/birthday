import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Cylinder } from '@react-three/drei';
import gsap from 'gsap';

export default function Scene2Cake({ onNext }) {
  const cakeGroup = useRef();
  const candlesRef = useRef([]);
  const [wished, setWished] = useState(false);

  useEffect(() => {
    // Cake rises from bottom
    gsap.fromTo(cakeGroup.current.position, 
      { y: -10 }, 
      { y: -1, duration: 3, ease: "back.out(1.2)" }
    );
  }, []);

  useFrame((state) => {
    if (cakeGroup.current && !wished) {
      cakeGroup.current.rotation.y += 0.005;
    }
  });

  const handleBlowCandles = () => {
    if (wished) return;
    setWished(true);

    // Turn off candles
    candlesRef.current.forEach((candle, idx) => {
      gsap.to(candle.material.emissive, { r: 0, g: 0, b: 0, duration: 0.5, delay: idx * 0.1 });
    });

    // Fade out cake and move to next scene
    gsap.to(cakeGroup.current.position, { y: -10, duration: 2, delay: 1, ease: "power2.in" });
    
    setTimeout(() => {
      onNext();
    }, 3000);
  };

  return (
    <group>
      <group ref={cakeGroup}>
        {/* Tier 1 */}
        <Cylinder args={[2, 2.2, 1, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#fff0f5" roughness={0.2} metalness={0.1} />
        </Cylinder>
        {/* Tier 2 */}
        <Cylinder args={[1.4, 1.5, 1]} position={[0, 1, 0]}>
          <meshStandardMaterial color="#ffb6c1" roughness={0.2} />
        </Cylinder>
        
        {/* Candles */}
        {[-0.5, 0, 0.5].map((x, i) => (
          <group key={i} position={[x, 1.8, 0]}>
            <Cylinder args={[0.05, 0.05, 0.6]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#ffffff" />
            </Cylinder>
            {/* Candle Flame */}
            <mesh ref={el => candlesRef.current[i] = el} position={[0, 0.4, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color="#ffa500" emissive="#ff4500" emissiveIntensity={3} />
            </mesh>
          </group>
        ))}
      </group>

      <Html center position={[0, 4, 0]}>
        <div style={{ textAlign: 'center', opacity: wished ? 0 : 1, transition: 'opacity 0.5s' }}>
          <h2 style={{ color: 'white', fontFamily: "'Great Vibes', cursive", fontSize: '4rem', textShadow: '0 0 20px #ff69b4' }}>
            Make a wish...
          </h2>
          <button 
            onClick={handleBlowCandles}
            style={{
              marginTop: '20px', padding: '10px 30px', borderRadius: '30px', 
              background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.5)',
              color: 'white', cursor: 'pointer', letterSpacing: '0.1em', backdropFilter: 'blur(5px)'
            }}
          >
            TAP TO BLOW CANDLES
          </button>
        </div>
      </Html>
    </group>
  );
}
