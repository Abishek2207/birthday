import React, { useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import ParticleSystem from '../effects/ParticleSystem';
import * as THREE from 'three';

export default function LoveScene() {
  const { camera } = useThree();

  useEffect(() => {
    // Position camera inside the room
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 2, 0);
  }, [camera]);

  useFrame((state) => {
    // Gentle breathing camera drift for cinematic effect
    const t = state.clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.1) * 0.2;
    camera.position.y = 2 + Math.cos(t * 0.08) * 0.1;
    camera.lookAt(0, 2, 0);
  });

  const wallColor = "#ffebcd"; // Blanched almond
  const floorColor = "#8b4513"; // Saddle brown
  const roomSize = 20;

  return (
    <group>
      {/* Warm room ambient light */}
      <ambientLight intensity={0.4} color="#ffe4b5" />

      {/* Main warm light (fireplace or cozy lamp feel) */}
      <pointLight position={[0, 4, -5]} intensity={3} color="#ffa07a" distance={30} />
      
      {/* Fill lights */}
      <pointLight position={[-5, 5, 5]} intensity={1} color="#ffb6c1" distance={20} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ffb6c1" distance={20} />

      {/* Room Walls (Box with BackSide) */}
      <mesh position={[0, roomSize/2 - 1, 0]}>
        <boxGeometry args={[roomSize, roomSize, roomSize]} />
        <meshStandardMaterial color={wallColor} side={THREE.BackSide} roughness={0.9} />
      </mesh>

      {/* Floor */}
      <Plane args={[roomSize, roomSize]} position={[0, -0.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={floorColor} roughness={0.8} />
      </Plane>
      
      {/* A warm glowing rug on the floor */}
      <Plane args={[8, 8]} position={[0, -0.89, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#c71585" roughness={0.9} />
      </Plane>

      {/* Floating magical warm hearts in the room to keep the romantic vibe */}
      <ParticleSystem count={150} type="hearts" color="#ff69b4" radius={8} speed={0.5} size={0.06} />
      <ParticleSystem count={50} type="stars" color="#ffd700" radius={8} speed={0.3} size={0.03} />
    </group>
  );
}
