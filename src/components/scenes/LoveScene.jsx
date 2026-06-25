import React, { useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import ParticleSystem from '../effects/ParticleSystem';
import * as THREE from 'three';

export default function LoveScene() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 9);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame((state) => {
    // Gentle breathing camera drift
    const t = state.clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.08) * 0.4;
    camera.position.y = Math.cos(t * 0.06) * 0.2;
    camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      {/* Deep romantic dark-rose ambient */}
      <ambientLight intensity={0.12} color="#1a0015" />

      {/* Central pulsing heart glow */}
      <pointLight position={[0, 0, 3]} intensity={4} color="#ff1a6a" distance={20} />

      {/* Side fills */}
      <pointLight position={[-4, 3, 2]} intensity={1.8} color="#ff69b4" distance={18} />
      <pointLight position={[4, -2, 2]} intensity={1.5} color="#c71585" distance={18} />

      {/* Backlight bloom */}
      <pointLight position={[0, 0, -5]} intensity={1.2} color="#8b0033" distance={20} />

      {/* Stars — soft pinkish white */}
      <ParticleSystem count={900} type="stars" color="#ffd6e8" radius={14} speed={0.3} size={0.025} />

      {/* Floating pink heart particles */}
      <ParticleSystem count={350} type="hearts" color="#ff4d88" radius={10} speed={0.9} size={0.07} />

      {/* Deeper magenta hearts */}
      <ParticleSystem count={150} type="hearts" color="#ff1a6a" radius={7} speed={1.4} size={0.05} />
    </group>
  );
}
