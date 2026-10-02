import { useState } from 'react'
import {
  initialGameState,
  handleCorrectMatch
} from '../game/gameLogic'

import LetterPrompt from '../components/LetterPrompt';
import NavBar from '../components/NavBar';
import '../styling/practice.css'



function Practice() {
  const [gameState, setGameState] = useState(initialGameState)

  function simulateMatch() {
    setGameState(previousState =>
      handleCorrectMatch(previousState)
    )
  }

  return (
    <main>
      <NavBar/>

      <h1>ASL Practice</h1>

      <LetterPrompt letter="A" />

      <p>Score: {gameState.score}</p>

      <p>Streak: {gameState.streak}</p>

      <p>{gameState.feedback}</p>

      <button type="button" onClick={simulateMatch}>
        Simulate correct match
      </button>
    </main>
  )
}

export default Practice