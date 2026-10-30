import { describe, expect, test } from 'vitest'
import {
  createRoundLetters,
  createSessionResult,
  handleEnd,
  handleNext,
  handlePause,
  handlePrediction,
  handleResume,
  handleSkip,
  handleStart,
  initialGameState,
  MAX_PREDICTION_AGE_MS,
  POINTS_PER_CORRECT_ANSWER,
  supportedLetters
} from '../game/gameLogic'

const activeState = handleStart(initialGameState, 'session-1')

function prediction(letter, timestamp = 1000, stable = true) {
  return { letter, timestamp, stable }
}

describe('game logic', () => {
  test('starts a fresh session with the requested id', () => {
    const state = handleStart(initialGameState, 'session-1')
    expect(state.status).toBe('active')
    expect(state.sessionId).toBe('session-1')
    expect(state.score).toBe(0)
    expect(state.currentRound).toBe(1)
    expect(state.currentLetter).toBe(state.roundLetters[0])
    expect(state.roundLetters).toHaveLength(state.totalRounds)
    expect(new Set(state.roundLetters).size).toBe(state.totalRounds)
  })

  test('selects ten distinct supported letters in randomized order', () => {
    const roundLetters = createRoundLetters(() => 0)

    expect(roundLetters).toHaveLength(10)
    expect(new Set(roundLetters).size).toBe(10)
    expect(roundLetters.every(letter => supportedLetters.includes(letter))).toBe(true)
    expect(roundLetters).not.toEqual(supportedLetters.slice(0, 10))
  })

  test('does not restart an active or paused session', () => {
    expect(handleStart(activeState, 'session-2')).toBe(activeState)
    expect(handleStart(handlePause(activeState), 'session-2').sessionId).toBe('session-1')
  })

  test('only a stable correct prediction in an active round scores once', () => {
    const result = handlePrediction(activeState, prediction(activeState.currentLetter), 1000)
    expect(result.score).toBe(POINTS_PER_CORRECT_ANSWER)
    expect(result.streak).toBe(1)
    expect(result.correctAnswers).toBe(1)
    expect(result.roundsCompleted).toBe(1)
    expect(result.roundCompleted).toBe(true)

    expect(handlePrediction(result, prediction('B', 1100), 1100)).toBe(result)
  })

  test('does not score before start, while paused, or after completion', () => {
    const paused = handlePause(activeState)
    const completed = handleEnd(activeState)
    const currentLetterPrediction = prediction(activeState.currentLetter)

    expect(handlePrediction(initialGameState, currentLetterPrediction, 1000).score).toBe(0)
    expect(handlePrediction(paused, currentLetterPrediction, 1000)).toBe(paused)
    expect(handlePrediction(completed, currentLetterPrediction, 1000)).toBe(completed)
    expect(handlePrediction({ ...activeState, status: 'loading' }, currentLetterPrediction, 1000).score).toBe(0)
    expect(handlePrediction({ ...activeState, status: 'error' }, currentLetterPrediction, 1000).score).toBe(0)
  })

  test('does not score unstable, unsupported, or missing-hand predictions', () => {
    expect(handlePrediction(activeState, prediction('B', 1000, false), 1000)).toBe(activeState)
    expect(handlePrediction(activeState, prediction('P'), 1000)).toBe(activeState)
    expect(handlePrediction(activeState, prediction(null), 1000)).toBe(activeState)
  })

  test('rejects stale, future, and duplicate prediction timestamps', () => {
    const staleTime = 1000 - MAX_PREDICTION_AGE_MS - 1
    expect(handlePrediction(activeState, prediction('B', staleTime), 1000)).toBe(activeState)
    expect(handlePrediction(activeState, prediction('B', 1001), 1000)).toBe(activeState)

    const accepted = handlePrediction(activeState, prediction('C', 900), 1000)
    expect(handlePrediction(accepted, prediction('B', 900), 1000)).toBe(accepted)
  })

  test('records a fresh wrong prediction without changing score', () => {
    const wrongLetter = supportedLetters.find(letter => letter !== activeState.currentLetter)
    const result = handlePrediction(activeState, prediction(wrongLetter), 1000)
    expect(result.recognizedLetter).toBe(wrongLetter)
    expect(result.score).toBe(0)
    expect(result.streak).toBe(0)
  })

  test('skip advances an active round, awards no points, and resets streak', () => {
    const state = { ...activeState, streak: 3 }
    const result = handleSkip(state)

    expect(result.score).toBe(0)
    expect(result.streak).toBe(0)
    expect(result.currentRound).toBe(2)
    expect(result.currentLetter).toBe(state.roundLetters[1])
    expect(result.roundsCompleted).toBe(1)
  })

  test('cannot skip while paused or skip an already completed round', () => {
    const paused = handlePause(activeState)
    const completedRound = { ...activeState, roundCompleted: true }
    expect(handleSkip(paused)).toBe(paused)
    expect(handleSkip(completedRound)).toBe(completedRound)
  })

  test('next advances only after a scored round', () => {
    const result = handlePrediction(activeState, prediction(activeState.currentLetter), 1000)
    const next = handleNext(result)

    expect(next.currentRound).toBe(2)
    expect(next.currentLetter).toBe(activeState.roundLetters[1])
    expect(next.roundCompleted).toBe(false)
    expect(next.recognizedLetter).toBe(null)
    expect(handleNext(activeState)).toBe(activeState)
  })

  test('skip or a correct answer on the tenth round completes the session', () => {
    const tenthRound = { ...activeState, currentRound: 10, currentLetter: 'C' }
    const skipped = handleSkip(tenthRound)
    const answered = handlePrediction(tenthRound, prediction('C'), 1000)

    expect(skipped.status).toBe('completed')
    expect(skipped.currentRound).toBe(10)
    expect(answered.status).toBe('completed')
    expect(answered.score).toBe(POINTS_PER_CORRECT_ANSWER)
  })

  test('pause and resume clear the previous prediction timestamp', () => {
    const predictionSeen = handlePrediction(activeState, prediction('C', 900), 1000)
    expect(handlePause(predictionSeen).lastPredictionTimestamp).toBe(null)
    expect(handleResume(handlePause(predictionSeen)).status).toBe('active')
  })

  test('ending a session preserves its results and prevents further actions', () => {
    const earnedPoints = handlePrediction(activeState, prediction(activeState.currentLetter), 1000)
    const ended = handleEnd(earnedPoints)

    expect(ended.status).toBe('completed')
    expect(ended.score).toBe(POINTS_PER_CORRECT_ANSWER)
    expect(handleSkip(ended)).toBe(ended)
    expect(createSessionResult(ended, '2026-10-17T12:00:00.000Z')).toEqual({
      sessionId: 'session-1',
      completedAt: '2026-10-17T12:00:00.000Z',
      score: POINTS_PER_CORRECT_ANSWER,
      correctAnswers: 1,
      totalRounds: 10,
      roundsCompleted: 1
    })
  })

  test('does not produce a result for an incomplete session', () => {
    expect(createSessionResult(activeState, '2026-10-17T12:00:00.000Z')).toBe(null)
  })

  test('the session prompt list uses only supported letters', () => {
    expect(supportedLetters).toEqual([
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
      'L', 'M', 'N', 'O', 'Q', 'R', 'T', 'V', 'W', 'X', 'Y'
    ])
  })
})

describe('session controls', () => {
  test('pause and resume only apply to valid session states', () => {
    expect(handlePause(initialGameState)).toBe(initialGameState)
    expect(handleResume(activeState)).toBe(activeState)
    expect(handleResume(handlePause(activeState)).status).toBe('active')
  })

  test('ending an unstarted session has no effect', () => {
    expect(handleEnd(initialGameState)).toBe(initialGameState)
  })
})
