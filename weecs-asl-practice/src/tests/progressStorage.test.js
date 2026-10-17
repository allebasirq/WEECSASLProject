import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  loadProgress,
  resetProgress,
  saveCompletedSession
} from '../game/progressStorage'

const PROGRESS_KEY = 'aslPracticeProgress'
const session = {
  sessionId: 'session-1',
  completedAt: '2026-10-17T12:00:00.000Z',
  score: 20,
  correctAnswers: 2,
  totalRounds: 10,
  roundsCompleted: 3
}

describe('progress storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('loads an empty history when no sessions have been saved', () => {
    expect(loadProgress()).toEqual({ ok: true, sessions: [] })
  })

  it('saves and loads completed session results', () => {
    expect(saveCompletedSession(session)).toEqual({ ok: true, sessions: [session] })
    expect(loadProgress()).toEqual({ ok: true, sessions: [session] })
  })

  it('does not save an incomplete or malformed session', () => {
    expect(saveCompletedSession({ score: 20 })).toEqual({
      ok: false,
      sessions: [],
      error: 'The completed session is invalid and was not saved.'
    })
    expect(loadProgress()).toEqual({ ok: true, sessions: [] })
  })

  it('saves a completed session only once by its session id', () => {
    saveCompletedSession(session)
    const duplicate = saveCompletedSession({ ...session, score: 30 })

    expect(duplicate.sessions).toEqual([session])
    expect(JSON.parse(localStorage.getItem(PROGRESS_KEY)).sessions).toHaveLength(1)
  })

  it('does not load corrupt JSON or an invalid stored structure', () => {
    localStorage.setItem(PROGRESS_KEY, 'invalid json')
    expect(loadProgress().ok).toBe(false)

    localStorage.setItem(PROGRESS_KEY, JSON.stringify({ version: 1, sessions: [{ score: 9 }] }))
    expect(loadProgress()).toEqual({
      ok: false,
      sessions: [],
      error: 'Saved progress has an invalid format.'
    })
  })

  it('resets saved completed-session history', () => {
    saveCompletedSession(session)
    expect(resetProgress()).toEqual({ ok: true, sessions: [] })
    expect(loadProgress()).toEqual({ ok: true, sessions: [] })
  })

  it('reports unavailable storage when reading, writing, or resetting fails', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage unavailable')
    })
    expect(loadProgress()).toEqual({
      ok: false,
      sessions: [],
      error: 'Saved progress could not be read.'
    })
    expect(saveCompletedSession(session).ok).toBe(false)
    vi.restoreAllMocks()

    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('storage unavailable')
    })
    expect(saveCompletedSession(session)).toEqual({
      ok: false,
      sessions: [],
      error: 'Saved progress could not be written.'
    })
    vi.restoreAllMocks()

    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error('storage unavailable')
    })
    expect(resetProgress()).toEqual({
      ok: false,
      sessions: [],
      error: 'Saved progress could not be reset.'
    })
  })
})
