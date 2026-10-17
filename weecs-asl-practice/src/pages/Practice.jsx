import { useRef, useState } from 'react'
import { saveCompletedSession } from '../game/progressStorage'
import {
  createSessionResult,
  handleEnd,
  handleNext,
  handlePause,
  handlePrediction,
  handleResume,
  handleSkip,
  handleStart,
  initialGameState,
  supportedLetters
} from '../game/gameLogic'
import { createStablePrediction } from '../game/stablePrediction'
import LetterPrompt from '../components/LetterPrompt'
import NavBar from '../components/NavBar'
import Webcam from '../components/Webcam'
import ScoreBoard from '../components/ScoreBoard'
import '../styling/practice.css'

function createSessionId() {
  return globalThis.crypto?.randomUUID?.() ??
    `session-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function readMonotonicTime() {
  return globalThis.performance.now()
}

function Practice() {
  const [gameState, setGameState] = useState(initialGameState)
  const [storageMessage, setStorageMessage] = useState('')
  const gameStateRef = useRef(initialGameState)
  const stablePredictionRef = useRef(createStablePrediction())
  const mockTimestampRef = useRef(0)

  function updateGameState(update) {
    const previousState = gameStateRef.current
    const nextState = update(previousState)
    if (nextState === previousState) return

    gameStateRef.current = nextState
    setGameState(nextState)

    if (previousState.status !== 'completed' && nextState.status === 'completed') {
      const result = createSessionResult(nextState, new Date().toISOString())
      if (result) {
        const savedProgress = saveCompletedSession(result)
        setStorageMessage(savedProgress.ok ? '' : savedProgress.error)
      }
    }
  }

  function processPrediction(letter, timestamp, receivedAt = readMonotonicTime()) {
    const stableLetter = stablePredictionRef.current.update(letter, timestamp)
    if (!stableLetter) return

    updateGameState(previousState =>
      handlePrediction(
        previousState,
        { letter: stableLetter, timestamp, stable: true },
        receivedAt
      )
    )
  }

  function simulatePrediction(letter) {
    const timestamp = mockTimestampRef.current + 1
    mockTimestampRef.current = timestamp + 1000
    stablePredictionRef.current.reset()
    processPrediction(letter, timestamp, timestamp)
    processPrediction(letter, timestamp + 1000, timestamp + 1000)
  }

  function startGame() {
    stablePredictionRef.current.reset()
    setStorageMessage('')
    const sessionId = createSessionId()
    updateGameState(previousState => handleStart(previousState, sessionId))
  }

  function pauseGame() {
    stablePredictionRef.current.reset()
    updateGameState(handlePause)
  }

  function resumeGame() {
    stablePredictionRef.current.reset()
    updateGameState(handleResume)
  }

  function endGame() {
    stablePredictionRef.current.reset()
    updateGameState(handleEnd)
  }

  function skipRound() {
    stablePredictionRef.current.reset()
    updateGameState(handleSkip)
  }

  function nextRound() {
    stablePredictionRef.current.reset()
    updateGameState(handleNext)
  }

  return (
    <main>
      <NavBar />
      <h1 className="asl-title">ASL Practice</h1>
      <LetterPrompt letter={gameState.currentLetter} />
      <Webcam />

      <ScoreBoard
        score={gameState.score}
        streak={gameState.streak}
        round={gameState.currentRound}
        totalRounds={gameState.totalRounds}
        feedback={gameState.recognizedLetter ?? 'None'}
        roundCompleted={gameState.status === 'completed'}
      />

      {gameState.status !== 'active' && gameState.status !== 'paused' && (
        <button type="button" onClick={startGame}>
          Start
        </button>
      )}
      {gameState.status === 'active' && (
        <>
          <button type="button" onClick={pauseGame}>Pause</button>
          <button type="button" onClick={skipRound}>Skip</button>
          {gameState.roundCompleted && (
            <button type="button" onClick={nextRound}>Next</button>
          )}
          <button type="button" onClick={endGame}>End</button>
        </>
      )}
      {gameState.status === 'paused' && (
        <>
          <button type="button" onClick={resumeGame}>Resume</button>
          <button type="button" onClick={endGame}>End</button>
        </>
      )}

      <section aria-label="Development prediction controls">
        <h2>Mock predictions (development only)</h2>
        {supportedLetters.map(letter => (
          <button
            key={letter}
            type="button"
            disabled={gameState.status !== 'active' || gameState.roundCompleted}
            onClick={() => simulatePrediction(letter)}
          >
            Predict {letter}
          </button>
        ))}
      </section>

      {storageMessage && <p role="alert">{storageMessage}</p>}
    </main>
  )
}

export default Practice
