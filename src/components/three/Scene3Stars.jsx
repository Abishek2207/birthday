import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import gsap from 'gsap';

export default function Scene3Stars({ onNext }) {
  const textRef = useRef();
  const groupRef = useRef();

  useEffect(() => {
    // Text formation animation
    gsap.fromTo(textRef.current.position, 
      { z: -50 }, 
      { z: 0, duration: 4, ease: "power3.out" }
    );
    
    gsap.fromTo(textRef.current.material,
      { opacity: 0 },
      { opacity: 1, duration: 3, delay: 1 }
    );

    // Transition to next scene
    setTimeout(() => {
      gsap.to(textRef.current.position, { z: 10, duration: 2, ease: "power2.in" });
      gsap.to(textRef.current.material, { opacity: 0, duration: 1.5 });
      setTimeout(onNext, 2000);
    }, 6000);
  }, [onNext]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Text
        ref={textRef}
        fontSize={1}
        maxWidth={10}
        lineHeight={1.2}
        textAlign="center"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        position={[0, 0, 0]}
      >
        HAPPY BIRTHDAY{"\n"}SHANKYYY
        <meshStandardMaterial color="#ffffff" emissive="#ff69b4" emissiveIntensity={2} transparent opacity={0} />
      </Text>
    </group>
  );
}
