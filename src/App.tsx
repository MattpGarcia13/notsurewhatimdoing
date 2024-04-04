import React, { useState } from 'react';
import './App.css';
import beachBackground from './images/busybeach.png';
import lampImage from './images/lamp.png';
import cityBackground from './images/busycity.png';
import forestBackground from './images/busyforest.png';
import thanos from './images/thanos.png';
import xenomorph from './images/xenomorph.png';
import amusementPark from './images/amusement.png';
import babySun from './images/Baby_Sun.png';
import hauntedHouse from './images/haunted.png';
import spongeGrave from './images/spongeGrave.png';

enum GameState {
  START,
  PLAYING,
  LEVEL_COMPLETE,
  GAME_OVER,
  GAME_WON
}

interface Level {
  backgroundImage: string;
  targetImage: string;
  instructions: string;
}

const levels: Level[] = [
  {
    backgroundImage: beachBackground,
    targetImage: lampImage,
    instructions: 'Find the lamp in the busy beach!'
  },
  {
    backgroundImage: cityBackground,
    targetImage: thanos,
    instructions: 'Find the threat in the city!'
  },
  {
    backgroundImage: forestBackground,
    targetImage: xenomorph,
    instructions: 'Find the animal that doesn\'t belong!'
  },
  {
    backgroundImage: amusementPark,
    targetImage: babySun,
    instructions: 'What\'s weird here?'
  },
  {
    backgroundImage: hauntedHouse,
    targetImage: spongeGrave,
    instructions: 'What\'s a little too spooky for this place?'
  }
];

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);

  const startLevel = () => {
    setGameState(GameState.PLAYING);
  };

  const checkTarget = (isTarget: boolean) => {
    if (isTarget) {
      if (currentLevel === levels.length - 1) {
        setGameState(GameState.GAME_WON);
      } else {
        setCurrentLevel((prevLevel) => prevLevel + 1);
        setGameState(GameState.PLAYING);
      }
    } else {
      setLives((prevLives) => prevLives - 1);
      if (lives === 1) {
        setGameState(GameState.GAME_OVER);
      }
    }
  };

  const restartGame = () => {
    setCurrentLevel(0);
    setLives(3);
    setGameState(GameState.START);
  };

  const handleGameWindowClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLImageElement;
    if (!target.classList.contains('target-image')) {
      checkTarget(false);
    }
  };

  return (
    <div className="App">
      <div className="lives-container">
        Lives: {lives}
      </div>
      <h1>Hackathon Hide & Seek</h1>
      {gameState === GameState.START && (
        <button onClick={startLevel}>Start Game</button>
      )}
      {gameState === GameState.PLAYING && (
        <div onClick={handleGameWindowClick}>
          <h2>Level {currentLevel + 1}</h2>
          <p>{levels[currentLevel].instructions}</p>
          <div className="game-window">
            <img src={levels[currentLevel].backgroundImage} alt="Background" className="background-image" />
            <img
              src={levels[currentLevel].targetImage}
              alt="Target"
              className={`target-image ${levels[currentLevel].targetImage === lampImage ? 'lamp-image' : levels[currentLevel].targetImage === thanos ? 'thanos-image' : levels[currentLevel].targetImage === xenomorph ? 'xenomorph-image' : levels[currentLevel].targetImage === babySun ? 'babySun-image' : 'spongeGrave-image'}`}
              onClick={() => checkTarget(true)}
            />
          </div>
        </div>
      )}
      {gameState === GameState.LEVEL_COMPLETE && (
        <div>
          <h2>Level Complete!</h2>
          {currentLevel < levels.length - 1 ? (
            <button onClick={() => { setCurrentLevel((prevLevel) => prevLevel + 1); setGameState(GameState.PLAYING); }}>Next Level</button>
          ) : (
            <button onClick={restartGame}>Restart Game</button>
          )}
        </div>
      )}
      {gameState === GameState.GAME_OVER && (
        <div>
          <h2>Game Over</h2>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      )}
      {gameState === GameState.GAME_WON && (
        <div>
          <h2>Congratulations! You've won the game!</h2>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      )}
    </div>
  );
};

export default App;
