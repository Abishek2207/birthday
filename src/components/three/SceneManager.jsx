import React from 'react';
import { useStore } from '../../store/useStore';
import RomanticNight from '../scenes/RomanticNight';
import Scene2Cake from './Scene2Cake';
import Scene3Teddy from './Scene3Teddy';
import Scene4Road from './Scene4Road';
import Scene5House from './Scene5House';
import LoveScene from '../scenes/LoveScene';

export default function SceneManager() {
  const { currentScene } = useStore();

  return (
    <>
      {currentScene === 1 && <RomanticNight />}
      {currentScene === 2 && <Scene2Cake />}
      {currentScene === 3 && <Scene3Teddy />}
      {currentScene === 4 && <Scene4Road />}
      {currentScene === 5 && <Scene5House />}
      {currentScene === 6 && <LoveScene />}
    </>
  );
}
