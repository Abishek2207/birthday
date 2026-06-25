import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, BakeShadows } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import SceneManager from './components/three/SceneManager';
import OverlayUI from './components/ui/OverlayUI';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { useStore } from './store/useStore';

export default function App() {
  const { currentScene, audioPlayed, isMuted, setAudioPlayed, toggleMute } = useStore();

  // Play audio on first interaction
  const handleUserInteraction = () => {
    if (!audioPlayed) {
      const audio = document.getElementById('bg-music');
      if (audio) {
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio error:', e));
        setAudioPlayed(true);
      }
    }
  };

  useEffect(() => {
    const audio = document.getElementById('bg-music');
    if (audio) {
      audio.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div 
      className="w-full h-screen h-dvh bg-[#050510] overflow-hidden relative cursor-crosshair"
      onClick={handleUserInteraction}
    >
      <audio id="bg-music" src="https://cdn.pixabay.com/download/audio/2022/05/16/audio_017b2b0a1a.mp3?filename=soft-romantic-piano-113088.mp3" loop />
      
      {/* HUD overlays */}
      <div className="absolute top-6 right-6 z-50 interactive">
        <button onClick={toggleMute} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors border border-white/10 backdrop-blur-md cursor-pointer">
          {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
        </button>
      </div>

      <OverlayUI />

      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#050510']} />
        
        {/* Global Lighting */}
        <ambientLight intensity={0.2} />
        
        <Suspense fallback={null}>
          <SceneManager />
          <Preload all />
          <BakeShadows />
        </Suspense>

        {/* Post Processing for glowing magical effects */}
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
