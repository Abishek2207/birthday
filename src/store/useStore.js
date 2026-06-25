import { create } from 'zustand';

export const useStore = create((set) => ({
  currentScene: 1, // 1: Romantic Night (Lock), 2: Letter Scene, 3: Final Reveal
  audioPlayed: false,
  isMuted: false,
  isCountdownFinished: false,
  setCurrentScene: (scene) => set({ currentScene: scene }),
  setAudioPlayed: (played) => set({ audioPlayed: played }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setCountdownFinished: (finished) => set({ isCountdownFinished: finished }),
  
  // Progress/Interaction tracking
  letterOpened: false,
  setLetterOpened: (opened) => set({ letterOpened: opened }),
  
  revealStarted: false,
  setRevealStarted: (started) => set({ revealStarted: started }),
}));
