import { supportedLetters } from './gameLogic'

const VALID_LETTERS = new Set(supportedLetters)

export function createStablePrediction(holdDurationMs = 1000) {
  let currentLetter = null;
  let holdStartTime = null;
  let lastTimestamp = null;
  let predictionAccepted = false;

  function update(predictedLetter, timestamp) {
    if (!Number.isFinite(timestamp) || timestamp < 0) {
      reset();
      return null;
    }

    if (lastTimestamp !== null && timestamp <= lastTimestamp) {
      return null;
    }
    lastTimestamp = timestamp;

    const letter =
      typeof predictedLetter === 'string'
        ? predictedLetter.toUpperCase()
        : null;

    // Invalid letters or missing predictions reset the hold.
    if (!VALID_LETTERS.has(letter)) {
      reset();
      return null;
    }

    // A new letter starts a new hold.
    if (letter !== currentLetter) {
      currentLetter = letter;
      holdStartTime = timestamp;
      predictionAccepted = false;
      return null;
    }

    // Only accept a letter once per continuous hold.
    if (predictionAccepted) {
      return null;
    }

    const elapsedTime = timestamp - holdStartTime;

    if (elapsedTime >= holdDurationMs) {
      predictionAccepted = true;
      return letter;
    }

    return null;
  }

  function reset() {
    currentLetter = null;
    holdStartTime = null;
    lastTimestamp = null;
    predictionAccepted = false;
  }

  return { update, reset };
}