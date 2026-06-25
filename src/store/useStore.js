import { create } from 'zustand';

export const useStore = create((set) => ({
  currentScene: 1, // 1: Lock, 2: Cake, 3: Teddy, 4: Road, 5: House, 6: Final Letter & Message
  audioPlayed: false,
  isMuted: false,
  isCountdownFinished: false,
  setCurrentScene: (scene) => set({ currentScene: scene }),
  setAudioPlayed: (played) => set({ audioPlayed: played }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setCountdownFinished: (finished) => set({ isCountdownFinished: finished }),
  
  // Progress/Interaction tracking
  candlesBlown: false,
  setCandlesBlown: (blown) => set({ candlesBlown: blown }),
  
  teddyWished: false,
  setTeddyWished: (wished) => set({ teddyWished: wished }),

  houseEntered: false,
  setHouseEntered: (entered) => set({ houseEntered: entered }),

  letterOpened: false,
  setLetterOpened: (opened) => set({ letterOpened: opened }),
  
  revealStarted: false,
  setRevealStarted: (started) => set({ revealStarted: started }),
}));
