import { describe, test, expect } from 'vitest'
import {
  initialGameState,
  handlePrediction,
  handleSkip
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

  test('correct prediction advances to the next round', () => {
    const state = handlePrediction(initialGameState, 'B')

    expect(state.currentRound).toBe(2)
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
