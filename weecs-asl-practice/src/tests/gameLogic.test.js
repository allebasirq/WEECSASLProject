import { describe, test, expect } from 'vitest'
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

describe('game logic', () => {

  test('correct prediction awards 10 points', () => {
    const state = handlePrediction(initialGameState, 'B')

    expect(state.score).toBe(10)
  })

  test('correct prediction increases streak', () => {
    const state = handlePrediction(initialGameState, 'B')

    expect(state.streak).toBe(1)
  })

  test('correct prediction completes the current round', () => {
    const state = handlePrediction(initialGameState, 'B')

    expect(state.currentRound).toBe(1)
    expect(state.currentLetter).toBe('B')
    expect(state.roundCompleted).toBe(true)
    expect(state.score).toBe(10)
    expect(state.streak).toBe(1)
    expect(state.correctAnswers).toBe(1)
  })

  test('correct prediction increases correct answers', () => {
    const state = handlePrediction(initialGameState, 'B')

    expect(state.correctAnswers).toBe(1)
  })

  test('skip gives zero points', () => {
    const state = handleSkip(initialGameState)

    expect(state.score).toBe(0)
  })

  test('skip resets the streak', () => {
    const state = {
      ...initialGameState,
      streak: 3
    }

    const newState = handleSkip(state)

    expect(newState.streak).toBe(0)
  })

  test('skip advances to the next round', () => {
    const state = handleSkip(initialGameState)

    expect(state.currentRound).toBe(2)
  })

  test('skip does not increase correct answers', () => {
    const state = handleSkip(initialGameState)

    expect(state.correctAnswers).toBe(0)
  })

  test('completing the tenth round ends the session', () => {
    const state = {
      ...initialGameState,
      currentRound: 10,
      currentLetter: 'C'
    }

    const newState = handlePrediction(state, 'C')

    expect(newState.currentRound).toBe(10)
    expect(newState.roundCompleted).toBe(true)
    expect(newState.score).toBe(10)
    expect(newState.correctAnswers).toBe(1)
  })

  test('skipping the tenth round ends the session', () => {
    const state = {
      ...initialGameState,
      currentRound: 10,
      currentLetter: 'C'
    }

    const newState = handleSkip(state)

    expect(newState.currentRound).toBe(10)
    expect(newState.roundCompleted).toBe(true)
    expect(newState.score).toBe(0)
    expect(newState.correctAnswers).toBe(0)
  })

})

describe('session controls', () => {

  test('handleStart changes status to active', () => {
    const state = {
      ...initialGameState
    }

    const result = handleStart(state)

    expect(result.status).toBe('active')
  })

  test('handlePause changes status to paused', () => {
    const state = {
      ...initialGameState,
      status: 'active'
    }

    const result = handlePause(state)

    expect(result.status).toBe('paused')
  })

  test('handleResume changes status to active', () => {
    const state = {
      ...initialGameState,
      status: 'paused'
    }

    const result = handleResume(state)

    expect(result.status).toBe('active')
  })

  test('handleEnd changes status to completed', () => {
    const state = {
      ...initialGameState,
      status: 'active',
      score: 30,
      streak: 3
    }

    const result = handleEnd(state)

    expect(result.status).toBe('completed')
    expect(result.score).toBe(30)
    expect(result.streak).toBe(3)
  })

  test('handleNext advances to the next round', () => {
    const state = {
        ...initialGameState,
        currentLetter: 'C',
        currentRound: 2,
        recognizedLetter: 'C',
        roundCompleted: true,
        feedback: 'Correct!'
    }

    const result = handleNext(state)

    expect(result.currentLetter).toBe('F')
    expect(result.currentRound).toBe(3)
    expect(result.recognizedLetter).toBe(null)
    expect(result.roundCompleted).toBe(false)
    expect(result.feedback).toBe('')
   })

    test('handleNext completes the session after the tenth round', () => {
    const state = {
      ...initialGameState,
      currentLetter: 'C',
      currentRound: 10,
      recognizedLetter: 'C',
      roundCompleted: true,
      feedback: 'Correct!',
      status: 'active'
    }

    const result = handleNext(state)

    expect(result.currentRound).toBe(10)
    expect(result.status).toBe('completed')
  })

})