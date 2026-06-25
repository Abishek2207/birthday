import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export default function LuxuryLetter(props) {
  const group = useRef();
  const topFlap = useRef();
  const letterBody = useRef();
  
  const letterOpened = useStore(state => state.letterOpened);
  const setLetterOpened = useStore(state => state.setLetterOpened);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    
    // Gentle floating
    if (!letterOpened) {
      group.current.position.y = Math.sin(t * 1.5) * 0.1 + (props.position?.[1] || 0);
      group.current.rotation.y = Math.sin(t * 0.5) * 0.1;
    } else {
      // Move closer and orient straight when opened
      group.current.position.lerp(new THREE.Vector3(0, 0, 2), 0.05);
      group.current.rotation.set(0, 0, 0);
    }
    
    // Animation for opening
    if (topFlap.current && letterBody.current) {
      const targetFlapRot = letterOpened ? Math.PI : 0;
      topFlap.current.rotation.x = THREE.MathUtils.lerp(topFlap.current.rotation.x, targetFlapRot, 0.05);
    }
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    if (!letterOpened) {
      setLetterOpened(true);
    }
  };

  const paperColor = "#F4F6F0";
  const envelopeColor = "#0B1021"; // Navy envelope
  const goldColor = "#CFB53B";
  const waxColor = "#800020";

  return (
    <group 
      ref={group} 
      {...props} 
      dispose={null} 
      onClick={handlePointerDown}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      className={!letterOpened ? "cursor-pointer" : ""}
    >
      
      {/* The Envelope Base */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[3, 2, 0.05]} />
        <meshStandardMaterial color={envelopeColor} roughness={0.9} />
      </mesh>
      
      {/* Gold Trim for Envelope */}
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[2.9, 1.9, 0.06]} />
        <meshStandardMaterial color={goldColor} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* The Letter Paper (inside) */}
      <group ref={letterBody} position={[0, letterOpened ? 0.5 : 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.8, 3.5, 0.01]} />
          <meshStandardMaterial color={paperColor} roughness={1} />
        </mesh>
        {/* Subtle gold foil border on letter */}
        <mesh position={[0, 0, 0.006]}>
          <boxGeometry args={[2.7, 3.4, 0.01]} />
          <meshStandardMaterial color={goldColor} metalness={1} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[2.65, 3.35, 0.01]} />
          <meshStandardMaterial color={paperColor} roughness={1} />
        </mesh>
      </group>

      {/* Front Envelope Flaps (to cover the letter) */}
      <mesh position={[0, -0.2, 0.05]}>
        <boxGeometry args={[3, 1.6, 0.02]} />
        <meshStandardMaterial color={envelopeColor} roughness={0.9} />
      </mesh>
      
      {/* Top Flap (Opens) */}
      <group ref={topFlap} position={[0, 1, 0.06]}>
        <mesh position={[0, -0.5, 0]}>
          {/* Triangular flap */}
          <cylinderGeometry args={[1.5, 1.5, 0.02, 3]} />
          <meshStandardMaterial color={envelopeColor} roughness={0.9} />
        </mesh>
        {/* Wax Seal */}
        {!letterOpened && (
          <group position={[0, -0.9, 0.01]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
              <meshStandardMaterial color={waxColor} roughness={0.4} />
            </mesh>
            {/* Glowing highlight on seal if hovered */}
            <pointLight distance={1} intensity={hovered ? 1 : 0} color="#FF0000" />
          </group>
        )}
      </group>

    </group>
  );
}
