import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Bunny(props) {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    // Hopping animation
    group.current.position.y = Math.abs(Math.sin(t * 4)) * 0.5 + (props.position?.[1] || 0);
    group.current.rotation.y = Math.sin(t * 2) * 0.2;
  });

  const bunnyColor = "#FFFFFF"; 
  const innerColor = "#FFB6C1"; // Soft pink
  const eyeColor = "#111111";

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Body */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color={bunnyColor} roughness={0.7} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.0, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color={bunnyColor} roughness={0.7} />
      </mesh>

      {/* Ears */}
      <mesh position={[-0.15, 1.5, 0]} rotation={[0, 0, 0.1]}>
        <capsuleGeometry args={[0.08, 0.4, 4, 16]} />
        <meshStandardMaterial color={bunnyColor} roughness={0.7} />
      </mesh>
      <mesh position={[0.15, 1.5, 0]} rotation={[0, 0, -0.1]}>
        <capsuleGeometry args={[0.08, 0.4, 4, 16]} />
        <meshStandardMaterial color={bunnyColor} roughness={0.7} />
      </mesh>

      {/* Inner Ears */}
      <mesh position={[-0.15, 1.5, 0.05]} rotation={[0, 0, 0.1]}>
        <capsuleGeometry args={[0.04, 0.3, 4, 16]} />
        <meshStandardMaterial color={innerColor} roughness={0.8} />
      </mesh>
      <mesh position={[0.15, 1.5, 0.05]} rotation={[0, 0, -0.1]}>
        <capsuleGeometry args={[0.04, 0.3, 4, 16]} />
        <meshStandardMaterial color={innerColor} roughness={0.8} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.15, 1.1, 0.3]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color={eyeColor} roughness={0.2} />
      </mesh>
      <mesh position={[0.15, 1.1, 0.3]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color={eyeColor} roughness={0.2} />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 1.0, 0.35]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color={innerColor} roughness={0.4} />
      </mesh>

      {/* Tail */}
      <mesh position={[0, 0.4, -0.4]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={bunnyColor} roughness={0.9} />
      </mesh>

      {/* Paws */}
      <mesh position={[-0.2, 0.1, 0.2]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={bunnyColor} roughness={0.7} />
      </mesh>
      <mesh position={[0.2, 0.1, 0.2]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={bunnyColor} roughness={0.7} />
      </mesh>
    </group>
  );
}
