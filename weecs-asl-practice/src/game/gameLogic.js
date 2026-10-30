export const supportedLetters = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
  'L', 'M', 'N', 'O', 'Q', 'R', 'T', 'V', 'W', 'X', 'Y'
]
export const MAX_PREDICTION_AGE_MS = 1000
export const POINTS_PER_CORRECT_ANSWER = 10

export const initialGameState = {
  sessionId: null,
  currentLetter: 'A',
  roundLetters: [],
  recognizedLetter: null,
  lastPredictionTimestamp: null,
  roundCompleted: false,
  score: 0,
  streak: 0,
  currentRound: 1,
  totalRounds: 10,
  correctAnswers: 0,
  roundsCompleted: 0,
  feedback: '',
  status: 'not_started'
}

export function createRoundLetters(random = Math.random) {
  const shuffledLetters = [...supportedLetters]

  for (let index = shuffledLetters.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    const letter = shuffledLetters[index]
    shuffledLetters[index] = shuffledLetters[swapIndex]
    shuffledLetters[swapIndex] = letter
  }

  return shuffledLetters.slice(0, initialGameState.totalRounds)
}

export function handleStart(state, sessionId, random = Math.random) {
  if (state.status === 'active' || state.status === 'paused') {
    return state
  }

  const roundLetters = createRoundLetters(random)

  return {
    ...initialGameState,
    currentLetter: roundLetters[0],
    roundLetters,
    sessionId,
    status: 'active'
  }
}

export function handlePause(state) {
  if (state.status !== 'active') return state

  return {
    ...state,
    status: 'paused',
    recognizedLetter: null,
    lastPredictionTimestamp: null
  }
}

export function handleResume(state) {
  if (state.status !== 'paused') return state

  return {
    ...state,
    status: 'active',
    recognizedLetter: null,
    lastPredictionTimestamp: null
  }
}

export function handleEnd(state) {
  if (state.status !== 'active' && state.status !== 'paused') return state

  return {
    ...state,
    status: 'completed',
    recognizedLetter: null,
    lastPredictionTimestamp: null
  }
}

export function handleNext(state) {
  if (state.status !== 'active' || !state.roundCompleted) return state

  if (state.currentRound >= state.totalRounds) {
    return { ...state, status: 'completed' }
  }

  return {
    ...state,
    currentLetter: state.roundLetters[state.currentRound],
    recognizedLetter: null,
    lastPredictionTimestamp: null,
    roundCompleted: false,
    currentRound: state.currentRound + 1,
    feedback: ''
  }
}

export function handleCorrectMatch(state) {
  const isFinalRound = state.currentRound === state.totalRounds

  return {
    ...state,
    roundCompleted: true,
    roundsCompleted: state.roundsCompleted + 1,
    score: state.score + POINTS_PER_CORRECT_ANSWER,
    streak: state.streak + 1,
    correctAnswers: state.correctAnswers + 1,
    status: isFinalRound ? 'completed' : state.status
  }
}

export function handleSkip(state) {
  if (state.status !== 'active' || state.roundCompleted) return state

  const isFinalRound = state.currentRound === state.totalRounds

  return {
    ...state,
    currentLetter: isFinalRound
      ? state.currentLetter
      : state.roundLetters[state.currentRound],
    recognizedLetter: null,
    lastPredictionTimestamp: null,
    roundCompleted: isFinalRound,
    roundsCompleted: state.roundsCompleted + 1,
    streak: 0,
    currentRound: isFinalRound ? state.currentRound : state.currentRound + 1,
    feedback: '',
    status: isFinalRound ? 'completed' : state.status
  }
}

export function handlePrediction(state, prediction, now = performance.now()) {
  if (state.status !== 'active' || state.roundCompleted || !prediction?.stable) {
    return state
  }

  const letter = typeof prediction.letter === 'string'
    ? prediction.letter.toUpperCase()
    : null
  const timestamp = prediction.timestamp

  if (
    !supportedLetters.includes(letter) ||
    !Number.isFinite(timestamp) ||
    timestamp < 0 ||
    timestamp > now ||
    now - timestamp > MAX_PREDICTION_AGE_MS ||
    (state.lastPredictionTimestamp !== null && timestamp <= state.lastPredictionTimestamp)
  ) {
    return state
  }

  const updatedState = {
    ...state,
    recognizedLetter: letter,
    lastPredictionTimestamp: timestamp
  }

  if (letter === state.currentLetter) {
    return handleCorrectMatch(updatedState)
  }

  return updatedState
}

export function createSessionResult(state, completedAt) {
  if (state.status !== 'completed' || !state.sessionId) return null

  return {
    sessionId: state.sessionId,
    completedAt,
    score: state.score,
    correctAnswers: state.correctAnswers,
    totalRounds: state.totalRounds,
    roundsCompleted: state.roundsCompleted
  }
}
