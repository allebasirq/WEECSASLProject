const PROGRESS_KEY = 'aslPracticeProgress'

export function saveProgress(session) {
    try {

        localStorage.setItem(
            PROGRESS_KEY,
            JSON.stringify(session)
        )

        return true

    } catch {
        return false
    }
}

export function loadProgress() {

  try {

    const savedProgress = localStorage.getItem(PROGRESS_KEY)

    if (savedProgress === null) {

      return null

    }

    return JSON.parse(savedProgress)

  } catch {
    return null
  }

}

export function resetProgress() {

  try {

    localStorage.removeItem(PROGRESS_KEY)

    return true

  } catch {

    return false

  }

}