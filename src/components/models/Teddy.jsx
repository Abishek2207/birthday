import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import * as THREE from 'three';

export default function Teddy(props) {
  const group = useRef();
  const { currentScene, isCountdownFinished } = useStore();

  useFrame((state) => {
    if (!group.current) return;
    
    // Breathing animation
    const t = state.clock.getElapsedTime();
    if (currentScene === 1 && !isCountdownFinished) {
      // Sleeping / Breathing
      group.current.scale.y = 1 + Math.sin(t * 2) * 0.02;
    } else if (currentScene === 1 && isCountdownFinished) {
      // Waking up
      group.current.scale.y = THREE.MathUtils.lerp(group.current.scale.y, 1, 0.1);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t) * 0.2, 0.05);
    } else {
      // Normal state, slight idle movement
      group.current.rotation.y = Math.sin(t) * 0.1;
      group.current.position.y = Math.sin(t * 2) * 0.05 + (props.position?.[1] || 0);
    }
  });

  const bearColor = "#D2A679"; // Soft brown
  const innerColor = "#E6C9A8"; // Lighter brown
  const noseColor = "#3D2B1F";

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Body */}
      <mesh position={[0, 0.5, 0]}>
        <capsuleGeometry args={[0.5, 0.6, 4, 16]} />
        <meshStandardMaterial color={bearColor} roughness={0.8} />
      </mesh>
      
      {/* Tummy */}
      <mesh position={[0, 0.4, 0.45]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color={innerColor} roughness={0.9} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color={bearColor} roughness={0.8} />
      </mesh>

      {/* Snout */}
      <mesh position={[0, 1.3, 0.55]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color={innerColor} roughness={0.9} />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 1.4, 0.78]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={noseColor} roughness={0.4} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.2, 1.5, 0.55]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={noseColor} roughness={0.2} />
      </mesh>
      <mesh position={[0.2, 1.5, 0.55]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={noseColor} roughness={0.2} />
      </mesh>

      {/* Ears */}
      <mesh position={[-0.5, 1.8, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color={bearColor} roughness={0.8} />
      </mesh>
      <mesh position={[0.5, 1.8, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color={bearColor} roughness={0.8} />
      </mesh>

      {/* Inner Ears */}
      <mesh position={[-0.5, 1.8, 0.15]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={innerColor} roughness={0.9} />
      </mesh>
      <mesh position={[0.5, 1.8, 0.15]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={innerColor} roughness={0.9} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.6, 0.8, 0]} rotation={[0, 0, 0.5]}>
        <capsuleGeometry args={[0.15, 0.4, 4, 16]} />
        <meshStandardMaterial color={bearColor} roughness={0.8} />
      </mesh>
      <mesh position={[0.6, 0.8, 0]} rotation={[0, 0, -0.5]}>
        <capsuleGeometry args={[0.15, 0.4, 4, 16]} />
        <meshStandardMaterial color={bearColor} roughness={0.8} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.3, 0.1, 0.3]} rotation={[-0.5, 0, 0]}>
        <capsuleGeometry args={[0.2, 0.3, 4, 16]} />
        <meshStandardMaterial color={bearColor} roughness={0.8} />
      </mesh>
      <mesh position={[0.3, 0.1, 0.3]} rotation={[-0.5, 0, 0]}>
        <capsuleGeometry args={[0.2, 0.3, 4, 16]} />
        <meshStandardMaterial color={bearColor} roughness={0.8} />
      </mesh>
    </group>
  );
}
