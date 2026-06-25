import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Octahedron, Sphere } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

const TypingText = ({ text, onComplete, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          if (onComplete) setTimeout(onComplete, 1000);
        }
      }, 150);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay, onComplete]);
  return <span>{displayedText}</span>;
};

export default function Scene5Garden({ onNext }) {
  const [phase, setPhase] = useState('heart'); // 'heart' -> 'garden' -> 'text'
  const [textStep, setTextStep] = useState(0);
  
  const heartRef = useRef();
  const crystalRef = useRef();
  const gardenGroup = useRef();

  // Generate random positions for abstract "roses" (glowing spheres on stems)
  const roses = useMemo(() => {
    return Array.from({ length: 50 }).map(() => ({
      x: (Math.random() - 0.5) * 20,
      z: (Math.random() - 0.5) * 20,
      y: Math.random() * 0.5 + 0.1,
      scale: Math.random() * 0.5 + 0.5
    }));
  }, []);

  useEffect(() => {
    if (phase === 'heart' && heartRef.current) {
      gsap.fromTo(heartRef.current.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: 2, ease: "elastic.out(1, 0.5)" });
    }
  }, [phase]);

  useFrame((state) => {
    if (phase === 'heart' && heartRef.current) {
      heartRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
    if (phase === 'garden' && crystalRef.current) {
      crystalRef.current.rotation.y += 0.01;
      crystalRef.current.rotation.x += 0.005;
      crystalRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  const breakHeart = () => {
    gsap.to(heartRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.5 });
    setTimeout(() => setPhase('garden'), 500);
  };

  const openCrystal = () => {
    gsap.to(crystalRef.current.scale, { x: 5, y: 5, z: 5, duration: 1, ease: "power2.in" });
    gsap.to(crystalRef.current.material, { opacity: 0, duration: 1 });
    setTimeout(() => {
      setPhase('text');
      // trigger text steps automatically
      setTimeout(() => setTextStep(1), 0);
    }, 1000);
  };

  useEffect(() => {
    if (textStep === 5) {
      setTimeout(onNext, 4000); // Wait after "I Love You" to go to finale
    }
  }, [textStep, onNext]);

  return (
    <group>
      {phase === 'heart' && (
        <group>
          <Sphere ref={heartRef} args={[1, 32, 32]} onClick={breakHeart} onPointerOver={() => document.body.style.cursor='pointer'} onPointerOut={() => document.body.style.cursor='auto'}>
            <meshStandardMaterial color="#ff1493" emissive="#ff1493" emissiveIntensity={2} />
          </Sphere>
          <Html center position={[0, -2, 0]}>
            <p style={{ color: 'white', fontFamily: "'Inter', sans-serif", letterSpacing: '0.2em', width: '300px', textAlign: 'center', opacity: 0.8 }}>
              There is one final surprise...
              <br/><br/>
              <span style={{fontSize: '0.8em', color: '#ff69b4'}}>CLICK THE HEART</span>
            </p>
          </Html>
        </group>
      )}

      {phase === 'garden' && (
        <group ref={gardenGroup}>
          {/* Abstract Rose Garden */}
          {roses.map((rose, i) => (
            <group key={i} position={[rose.x, 0, rose.z]} scale={rose.scale}>
              {/* Stem */}
              <mesh position={[0, rose.y / 2, 0]}>
                <cylinderGeometry args={[0.02, 0.02, rose.y, 8]} />
                <meshStandardMaterial color="#2e8b57" />
              </mesh>
              {/* Rose (Glowing Orb) */}
              <Sphere args={[0.2, 16, 16]} position={[0, rose.y, 0]}>
                <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={1.5} />
              </Sphere>
            </group>
          ))}

          {/* Central Crystal */}
          <Octahedron ref={crystalRef} args={[1]} position={[0, 1, 0]} onClick={openCrystal} onPointerOver={() => document.body.style.cursor='pointer'} onPointerOut={() => document.body.style.cursor='auto'}>
            <meshPhysicalMaterial 
              color="#ffffff" 
              emissive="#8a2be2" 
              emissiveIntensity={0.5} 
              transmission={0.9} 
              opacity={1} 
              transparent 
              roughness={0} 
              thickness={0.5} 
            />
          </Octahedron>

          <Html center position={[0, -2, 0]}>
            <p style={{ color: 'white', fontFamily: "'Inter', sans-serif", letterSpacing: '0.2em', width: '300px', textAlign: 'center', opacity: 0.8, textShadow: '0 0 10px rgba(0,0,0,0.8)' }}>
              CLICK THE CRYSTAL
            </p>
          </Html>
        </group>
      )}

      {phase === 'text' && (
        <Html center>
          <div style={{ color: 'white', fontSize: '4rem', fontFamily: "'Inter', sans-serif", fontWeight: 300, textAlign: 'center', width: '100vw', textShadow: '0 0 20px rgba(255,105,180,0.8)' }}>
            {textStep === 1 && <TypingText text="I" onComplete={() => setTextStep(2)} />}
            {textStep === 2 && <TypingText text="Lo" onComplete={() => setTextStep(3)} />}
            {textStep === 3 && <TypingText text="Love" onComplete={() => setTextStep(4)} />}
            {textStep === 4 && <TypingText text="I Love" onComplete={() => setTextStep(5)} />}
            {textStep === 5 && <TypingText text="I Love You ❤️" />}
          </div>
        </Html>
      )}
    </group>
  );
}
