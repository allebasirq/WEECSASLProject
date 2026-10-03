import { useState, useEffect } from 'react'
import { loadProgress, saveProgress } from '../game/progressStorage'
import {
  initialGameState,
  handlePrediction,
  handleSkip
} from '../game/gameLogic'

import LetterPrompt from '../components/LetterPrompt';
import NavBar from '../components/NavBar';
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

  return (
    <main>
      <NavBar/>

      <h1>ASL Practice</h1>

      <LetterPrompt letter={gameState.currentLetter} />

      <p>Recognized: {gameState.recognizedLetter ?? 'None'}</p>
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

    </main>
  )
}

export default Practice