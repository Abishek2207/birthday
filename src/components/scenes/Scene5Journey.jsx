import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import Bunny from '../models/Bunny';
import ParticleSystem from '../effects/ParticleSystem';
import * as THREE from 'three';

export default function Scene5Journey() {
  const { camera } = useThree();
  const { setCurrentScene } = useStore();
  const bunnyRef = useRef();

  useEffect(() => {
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 1, 0);

    // Auto transition to secret garden
    const timer = setTimeout(() => {
      setCurrentScene(6);
    }, 8000);
    return () => clearTimeout(timer);
  }, [camera, setCurrentScene]);

  useFrame((state) => {
    // Camera moves forward
    camera.position.z -= 0.05;
    
    // Bunny hops ahead
    if (bunnyRef.current) {
      bunnyRef.current.position.z -= 0.05;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.2} color="#4b3d60" />
      
      {/* Path Lanterns */}
      {[...Array(10)].map((_, i) => (
        <group key={i} position={[-2 + (i%2)*4, 0, -i * 2]}>
          <pointLight intensity={1} color="#FFD700" distance={5} />
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.4, 8]} />
            <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.8} />
          </mesh>
        </group>
      ))}

      <Bunny ref={bunnyRef} position={[0, 0, 4]} rotation={[0, Math.PI, 0]} />

      <ParticleSystem count={150} type="fireflies" color="#B76E79" radius={10} speed={1} />
      <ParticleSystem count={150} type="fireflies" color="#E6E6FA" radius={10} speed={0.8} />
    </group>
  );
}
