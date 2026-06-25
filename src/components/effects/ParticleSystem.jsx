import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleSystem({ 
  count = 200, 
  color = '#FFF', 
  size = 0.05, 
  radius = 10,
  speed = 1,
  type = 'stars' // 'stars', 'fireflies', 'hearts'
}) {
  const mesh = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * radius * 2;
      const y = (Math.random() - 0.5) * radius * 2;
      const z = (Math.random() - 0.5) * radius * 2;
      const factor = Math.random() * 100;
      const speedFactor = 0.01 + Math.random() / 200;
      const xRot = Math.random() * Math.PI;
      const yRot = Math.random() * Math.PI;
      const zRot = Math.random() * Math.PI;
      temp.push({ x, y, z, factor, speedFactor, xRot, yRot, zRot });
    }
    return temp;
  }, [count, radius]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!mesh.current) return;
    particles.forEach((particle, i) => {
      let { x, y, z, factor, speedFactor, xRot, yRot, zRot } = particle;

      const t = state.clock.getElapsedTime() * speed;

      // Update positions based on type
      if (type === 'fireflies') {
        y += Math.sin(t * speedFactor + factor) * 0.05;
        x += Math.cos(t * speedFactor + factor) * 0.05;
      } else if (type === 'stars') {
        // Just twinkle (handled by material opacity or bloom, but here we can slightly move them)
        z += Math.sin(t * speedFactor) * 0.01;
      } else if (type === 'hearts') {
        // Float up
        y += speedFactor * 5;
        x += Math.sin(t * speedFactor * 10 + factor) * 0.02;
        if (y > radius) particle.y = -radius; // reset
        else particle.y = y;
        particle.x = x;
      }

      dummy.position.set(x, y, z);
      dummy.rotation.set(
        xRot + t * speedFactor,
        yRot + t * speedFactor,
        zRot + t * speedFactor
      );
      dummy.scale.setScalar(
        Math.max(0.2, Math.sin(t * speedFactor * 10 + factor) + 1)
      );
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      {type === 'hearts' ? (
        // Simple 3D heart shape could be loaded, but for instanced mesh primitives are easier.
        // We'll use a simple sphere for hearts to represent particles if a heart model isn't available,
        // or a cone + 2 spheres merged. Since we can't easily merge here, we'll just use soft glowing spheres.
        <sphereGeometry args={[size, 16, 16]} />
      ) : (
        <sphereGeometry args={[size, 16, 16]} />
      )}
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </instancedMesh>
  );
}
