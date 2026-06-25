import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import ParticleSystem from '../effects/ParticleSystem';
import * as THREE from 'three';

export default function RomanticNight() {
  const { camera } = useThree();
  const { isCountdownFinished, setCurrentScene } = useStore();

  useEffect(() => {
    camera.position.set(0, 1, 6);
    camera.lookAt(0, 1, 0);
  }, [camera]);

  useEffect(() => {
    if (isCountdownFinished) {
      // Transition to Letter reading scene when timer finishes
      setCurrentScene(2);
    }
  }, [isCountdownFinished, setCurrentScene]);

  return (
    <group>
      {/* Deep cinematic lighting */}
      <ambientLight intensity={0.1} color="#0B1021" />
      <directionalLight position={[5, 10, 5]} intensity={0.5} color="#F4F6F0" />
      <pointLight position={[-2, 3, -2]} intensity={0.6} color="#CFB53B" />

      {/* Subtle Moon effect */}
      <mesh position={[6, 6, -10]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#F4F6F0" emissive="#F4F6F0" emissiveIntensity={0.8} />
      </mesh>
      <pointLight position={[6, 6, -9]} intensity={1} color="#F4F6F0" distance={20} />

      {/* Elegant slow-moving stars */}
      <ParticleSystem count={500} type="stars" color="#FFFFFF" radius={20} speed={0.2} size={0.03} />
      {/* Some scattered gold dust in the air */}
      <ParticleSystem count={150} type="stars" color="#CFB53B" radius={10} speed={0.5} size={0.02} />
    </group>
  );
}
