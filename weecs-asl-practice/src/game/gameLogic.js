export const initialGameState = {
  score: 0,
  streak: 0,
  feedback: ''
}

export function handleCorrectMatch(state) {
  return {
    ...state,
    score: state.score + 1,
    streak: state.streak + 1,
    feedback: 'Correct!'
  }
}