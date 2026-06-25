import React, { useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import Storybook from '../models/Storybook';
import ParticleSystem from '../effects/ParticleSystem';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

export default function Scene4Letter() {
  const { camera } = useThree();
  const { letterFinished, setLetterFinished, setCurrentScene } = useStore();

  useEffect(() => {
    // Focus camera on the storybook
    camera.position.set(0, 1.5, 4);
    camera.lookAt(0, 0.5, 0);
  }, [camera]);

  useFrame(() => {
    if (letterFinished) {
      camera.position.lerp(new THREE.Vector3(0, 2, 6), 0.02);
      camera.lookAt(0, 0.5, 0);
    }
  });

  useEffect(() => {
    // Auto transition after letter reading
    const timer = setTimeout(() => {
      setLetterFinished(true);
      setTimeout(() => {
        setCurrentScene(5);
      }, 3000); // 3 seconds after closing book
    }, 15000); // Give user 15 seconds to read
    return () => clearTimeout(timer);
  }, [setLetterFinished, setCurrentScene]);

  return (
    <group>
      <ambientLight intensity={0.2} color="#FFF" />
      <pointLight position={[0, 2, 2]} intensity={1.5} color="#FFB6C1" />

      {/* Storybook */}
      <Storybook position={[0, 0, 0]} />

      {/* Floating Sparkles around the book */}
      <ParticleSystem count={100} type="fireflies" color="#D4AF37" size={0.03} radius={3} speed={2} />

      {/* The Letter Content overlaid on the book using Drei Html */}
      <Html position={[0, 0.5, 0.2]} transform distanceFactor={3} zIndexRange={[100, 0]}>
        <AnimatePresence>
          {!letterFinished && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, delay: 1 }}
              className="w-[800px] h-[500px] flex justify-center items-center text-center p-8 pointer-events-none"
            >
              <div className="handwriting text-3xl text-gray-800 leading-relaxed font-semibold opacity-80" style={{ textShadow: "0 0 5px rgba(255,255,255,0.8)" }}>
                <TypewriterText text="Happy Birthday to my favorite person. 💖" delay={0} />
                <br/><br/>
                <TypewriterText text="Some people make life brighter just by being in it, and you're one of them." delay={2} />
                <br/>
                <TypewriterText text="Thank you for the countless memories, endless laughter, and the comfort of knowing I always have a friend like you." delay={4} />
                <br/><br/>
                <TypewriterText text="You deserve all the happiness, success, love, and beautiful moments this world has to offer." delay={7} />
                <br/>
                <TypewriterText text="No matter where life takes us, you'll always be one of the most special people in my story." delay={10} />
                <br/><br/>
                <TypewriterText text="Wishing you a year filled with smiles, adventures, and dreams coming true." delay={13} />
                <br/><br/>
                <TypewriterText text="Happy Birthday, Shankyyy ! 🎂✨" delay={15} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Html>
    </group>
  );
}

function TypewriterText({ text, delay }) {
  const [visibleText, setVisibleText] = React.useState('');

  React.useEffect(() => {
    let timeout;
    let interval;
    timeout = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        setVisibleText(text.substring(0, i));
        i++;
        if (i > text.length) clearInterval(interval);
      }, 50);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <span>{visibleText}</span>;
}
