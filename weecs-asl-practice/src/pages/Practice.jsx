import { useState, useEffect } from 'react'
import { loadProgress, saveProgress } from '../game/progressStorage'
import {
  initialGameState,
  handlePrediction,
  handleSkip,
  handleStart,
  handlePause,
  handleResume,
  handleEnd,
  handleNext
} from '../game/gameLogic'

import LetterPrompt from '../components/LetterPrompt';
import NavBar from '../components/NavBar';
import Webcam from '../components/Webcam';
import '../styling/practice.css'
import ScoreBoard from '../components/ScoreBoard';

function Practice() {
  const [gameState, setGameState] = useState(initialGameState)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedProgress = loadProgress()

    if (savedProgress) {
      setGameState(savedProgress)
    }

    setIsLoaded(true)
  }, [])


  useEffect(() => {
    if (isLoaded) {
      saveProgress(gameState)
    }
  }, [gameState, isLoaded])

  function simulatePrediction(letter) {
    setGameState(previousState =>
      handlePrediction(previousState, letter)
    )
  }

  function startGame() {
  setGameState(previousState =>
    handleStart(previousState)
  )
  }

  function pauseGame() {
    setGameState(previousState =>
      handlePause(previousState)
    )
  }

  function resumeGame() {
    setGameState(previousState =>
      handleResume(previousState)
    )
  }

  function endGame() {
    setGameState(previousState =>
      handleEnd(previousState)
    )
  }

  function nextRound() {
    setGameState(previousState =>
      handleNext(previousState)
    )
  }

  return (
    <main>
      <NavBar/>

      <h1 className="asl-title">ASL Practice</h1>

      <LetterPrompt letter={gameState.currentLetter} />

      <Webcam />

      <ScoreBoard score={gameState.score}
      streak={gameState.streak}
      round={gameState.currentRound}
      totalRounds={gameState.totalRounds}
      feedback={gameState.recognizedLetter ?? "None"}
      roundCompleted={gameState.roundCompleted}
      />

      <button type="button" onClick={() => simulatePrediction('B')}>
        Predict B
      </button>

      <button type="button" onClick={() => simulatePrediction('C')}>
        Predict C
      </button>

      <button type="button" onClick={() => simulatePrediction('F')}>
        Predict F
      </button>
      
      <button type="button" onClick={() => simulatePrediction('I')}>
        Predict I
      </button>

      <button type="button" onClick={() => simulatePrediction('L')}>
        Predict L
      </button>

      <button type="button" onClick={() => simulatePrediction('O')}>
        Predict O
      </button>

      <button type="button" onClick={() => simulatePrediction('V')}>
        Predict V
      </button>

      <button type="button" onClick={() => simulatePrediction('Y')}>
        Predict Y
      </button>

      <button type="button" onClick={() => setGameState(previousState =>
        handleSkip(previousState)
      )}>
        Skip
      </button>

      <button type="button" onClick={startGame}>
        Start
      </button>

      <button type="button" onClick={pauseGame}>
        Pause
      </button>

      <button type="button" onClick={resumeGame}>
        Resume
      </button>

      <button type="button" onClick={endGame}>
        End
      </button>

      <button type="button" onClick={nextRound}>
        Next
      </button>

    </main>
  )
}

export default Practice