import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import Teddy from '../models/Teddy';
import ParticleSystem from '../effects/ParticleSystem';
import * as THREE from 'three';

export default function Scene1LockScreen() {
  const { camera } = useThree();
  const { isCountdownFinished, setCurrentScene } = useStore();

  useEffect(() => {
    // Set initial camera position
    camera.position.set(0, 1, 6);
    camera.lookAt(0, 1, 0);
  }, [camera]);

  useEffect(() => {
    if (isCountdownFinished) {
      // Transition to next scene after waking up animation
      const timer = setTimeout(() => {
        setCurrentScene(2);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isCountdownFinished, setCurrentScene]);

  return (
    <group>
      {/* Soft lighting */}
      <ambientLight intensity={0.1} color="#4b3d60" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#E6E6FA" />
      <pointLight position={[-2, 3, 2]} intensity={0.8} color="#FFB6C1" />

      {/* Cloud */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={1} transparent opacity={0.8} />
      </mesh>
      <mesh position={[-1, -0.2, 0.2]}>
        <sphereGeometry args={[1.2, 32, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={1} transparent opacity={0.8} />
      </mesh>
      <mesh position={[1, -0.2, -0.2]}>
        <sphereGeometry args={[1.2, 32, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={1} transparent opacity={0.8} />
      </mesh>

      {/* Sleeping Teddy on the cloud */}
      <Teddy position={[0, 1, 0]} rotation={[0, Math.PI / 4, 0]} />

      {/* Moon */}
      <mesh position={[4, 4, -5]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#FFFDE7" emissive="#FFFDE7" emissiveIntensity={0.5} />
      </mesh>
      <pointLight position={[4, 4, -4]} intensity={1} color="#FFFDE7" distance={10} />

      {/* Stars */}
      <ParticleSystem count={300} type="stars" color="#FFFFFF" radius={15} />
    </group>
  );
}
