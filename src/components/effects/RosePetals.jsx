import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function RosePetals({ count = 150, radius = 10, speed = 1 }) {
  const mesh = useRef();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * radius * 2;
      const y = Math.random() * radius; // Start higher up
      const z = (Math.random() - 0.5) * radius * 2;
      const factor = Math.random() * 100;
      const speedFactor = 0.005 + Math.random() / 200;
      const xRot = Math.random() * Math.PI;
      const yRot = Math.random() * Math.PI;
      const zRot = Math.random() * Math.PI;
      temp.push({ x, y, z, factor, speedFactor, xRot, yRot, zRot, initialY: y });
    }
    return temp;
  }, [count, radius]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Simple petal shape using a slightly squashed sphere or a curved plane. 
  // We'll use a thin cylinder/disc that we deform slightly or just rely on rotation for the flutter effect.

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime() * speed;

    particles.forEach((particle, i) => {
      let { x, y, z, factor, speedFactor, xRot, yRot, zRot, initialY } = particle;

      // Falling and fluttering
      y -= speedFactor * 3; // Fall down
      x += Math.sin(t * speedFactor * 10 + factor) * 0.02; // Drift x
      z += Math.cos(t * speedFactor * 10 + factor) * 0.02; // Drift z
      
      // Reset to top if they fall below a certain point
      if (y < -radius) {
        y = radius;
      }
      particle.y = y;
      particle.x = x;
      particle.z = z;

      dummy.position.set(x, y, z);
      dummy.rotation.set(
        xRot + t * speedFactor * 20,
        yRot + t * speedFactor * 20,
        zRot + t * speedFactor * 20
      );
      dummy.scale.set(0.15, 0.02, 0.1); // Squashed to look like a petal
      
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#800020" roughness={0.8} />
    </instancedMesh>
  );
}
