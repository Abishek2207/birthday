import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Cloud } from '@react-three/drei';
import * as THREE from 'three';

import Scene1Opening from './Scene1Opening';
import Scene2Cake from './Scene2Cake';
import Scene3Stars from './Scene3Stars';
import Scene4Book from './Scene4Book';
import Scene5Garden from './Scene5Garden';
import Scene7Finale from './Scene7Finale';

export default function SceneManager({ currentScene, setCurrentScene }) {
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 0));

  // Smooth camera movements global controller
  useFrame((state) => {
    state.camera.lookAt(cameraTarget.current);
    // Add subtle floating to camera globally
    state.camera.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.002;
    state.camera.position.x += Math.cos(state.clock.elapsedTime * 0.3) * 0.002;
  });

  return (
    <>
      {/* Global Environment */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Clouds in the background for magical depth */}
      <group position={[0, -5, -20]}>
        <Cloud opacity={0.1} speed={0.2} width={20} depth={1.5} segments={20} />
      </group>

      {currentScene === 1 && <Scene1Opening onNext={() => setCurrentScene(2)} />}
      {currentScene === 2 && <Scene2Cake onNext={() => setCurrentScene(3)} />}
      {currentScene === 3 && <Scene3Stars onNext={() => setCurrentScene(4)} />}
      {currentScene === 4 && <Scene4Book onNext={() => setCurrentScene(5)} />}
      {currentScene === 5 && <Scene5Garden onNext={() => setCurrentScene(7)} />}
      {currentScene === 7 && <Scene7Finale />}
    </>
  );
}
