import React from 'react';
import { useStore } from '../../store/useStore';
import RomanticNight from '../scenes/RomanticNight';
import LetterScene from '../scenes/LetterScene';
import RevealScene from '../scenes/RevealScene';

export default function SceneManager() {
  const { currentScene } = useStore();

  return (
    <>
      {currentScene === 1 && <RomanticNight />}
      {currentScene === 2 && <LetterScene />}
      {currentScene === 3 && <RevealScene />}
    </>
  );
}
