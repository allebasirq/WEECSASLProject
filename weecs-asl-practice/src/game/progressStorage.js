const PROGRESS_KEY = 'aslPracticeProgress'

function isValidSession(session) {
  return Boolean(
    session &&
    typeof session.sessionId === 'string' &&
    session.sessionId.length > 0 &&
    typeof session.completedAt === 'string' &&
    Number.isFinite(Date.parse(session.completedAt)) &&
    Number.isInteger(session.score) &&
    session.score >= 0 &&
    Number.isInteger(session.totalRounds) &&
    session.totalRounds > 0 &&
    Number.isInteger(session.correctAnswers) &&
    session.correctAnswers >= 0 &&
    session.correctAnswers <= session.totalRounds &&
    Number.isInteger(session.roundsCompleted) &&
    session.roundsCompleted >= session.correctAnswers &&
    session.roundsCompleted <= session.totalRounds
  )
}

function readSessions() {
  const savedProgress = localStorage.getItem(PROGRESS_KEY)
  if (savedProgress === null) return { ok: true, sessions: [] }

  const parsedProgress = JSON.parse(savedProgress)
  if (
    !parsedProgress ||
    parsedProgress.version !== 1 ||
    !Array.isArray(parsedProgress.sessions) ||
    !parsedProgress.sessions.every(isValidSession)
  ) {
    return { ok: false, sessions: [], error: 'Saved progress has an invalid format.' }
  }

  return { ok: true, sessions: parsedProgress.sessions }
}

export function loadProgress() {
  try {
    return readSessions()
  } catch {
    return { ok: false, sessions: [], error: 'Saved progress could not be read.' }
  }
}

export function saveCompletedSession(session) {
  if (!isValidSession(session)) {
    return { ok: false, sessions: [], error: 'The completed session is invalid and was not saved.' }
  }

  try {
    const currentProgress = readSessions()
    if (!currentProgress.ok) return currentProgress

    if (currentProgress.sessions.some(({ sessionId }) => sessionId === session.sessionId)) {
      return currentProgress
    }

    const sessions = [session, ...currentProgress.sessions]
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({ version: 1, sessions }))
    return { ok: true, sessions }
  } catch {
    return { ok: false, sessions: [], error: 'Saved progress could not be written.' }
  }
}

export function resetProgress() {
  try {
    localStorage.removeItem(PROGRESS_KEY)
    return { ok: true, sessions: [] }
  } catch {
    return { ok: false, sessions: [], error: 'Saved progress could not be reset.' }
  }
}
