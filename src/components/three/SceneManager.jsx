import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Cloud } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

import Scene1LockScreen from '../scenes/Scene1LockScreen';
import Scene2Intro from '../scenes/Scene2Intro';
import Scene3Celebration from '../scenes/Scene3Celebration';
import Scene4Letter from '../scenes/Scene4Letter';
import Scene5Journey from '../scenes/Scene5Journey';
import Scene6Garden from '../scenes/Scene6Garden';
import Scene7Reveal from '../scenes/Scene7Reveal';

export default function SceneManager() {
  const { currentScene } = useStore();

  return (
    <>
      {/* Global Environment */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Clouds in the background for magical depth */}
      <group position={[0, -5, -20]}>
        <Cloud opacity={0.1} speed={0.2} width={20} depth={1.5} segments={20} color="#FFB6C1" />
      </group>

      {currentScene === 1 && <Scene1LockScreen />}
      {currentScene === 2 && <Scene2Intro />}
      {currentScene === 3 && <Scene3Celebration />}
      {currentScene === 4 && <Scene4Letter />}
      {currentScene === 5 && <Scene5Journey />}
      {currentScene === 6 && <Scene6Garden />}
      {(currentScene === 7 || currentScene === 8) && <Scene7Reveal />}
    </>
  );
}
