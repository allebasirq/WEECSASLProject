import { useState } from 'react'
import NavBar from '../components/NavBar'
import { loadProgress, resetProgress } from '../game/progressStorage'
import '../styling/progress.css'

function Progress() {
  const [progress, setProgress] = useState(() => loadProgress())

  function clearProgress() {
    const result = resetProgress()
    setProgress(result)
  }

  function reloadProgress() {
    setProgress(loadProgress())
  }

  return (
    <main className="progress-page">
      <NavBar />
      <h1>Progress</h1>
      {progress.ok ? (
        <>
          <p>{progress.sessions.length} completed practice session(s) saved.</p>
          {progress.sessions.length === 0 ? (
            <p>Complete a practice session to see your results here.</p>
          ) : (
            <ol className="progress-sessions">
              {progress.sessions.map(session => (
                <li key={session.sessionId}>
                  <h2>Practice session</h2>
                  <p>
                    Completed: {new Date(session.completedAt).toLocaleString()}
                  </p>
                  <p>Score: {session.score} / {session.totalRounds * 10}</p>
                  <p>
                    Correct: {session.correctAnswers} of {session.totalRounds}
                  </p>
                  <p>
                    Rounds completed: {session.roundsCompleted} of {session.totalRounds}
                  </p>
                </li>
              ))}
            </ol>
          )}
          {progress.sessions.length > 0 && (
            <button type="button" onClick={clearProgress}>
              Reset saved progress
            </button>
          )}
        </>
      ) : (
        <div role="alert">
          <p>{progress.error}</p>
          <p>Your practice is still available, but saved progress could not be loaded.</p>
          <button type="button" onClick={reloadProgress}>Try again</button>
          <button type="button" onClick={clearProgress}>Reset saved progress</button>
        </div>
      )}
      {progress.ok && progress.sessions.length > 0 && (
        <button type="button" onClick={reloadProgress}>Refresh progress</button>
      )}
    </main>
  )
}

export default Progress
