import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export default function Storybook(props) {
  const group = useRef();
  const leftPage = useRef();
  const rightPage = useRef();
  const { letterFinished } = useStore();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 1.5) * 0.1 + (props.position?.[1] || 0);
    
    // Open the book if letter is not finished, close it if finished
    const targetRotLeft = letterFinished ? 0 : -Math.PI / 2.2;
    const targetRotRight = letterFinished ? 0 : Math.PI / 2.2;
    
    if (leftPage.current && rightPage.current) {
      leftPage.current.rotation.z = THREE.MathUtils.lerp(leftPage.current.rotation.z, targetRotLeft, 0.05);
      rightPage.current.rotation.z = THREE.MathUtils.lerp(rightPage.current.rotation.z, targetRotRight, 0.05);
    }
  });

  const coverColor = "#9370DB"; // Purple
  const pageColor = "#F4F6F0"; // Moonlight white
  const goldColor = "#D4AF37";

  return (
    <group ref={group} {...props} dispose={null} rotation={[0.3, 0, 0]}>
      {/* Spine */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.2, 3.2, 0.2]} />
        <meshStandardMaterial color={coverColor} roughness={0.3} />
      </mesh>

      {/* Left Cover & Pages */}
      <group ref={leftPage} position={[-0.1, 0, 0]}>
        {/* Cover */}
        <mesh position={[-1, 0, -0.05]}>
          <boxGeometry args={[2, 3.2, 0.1]} />
          <meshStandardMaterial color={coverColor} roughness={0.3} />
        </mesh>
        {/* Pages */}
        <mesh position={[-0.95, 0, 0.05]}>
          <boxGeometry args={[1.9, 3.0, 0.1]} />
          <meshStandardMaterial color={pageColor} roughness={0.9} />
        </mesh>
        {/* Gold corners */}
        <mesh position={[-1.9, 1.5, -0.06]}>
          <boxGeometry args={[0.2, 0.2, 0.12]} />
          <meshStandardMaterial color={goldColor} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-1.9, -1.5, -0.06]}>
          <boxGeometry args={[0.2, 0.2, 0.12]} />
          <meshStandardMaterial color={goldColor} metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Right Cover & Pages */}
      <group ref={rightPage} position={[0.1, 0, 0]}>
        {/* Cover */}
        <mesh position={[1, 0, -0.05]}>
          <boxGeometry args={[2, 3.2, 0.1]} />
          <meshStandardMaterial color={coverColor} roughness={0.3} />
        </mesh>
        {/* Pages */}
        <mesh position={[0.95, 0, 0.05]}>
          <boxGeometry args={[1.9, 3.0, 0.1]} />
          <meshStandardMaterial color={pageColor} roughness={0.9} />
        </mesh>
        {/* Gold corners */}
        <mesh position={[1.9, 1.5, -0.06]}>
          <boxGeometry args={[0.2, 0.2, 0.12]} />
          <meshStandardMaterial color={goldColor} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[1.9, -1.5, -0.06]}>
          <boxGeometry args={[0.2, 0.2, 0.12]} />
          <meshStandardMaterial color={goldColor} metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Glowing Light inside the book */}
      <pointLight position={[0, 0, 1]} color="#FFB6C1" intensity={1} distance={5} />
    </group>
  );
}
