import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cone, Cylinder, Sphere } from '@react-three/drei';
import gsap from 'gsap';
import { useStore } from '../../store/useStore';

export default function Scene5House() {
  const group = useRef();
  const doorRef = useRef();
  const houseEntered = useStore(state => state.houseEntered);

  useEffect(() => {
    if (!group.current) return;
    gsap.fromTo(group.current.scale,
      { x: 0.05, y: 0.05, z: 0.05 },
      { x: 1, y: 1, z: 1, duration: 3, ease: "power2.out" }
    );
    gsap.fromTo(group.current.position,
      { z: -30 },
      { z: 0, duration: 3, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    if (houseEntered && doorRef.current && group.current) {
      gsap.to(doorRef.current.rotation, { y: -Math.PI / 2, duration: 1.2, ease: "power1.inOut" });
      gsap.to(group.current.position, { z: 18, duration: 2.2, delay: 0.8, ease: "power2.in" });
    }
  }, [houseEntered]);

  const houseWall = "#f5e6d0";
  const roof = "#5c3d2e";
  const doorC = "#7b3f00";
  const winGlow = "#fff8c0";

  return (
    <group ref={group}>
      <ambientLight intensity={0.5} color="#ffe8cc" />
      <pointLight position={[0, 8, 8]} intensity={2.5} color="#ffcc88" distance={30} />
      {/* Warm window glow from inside */}
      <pointLight position={[0, 1, 1]} intensity={2} color="#ffd700" distance={15} />

      {/* Foundation */}
      <Box args={[8, 0.3, 5]} position={[0, -2.15, 0]}>
        <meshStandardMaterial color="#c8a882" roughness={0.9} />
      </Box>

      {/* Main walls */}
      <Box args={[8, 5, 5]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color={houseWall} roughness={0.85} />
      </Box>

      {/* Roof */}
      <Cone args={[6.2, 3.5, 4]} position={[0, 4.25, 0]} rotation={[0, Math.PI / 4, 0]}>
        <meshStandardMaterial color={roof} roughness={0.7} />
      </Cone>

      {/* Chimney */}
      <Cylinder args={[0.3, 0.3, 2, 8]} position={[2.5, 5.5, -1]}>
        <meshStandardMaterial color="#8b6355" roughness={0.8} />
      </Cylinder>

      {/* Door frame */}
      <Box args={[1.5, 3, 0.15]} position={[0, -0.5, 2.53]}>
        <meshStandardMaterial color={roof} roughness={0.7} />
      </Box>
      {/* Door opening (dark) */}
      <Box args={[1.3, 2.8, 0.1]} position={[0, -0.5, 2.58]}>
        <meshStandardMaterial color="#1a0d00" />
      </Box>
      {/* Actual door (hinged left) */}
      <group position={[-0.65, -0.5, 2.6]}>
        <group ref={doorRef}>
          <Box args={[1.3, 2.8, 0.1]} position={[0.65, 0, 0]}>
            <meshStandardMaterial color={doorC} roughness={0.6} />
          </Box>
          {/* Panels */}
          <Box args={[0.5, 1.1, 0.12]} position={[0.35, 0.5, 0]}>
            <meshStandardMaterial color="#5a2d00" roughness={0.7} />
          </Box>
          <Box args={[0.5, 1.1, 0.12]} position={[0.95, 0.5, 0]}>
            <meshStandardMaterial color="#5a2d00" roughness={0.7} />
          </Box>
          <Box args={[0.5, 1.0, 0.12]} position={[0.35, -0.7, 0]}>
            <meshStandardMaterial color="#5a2d00" roughness={0.7} />
          </Box>
          <Box args={[0.5, 1.0, 0.12]} position={[0.95, -0.7, 0]}>
            <meshStandardMaterial color="#5a2d00" roughness={0.7} />
          </Box>
          {/* Doorknob */}
          <Sphere args={[0.1, 16, 16]} position={[1.2, 0, 0.1]}>
            <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
          </Sphere>
        </group>
      </group>

      {/* Left window */}
      <group position={[-2.5, 0.8, 2.56]}>
        <Box args={[1.4, 1.6, 0.12]}>
          <meshStandardMaterial color={winGlow} emissive={winGlow} emissiveIntensity={1.2} />
        </Box>
        <Box args={[1.5, 0.1, 0.15]}><meshStandardMaterial color={roof} /></Box>
        <Box args={[0.1, 1.7, 0.15]}><meshStandardMaterial color={roof} /></Box>
        {/* Window frame */}
        <Box args={[1.55, 1.7, 0.08]} position={[0, 0, -0.05]}>
          <meshStandardMaterial color={roof} roughness={0.7} />
        </Box>
      </group>

      {/* Right window */}
      <group position={[2.5, 0.8, 2.56]}>
        <Box args={[1.4, 1.6, 0.12]}>
          <meshStandardMaterial color={winGlow} emissive={winGlow} emissiveIntensity={1.2} />
        </Box>
        <Box args={[1.5, 0.1, 0.15]}><meshStandardMaterial color={roof} /></Box>
        <Box args={[0.1, 1.7, 0.15]}><meshStandardMaterial color={roof} /></Box>
        <Box args={[1.55, 1.7, 0.08]} position={[0, 0, -0.05]}>
          <meshStandardMaterial color={roof} roughness={0.7} />
        </Box>
      </group>

      {/* Path to door */}
      <Box args={[2, 0.1, 6]} position={[0, -2.05, 5.5]}>
        <meshStandardMaterial color="#d4a96a" roughness={0.9} />
      </Box>
    </group>
  );
}
