export const supportedLetters = ['B', 'C', 'F', 'I', 'L', 'O', 'V', 'Y']
export const MAX_PREDICTION_AGE_MS = 1000

export const initialGameState = {
  sessionId: null,
  currentLetter: 'B',
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

export function handleStart(state, sessionId) {
  if (state.status === 'active' || state.status === 'paused') {
    return state
  }

  return {
    ...initialGameState,
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
    currentLetter: getNextLetter(state.currentLetter),
    recognizedLetter: null,
    lastPredictionTimestamp: null,
    roundCompleted: false,
    currentRound: state.currentRound + 1,
    feedback: ''
  }
}

export function getNextLetter(currentLetter) {
  const currentIndex = supportedLetters.indexOf(currentLetter)
  return supportedLetters[(currentIndex + 1) % supportedLetters.length]
}

export function handleCorrectMatch(state) {
  const isFinalRound = state.currentRound === state.totalRounds

  return {
    ...state,
    roundCompleted: true,
    roundsCompleted: state.roundsCompleted + 1,
    score: state.score + 10,
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
    currentLetter: isFinalRound ? state.currentLetter : getNextLetter(state.currentLetter),
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
