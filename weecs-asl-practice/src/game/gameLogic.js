export const supportedLetters = ['B', 'C', 'F', 'I', 'L', 'O', 'V', 'Y']

export const initialGameState = {
  currentLetter: 'B',
  recognizedLetter: null,
  roundCompleted: false,
  score: 0,
  streak: 0,
  currentRound: 1,
  totalRounds: 10,
  correctAnswers: 0,
  feedback: ''
}

export function getNextLetter(currentLetter) {

  const currentIndex = supportedLetters.indexOf(currentLetter)

  return supportedLetters[(currentIndex + 1) % supportedLetters.length]
}

export function handleCorrectMatch(state) {

  const isFinalRound = state.currentRound === state.totalRounds

  return {
    ...state,
    currentLetter: getNextLetter(state.currentLetter),
    roundCompleted: isFinalRound,
    score: state.score + 10,
    streak: state.streak + 1,
    currentRound: isFinalRound ? state.currentRound : state.currentRound + 1,
    correctAnswers: state.correctAnswers + 1,
  }
}

export function handleSkip(state) {

  const isFinalRound = state.currentRound === state.totalRounds

  return {

    ...state,

    currentLetter: getNextLetter(state.currentLetter),

    roundCompleted: isFinalRound,

    streak: 0,

    currentRound: isFinalRound
      ? state.currentRound
      : state.currentRound + 1,

  }

}

export function handlePrediction(state, predictedLetter) {
  
  const updatedState = {
    ...state,
    recognizedLetter: predictedLetter
  }
  
  if (predictedLetter === state.currentLetter && !state.roundCompleted) {
    return handleCorrectMatch(updatedState)
  }

  return {
    ...updatedState,
    streak: 0
  }
}