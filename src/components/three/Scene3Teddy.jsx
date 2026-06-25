import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder } from '@react-three/drei';
import gsap from 'gsap';
import { useStore } from '../../store/useStore';

export default function Scene3Teddy() {
  const group = useRef();
  const rightArm = useRef();
  const teddyWished = useStore(state => state.teddyWished);

  useEffect(() => {
    gsap.fromTo(group.current.position,
      { y: -10 },
      { y: -2, duration: 2.5, ease: "bounce.out" }
    );
  }, []);

  useEffect(() => {
    if (teddyWished) {
      gsap.to(group.current.position, { y: -10, duration: 1.2, ease: "power2.in" });
    }
  }, [teddyWished]);

  useFrame(({ clock }) => {
    if (rightArm.current && !teddyWished) {
      rightArm.current.rotation.z = Math.sin(clock.getElapsedTime() * 5) * 0.5 + 2.5;
    }
  });

  const brown = "#8B5A2B";
  const lightBrown = "#D2B48C";

  return (
    <group>
      <ambientLight intensity={0.6} color="#ffe4b5" />
      <pointLight position={[5, 5, 5]} intensity={2} color="#ffb6c1" />
      <pointLight position={[-5, 3, 5]} intensity={1} color="#87ceeb" />

      <group ref={group}>
        {/* Body */}
        <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color={brown} roughness={0.85} />
        </Sphere>
        {/* Belly patch */}
        <Sphere args={[1.0, 32, 32]} position={[0, 0, 0.55]}>
          <meshStandardMaterial color={lightBrown} roughness={0.85} />
        </Sphere>

        {/* Head */}
        <Sphere args={[1.1, 32, 32]} position={[0, 2.2, 0]}>
          <meshStandardMaterial color={brown} roughness={0.85} />
        </Sphere>
        {/* Snout */}
        <Sphere args={[0.45, 32, 32]} position={[0, 2.0, 0.95]}>
          <meshStandardMaterial color={lightBrown} roughness={0.85} />
        </Sphere>
        {/* Nose */}
        <Sphere args={[0.12, 16, 16]} position={[0, 2.1, 1.35]}>
          <meshStandardMaterial color="#1a0a00" />
        </Sphere>
        {/* Eyes */}
        <Sphere args={[0.09, 16, 16]} position={[-0.38, 2.45, 0.9]}>
          <meshStandardMaterial color="#1a0a00" />
        </Sphere>
        <Sphere args={[0.09, 16, 16]} position={[0.38, 2.45, 0.9]}>
          <meshStandardMaterial color="#1a0a00" />
        </Sphere>
        {/* Eye shine */}
        <Sphere args={[0.03, 8, 8]} position={[-0.33, 2.5, 0.97]}>
          <meshStandardMaterial color="#ffffff" />
        </Sphere>
        <Sphere args={[0.03, 8, 8]} position={[0.43, 2.5, 0.97]}>
          <meshStandardMaterial color="#ffffff" />
        </Sphere>

        {/* Ears */}
        <Sphere args={[0.38, 32, 32]} position={[-0.82, 3.0, 0]}>
          <meshStandardMaterial color={brown} roughness={0.85} />
        </Sphere>
        <Sphere args={[0.22, 32, 32]} position={[-0.82, 3.0, 0.2]}>
          <meshStandardMaterial color={lightBrown} roughness={0.85} />
        </Sphere>
        <Sphere args={[0.38, 32, 32]} position={[0.82, 3.0, 0]}>
          <meshStandardMaterial color={brown} roughness={0.85} />
        </Sphere>
        <Sphere args={[0.22, 32, 32]} position={[0.82, 3.0, 0.2]}>
          <meshStandardMaterial color={lightBrown} roughness={0.85} />
        </Sphere>

        {/* Left arm (static) */}
        <group position={[-1.6, 0.5, 0]} rotation={[0, 0, -0.4]}>
          <Cylinder args={[0.28, 0.28, 1.4, 16]} position={[0, -0.7, 0]}>
            <meshStandardMaterial color={brown} roughness={0.85} />
          </Cylinder>
          <Sphere args={[0.32, 16, 16]} position={[0, -1.45, 0]}>
            <meshStandardMaterial color={brown} roughness={0.85} />
          </Sphere>
        </group>

        {/* Right arm (waving) */}
        <group ref={rightArm} position={[1.6, 0.5, 0]}>
          <Cylinder args={[0.28, 0.28, 1.4, 16]} position={[0, 0.7, 0]}>
            <meshStandardMaterial color={brown} roughness={0.85} />
          </Cylinder>
          <Sphere args={[0.32, 16, 16]} position={[0, 1.45, 0]}>
            <meshStandardMaterial color={brown} roughness={0.85} />
          </Sphere>
        </group>

        {/* Legs */}
        <group position={[-0.7, -1.5, 0.3]}>
          <Cylinder args={[0.38, 0.38, 1.4, 16]} rotation={[0.4, 0, 0]}>
            <meshStandardMaterial color={brown} roughness={0.85} />
          </Cylinder>
          <Sphere args={[0.4, 16, 16]} position={[0, -0.8, 0.3]}>
            <meshStandardMaterial color={brown} roughness={0.85} />
          </Sphere>
        </group>
        <group position={[0.7, -1.5, 0.3]}>
          <Cylinder args={[0.38, 0.38, 1.4, 16]} rotation={[0.4, 0, 0]}>
            <meshStandardMaterial color={brown} roughness={0.85} />
          </Cylinder>
          <Sphere args={[0.4, 16, 16]} position={[0, -0.8, 0.3]}>
            <meshStandardMaterial color={brown} roughness={0.85} />
          </Sphere>
        </group>

        {/* Bow tie */}
        <Sphere args={[0.25, 16, 16]} position={[-0.3, 1.2, 0.7]} scale={[1.5, 0.7, 0.5]}>
          <meshStandardMaterial color="#ff1493" roughness={0.5} />
        </Sphere>
        <Sphere args={[0.25, 16, 16]} position={[0.3, 1.2, 0.7]} scale={[1.5, 0.7, 0.5]}>
          <meshStandardMaterial color="#ff1493" roughness={0.5} />
        </Sphere>
        <Sphere args={[0.12, 16, 16]} position={[0, 1.2, 0.75]}>
          <meshStandardMaterial color="#ff69b4" roughness={0.5} />
        </Sphere>
      </group>
    </group>
  );
}
