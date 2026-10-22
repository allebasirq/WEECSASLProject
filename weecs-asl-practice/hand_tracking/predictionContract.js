const CATEGORY_TO_LETTER = Object.freeze({})

export function mapCategoryToLetter(categoryName) {
  if (typeof categoryName !== 'string') return null

  const normalizedCategory = categoryName.trim().toUpperCase()
  if (!normalizedCategory || normalizedCategory === 'NONE') return null

  const mappedLetter = CATEGORY_TO_LETTER[normalizedCategory]
  if (mappedLetter) return mappedLetter

  return /^[A-Z]$/.test(normalizedCategory) ? normalizedCategory : null
}

export function createPredictionEvent(result, timestamp) {
  const handPresent = Boolean(
    result.landmarks?.length ||
    result.handedness?.length
  )
  const gesture = result.gestures?.[0]?.[0]
  const letter = mapCategoryToLetter(gesture?.categoryName)
  const confidence = Number.isFinite(gesture?.score) &&
    gesture.score >= 0 &&
    gesture.score <= 1
    ? gesture.score
    : null

  return {
    handPresent,
    letter: handPresent ? letter : null,
    confidence: handPresent && letter ? confidence : null,
    timestamp: Number.isFinite(timestamp) ? timestamp : null
  }
}
