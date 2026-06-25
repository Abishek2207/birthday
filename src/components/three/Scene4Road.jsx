import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export default function Scene4Road() {
  const group = useRef();
  const roadMatRef = useRef();
  const houseEntered = useStore(state => state.houseEntered);

  useEffect(() => {
    gsap_animate();
  }, []);

  function gsap_animate() {
    // We'll do a simple JS-based animation instead
  }

  useEffect(() => {
    if (houseEntered && group.current) {
      group.current.position.z = 50;
    }
  }, [houseEntered]);

  useFrame(({ clock }) => {
    if (roadMatRef.current) {
      roadMatRef.current.map.offset.y -= 0.015;
    }
  });

  const gridTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#0d0020';
    ctx.fillRect(0, 0, 256, 256);

    ctx.strokeStyle = '#ff69b4';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#ff69b4';

    for (let i = 0; i <= 256; i += 32) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 256); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(256, i); ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 8);
    return tex;
  }, []);

  return (
    <group ref={group}>
      <ambientLight intensity={0.2} color="#200040" />
      <pointLight position={[0, 3, 0]} intensity={3} color="#ff1493" distance={30} />
      <pointLight position={[-6, 2, -10]} intensity={1} color="#bf00ff" distance={20} />
      <pointLight position={[6, 2, -10]} intensity={1} color="#bf00ff" distance={20} />

      {/* Road surface */}
      <Plane args={[10, 120]} position={[0, -2, -50]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          ref={roadMatRef}
          map={gridTexture}
          emissiveMap={gridTexture}
          emissive="#ff1493"
          emissiveIntensity={0.4}
          roughness={0.3}
        />
      </Plane>

      {/* Left glowing lane border */}
      <Plane args={[0.3, 120]} position={[-5, -1.99, -50]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#ff1493" emissive="#ff1493" emissiveIntensity={3} />
      </Plane>
      {/* Right glowing lane border */}
      <Plane args={[0.3, 120]} position={[5, -1.99, -50]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#ff1493" emissive="#ff1493" emissiveIntensity={3} />
      </Plane>

      {/* Stars */}
      {Array.from({ length: 200 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 40;
        const y = Math.random() * 15;
        const z = -Math.random() * 80;
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#ffd6e8" emissive="#ffd6e8" emissiveIntensity={2} />
          </mesh>
        );
      })}
    </group>
  );
}
