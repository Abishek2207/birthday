import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import confetti from 'canvas-confetti';

export default function Cake(props) {
  const group = useRef();
  const cakeClicked = useStore(state => state.cakeClicked);
  const setCakeClicked = useStore(state => state.setCakeClicked);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t) * 0.1 + (props.position?.[1] || 0);
    
    if (cakeClicked) {
      group.current.rotation.y += 0.02;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (!cakeClicked) {
      setCakeClicked(true);
      
      // Trigger confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFB6C1', '#E6E6FA', '#9370DB', '#B76E79']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFB6C1', '#E6E6FA', '#9370DB', '#B76E79']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  };

  const cakeBaseColor = "#FFB6C1"; // Soft pink
  const frostingColor = "#FFFFFF";

  return (
    <group 
      ref={group} 
      {...props} 
      dispose={null}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Base Tier */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 1, 32]} />
        <meshStandardMaterial color={cakeBaseColor} roughness={0.5} />
      </mesh>

      {/* Frosting Base */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[1.55, 1.55, 0.1, 32]} />
        <meshStandardMaterial color={frostingColor} roughness={0.3} />
      </mesh>

      {/* Top Tier */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[1, 1, 0.8, 32]} />
        <meshStandardMaterial color={cakeBaseColor} roughness={0.5} />
      </mesh>

      {/* Frosting Top */}
      <mesh position={[0, 1.95, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 0.1, 32]} />
        <meshStandardMaterial color={frostingColor} roughness={0.3} />
      </mesh>

      {/* Candles */}
      {[0, 1, 2].map((i) => {
        const angle = (i / 3) * Math.PI * 2;
        const x = Math.cos(angle) * 0.5;
        const z = Math.sin(angle) * 0.5;
        return (
          <group key={i} position={[x, 2, z]}>
            <mesh position={[0, 0.25, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
              <meshStandardMaterial color="#FFF" roughness={0.1} />
            </mesh>
            {/* Candle Flame (glows brighter when hovered or clicked) */}
            <mesh position={[0, 0.6, 0]}>
              <coneGeometry args={[0.05, 0.15, 8]} />
              <meshStandardMaterial 
                color={hovered || cakeClicked ? "#FFD700" : "#FFA500"} 
                emissive={hovered || cakeClicked ? "#FFD700" : "#FFA500"}
                emissiveIntensity={hovered || cakeClicked ? 2 : 1}
              />
            </mesh>
            {/* Point light for glow */}
            <pointLight position={[0, 0.6, 0]} color="#FFD700" intensity={hovered || cakeClicked ? 0.5 : 0.2} distance={2} />
          </group>
        );
      })}
    </group>
  );
}
