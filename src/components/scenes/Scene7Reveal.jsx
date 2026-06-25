import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import Teddy from '../models/Teddy';
import Bunny from '../models/Bunny';
import ParticleSystem from '../effects/ParticleSystem';
import confetti from 'canvas-confetti';
import * as THREE from 'three';

export default function Scene7Reveal() {
  const { camera } = useThree();
  const { currentScene, setCurrentScene } = useStore();
  const group = useRef();

  useEffect(() => {
    camera.position.set(0, 1.5, 8);
    camera.lookAt(0, 1, 0);

    // After the typing animation finishes (around 8.5 seconds), launch massive fireworks and transition to scene 8
    const timer = setTimeout(() => {
      launchFireworks();
      setCurrentScene(8);
    }, 8500);

    return () => clearTimeout(timer);
  }, [camera, setCurrentScene]);

  useFrame((state) => {
    if (currentScene === 8 && group.current) {
      // Gentle camera orbit in final scene
      camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 8;
      camera.position.z = Math.cos(state.clock.elapsedTime * 0.1) * 8;
      camera.lookAt(0, 1, 0);
    }
  });

  const launchFireworks = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  return (
    <group ref={group}>
      <ambientLight intensity={0.2} color="#FFF" />
      <directionalLight position={[0, 5, 5]} intensity={1} color="#FFB6C1" />

      {currentScene === 8 && (
        <>
          <Teddy position={[-0.8, 0, 0]} rotation={[0, Math.PI / 4, 0]} />
          <Bunny position={[0.8, 0, 0]} rotation={[0, -Math.PI / 4, 0]} />
        </>
      )}

      {/* Massive particle effects */}
      <ParticleSystem count={500} type="stars" color="#FFFFFF" radius={15} speed={0.5} />
      <ParticleSystem count={200} type="hearts" color="#FF1493" radius={10} speed={2} />
      <ParticleSystem count={150} type="fireflies" color="#FFD700" radius={8} speed={1.5} />
    </group>
  );
}
