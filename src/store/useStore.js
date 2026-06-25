import { create } from 'zustand';

export const useStore = create((set) => ({
  currentScene: 1, // 1 to 7
  audioPlayed: false,
  isMuted: false,
  isCountdownFinished: false,
  setCurrentScene: (scene) => set({ currentScene: scene }),
  setAudioPlayed: (played) => set({ audioPlayed: played }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setCountdownFinished: (finished) => set({ isCountdownFinished: finished }),
  
  // Progress/Interaction tracking
  introFinished: false,
  setIntroFinished: (finished) => set({ introFinished: finished }),
  
  cakeClicked: false,
  setCakeClicked: (clicked) => set({ cakeClicked: clicked }),
  
  letterFinished: false,
  setLetterFinished: (finished) => set({ letterFinished: finished }),

  heartClicked: false,
  setHeartClicked: (clicked) => set({ heartClicked: clicked }),
}));
