import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingScene from './components/LandingScene';
import EnvelopeScene from './components/EnvelopeScene';
import GalleryScene from './components/GalleryScene';
import LockScene from './components/LockScene';
import RevealScene from './components/RevealScene';

function App() {
  const [scene, setScene] = useState('landing');
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Auto-unlock check based on time if needed
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      // Only unlock if time is past 12:00 AM of the target date.
      // Assuming today or a specific date. We'll just use the time if it's past midnight.
      // For this demo, we'll let the lock screen handle the password "1200".
    };
    const timer = setInterval(checkTime, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden bg-[#0f0c29] text-white">
      <AnimatePresence mode="wait">
        {scene === 'landing' && <LandingScene key="landing" onNext={() => setScene('envelope')} />}
        {scene === 'envelope' && <EnvelopeScene key="envelope" onNext={() => setScene('gallery')} />}
        {scene === 'gallery' && <GalleryScene key="gallery" onNext={() => setScene('lock')} />}
        {scene === 'lock' && <LockScene key="lock" onUnlock={() => setScene('reveal')} />}
        {scene === 'reveal' && <RevealScene key="reveal" />}
      </AnimatePresence>
    </div>
  );
}

export default App;
