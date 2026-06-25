import React, { useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import LuxuryLetter from '../models/LuxuryLetter';
import ParticleSystem from '../effects/ParticleSystem';
import RosePetals from '../effects/RosePetals';
import * as THREE from 'three';

export default function LetterScene() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame((state) => {
    // Gentle camera breathing
    camera.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <group>
      <ambientLight intensity={0.2} color="#0B1021" />
      <directionalLight position={[0, 2, 5]} intensity={1.2} color="#F4F6F0" />
      
      {/* Warm glow on the letter */}
      <pointLight position={[0, 0, 2]} intensity={0.8} color="#CFB53B" distance={5} />

      {/* The Letter */}
      <LuxuryLetter position={[0, 0, 0]} />

      {/* Surrounding atmosphere */}
      <ParticleSystem count={300} type="stars" color="#FFFFFF" radius={15} speed={0.3} size={0.03} />
      <RosePetals count={50} radius={8} speed={0.8} />
    </group>
  );
}
