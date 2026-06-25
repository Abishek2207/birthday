import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder } from '@react-three/drei';
import gsap from 'gsap';
import { useStore } from '../../store/useStore';

export default function Scene2Cake() {
  const cakeGroup = useRef();
  const candlesRef = useRef([]);
  const candlesBlown = useStore(state => state.candlesBlown);
  const setCandlesBlown = useStore(state => state.setCandlesBlown);

  useEffect(() => {
    gsap.fromTo(cakeGroup.current.position,
      { y: -10 },
      { y: -1.5, duration: 2.5, ease: "back.out(1.2)" }
    );
  }, []);

  useFrame(() => {
    if (cakeGroup.current && !candlesBlown) {
      cakeGroup.current.rotation.y += 0.004;
    }
  });

  // Called by OverlayUI button
  useEffect(() => {
    if (candlesBlown) {
      candlesRef.current.forEach((candle, idx) => {
        if (candle && candle.material) {
          gsap.to(candle.material, { emissiveIntensity: 0, duration: 0.4, delay: idx * 0.15 });
        }
      });
      gsap.to(cakeGroup.current.position, { y: -10, duration: 2, delay: 1, ease: "power2.in" });
    }
  }, [candlesBlown]);

  return (
    <group>
      <ambientLight intensity={0.4} color="#fff0f5" />
      <pointLight position={[0, 5, 5]} intensity={2} color="#ffb6c1" />
      <pointLight position={[-3, 3, 3]} intensity={1} color="#ffd700" />

      <group ref={cakeGroup}>
        {/* Base tier */}
        <Cylinder args={[2.2, 2.4, 1.2, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#fff0f5" roughness={0.3} metalness={0.05} />
        </Cylinder>
        {/* Pink frosting drip ring */}
        <Cylinder args={[2.25, 2.25, 0.15, 32]} position={[0, 0.6, 0]}>
          <meshStandardMaterial color="#ffb6c1" roughness={0.2} />
        </Cylinder>

        {/* Middle tier */}
        <Cylinder args={[1.5, 1.6, 1.0, 32]} position={[0, 1.5, 0]}>
          <meshStandardMaterial color="#ffc0cb" roughness={0.3} />
        </Cylinder>

        {/* Top tier */}
        <Cylinder args={[0.9, 1.0, 0.8, 32]} position={[0, 2.4, 0]}>
          <meshStandardMaterial color="#ffe4e1" roughness={0.3} />
        </Cylinder>

        {/* Candles */}
        {[-0.6, 0, 0.6].map((x, i) => (
          <group key={i} position={[x, 3.1, 0]}>
            <Cylinder args={[0.06, 0.06, 0.7, 16]}>
              <meshStandardMaterial color={['#ff69b4', '#ff1493', '#db7093'][i]} />
            </Cylinder>
            {/* Flame */}
            <mesh ref={el => candlesRef.current[i] = el} position={[0, 0.5, 0]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial
                color="#ffa500"
                emissive="#ff6600"
                emissiveIntensity={!candlesBlown ? 4 : 0}
                transparent
                opacity={!candlesBlown ? 1 : 0}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
