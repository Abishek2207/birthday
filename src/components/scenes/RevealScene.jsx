import React, { useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import ParticleSystem from '../effects/ParticleSystem';
import RosePetals from '../effects/RosePetals';
import * as THREE from 'three';

export default function RevealScene() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame((state) => {
    // Very slow cinematic dolly in
    camera.position.lerp(new THREE.Vector3(0, 0, 6), 0.005);
  });

  return (
    <group>
      <ambientLight intensity={0.1} color="#0B1021" />
      {/* Central warm romantic glow */}
      <pointLight position={[0, 0, 2]} intensity={2} color="#CFB53B" distance={15} />

      {/* Stars gathering into a heart conceptually represented by dense slow particles */}
      <ParticleSystem count={1000} type="stars" color="#F4F6F0" radius={10} speed={0.5} size={0.04} />
      <ParticleSystem count={300} type="hearts" color="#CFB53B" radius={8} speed={1} size={0.05} />
      
      {/* Heavy falling rose petals */}
      <RosePetals count={300} radius={12} speed={1.5} />
    </group>
  );
}
