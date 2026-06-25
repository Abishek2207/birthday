import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import Teddy from '../models/Teddy';
import Bunny from '../models/Bunny';
import Cake from '../models/Cake';
import ParticleSystem from '../effects/ParticleSystem';
import * as THREE from 'three';

export default function Scene3Celebration() {
  const { camera } = useThree();
  const { cakeClicked, setCurrentScene } = useStore();

  useEffect(() => {
    // Dynamic camera move using GSAP or framer-motion-3d could go here, 
    // for now we just lerp in useFrame or set directly
  }, [camera]);

  useFrame((state) => {
    // Slowly orbit camera
    if (!cakeClicked) {
      camera.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 8;
      camera.position.z = Math.cos(state.clock.elapsedTime * 0.2) * 8;
      camera.lookAt(0, 1, 0);
    } else {
      // Zoom into cake then transition
      camera.position.lerp(new THREE.Vector3(0, 3, 4), 0.02);
      camera.lookAt(0, 1, 0);
    }
  });

  useEffect(() => {
    if (cakeClicked) {
      const timer = setTimeout(() => {
        setCurrentScene(4);
      }, 4000); // Wait for confetti to finish
      return () => clearTimeout(timer);
    }
  }, [cakeClicked, setCurrentScene]);

  return (
    <group>
      <ambientLight intensity={0.6} color="#FFF" />
      <directionalLight position={[5, 10, 5]} intensity={1.2} color="#FFF" />
      <pointLight position={[0, 4, 0]} intensity={1} color="#FFB6C1" />

      {/* Main Cake in center */}
      <Cake position={[0, -0.5, 0]} />

      {/* Animals gathered around */}
      <Teddy position={[-2.5, -0.5, -2]} rotation={[0, Math.PI / 4, 0]} />
      <Bunny position={[2.5, -0.5, -1.5]} rotation={[0, -Math.PI / 4, 0]} />
      <Teddy position={[1.5, -0.5, -3]} rotation={[0, -Math.PI / 6, 0]} />
      <Bunny position={[-1.5, -0.5, -3.5]} rotation={[0, Math.PI / 6, 0]} />

      {/* Decorative balloons (simple spheres) */}
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[
          Math.cos(i * Math.PI / 4) * 4,
          2 + Math.sin(i) * 1,
          Math.sin(i * Math.PI / 4) * 4
        ]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshPhysicalMaterial 
            color={['#FFB6C1', '#E6E6FA', '#9370DB', '#B76E79'][i % 4]} 
            transmission={0.5} 
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Magic Sparkles */}
      <ParticleSystem count={200} type="stars" color="#FFD700" size={0.06} radius={8} speed={1.5} />
    </group>
  );
}
