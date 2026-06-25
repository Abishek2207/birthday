import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import Teddy from '../models/Teddy';
import Bunny from '../models/Bunny';
import ParticleSystem from '../effects/ParticleSystem';
import * as THREE from 'three';

export default function Scene2Intro() {
  const { camera } = useThree();
  const { introFinished, setCurrentScene } = useStore();
  const group = useRef();

  useEffect(() => {
    // Move camera to a nice framing for two characters
    camera.position.set(0, 1.5, 7);
    camera.lookAt(0, 1, 0);
  }, [camera]);

  useEffect(() => {
    if (introFinished) {
      setCurrentScene(3);
    }
  }, [introFinished, setCurrentScene]);

  useFrame((state) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.4} color="#FFF" />
      <directionalLight position={[2, 5, 2]} intensity={1} color="#FFB6C1" />
      <directionalLight position={[-2, 5, 2]} intensity={0.5} color="#E6E6FA" />

      <group ref={group}>
        <Teddy position={[-1.5, 0, 0]} rotation={[0, Math.PI / 6, 0]} />
        <Bunny position={[1.5, 0, 0]} rotation={[0, -Math.PI / 6, 0]} />
      </group>

      {/* Floating hearts */}
      <ParticleSystem count={50} type="hearts" color="#FF69B4" size={0.1} radius={8} speed={0.5} />
      
      {/* Background stars/sparkles */}
      <ParticleSystem count={150} type="stars" color="#F4F6F0" radius={10} />
    </group>
  );
}
