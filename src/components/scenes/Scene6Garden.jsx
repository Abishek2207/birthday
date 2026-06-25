import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import ParticleSystem from '../effects/ParticleSystem';
import * as THREE from 'three';

export default function Scene6Garden() {
  const { camera } = useThree();
  const { heartClicked, setHeartClicked, setCurrentScene } = useStore();
  const heartRef = useRef();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    camera.position.set(0, 1.5, 6);
    camera.lookAt(0, 1, 0);
  }, [camera]);

  useFrame((state) => {
    if (!heartClicked) {
      camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 6;
      camera.position.z = Math.cos(state.clock.elapsedTime * 0.1) * 6;
      camera.lookAt(0, 1, 0);
    } else {
      // Zoom into heart
      camera.position.lerp(new THREE.Vector3(0, 1, 1), 0.05);
    }

    if (heartRef.current) {
      heartRef.current.rotation.y += 0.02;
      heartRef.current.position.y = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const handleHeartClick = (e) => {
    e.stopPropagation();
    if (!heartClicked) {
      setHeartClicked(true);
      setTimeout(() => {
        setCurrentScene(7);
      }, 2000);
    }
  };

  return (
    <group>
      <ambientLight intensity={heartClicked ? 0 : 0.3} color="#FFB6C1" />
      {!heartClicked && <pointLight position={[0, 3, 0]} intensity={1} color="#E6E6FA" />}
      
      {/* Rose Garden (simplified as scattered red/pink spheres for now, or could be real models) */}
      {!heartClicked && [...Array(40)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 10, 
            0.2, 
            (Math.random() - 0.5) * 10
          ]}
        >
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color={Math.random() > 0.5 ? "#B76E79" : "#FF69B4"} roughness={0.8} />
        </mesh>
      ))}

      {/* Crystal Heart */}
      <group 
        ref={heartRef} 
        onClick={handleHeartClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        className="cursor-pointer"
      >
        <mesh>
          <octahedronGeometry args={[0.5, 0]} />
          <meshPhysicalMaterial 
            color="#FF1493" 
            emissive="#FF1493" 
            emissiveIntensity={hovered || heartClicked ? 2 : 0.5}
            transmission={0.9} 
            thickness={0.5} 
            roughness={0.1} 
          />
        </mesh>
        <pointLight color="#FF1493" intensity={hovered || heartClicked ? 2 : 1} distance={4} />
      </group>

      {!heartClicked && <ParticleSystem count={100} type="fireflies" color="#FF1493" radius={6} speed={0.5} />}
    </group>
  );
}
