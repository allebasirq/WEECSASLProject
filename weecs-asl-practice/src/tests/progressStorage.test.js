import { describe, it, expect } from 'vitest'
import { saveProgress, loadProgress, resetProgress } from '../game/progressStorage'

describe('progress storage', () => {

    it('saves and loads a session', () => {

        const session = {
            score: 20,
            streak: 2,
            currentRound: 3
        }

        saveProgress(session)
        const loadedSession = loadProgress()
        expect(loadedSession).toEqual(session)

    })

    it('returns null when there is no saved progress', () => {
        resetProgress()

        const loadedSession = loadProgress()

        expect(loadedSession).toBeNull()
    })

    it('resets saved progress', () => {

        const session = {
            score: 20,
            streak: 2,
            currentRound: 3
        }

        saveProgress(session)

        resetProgress()

        const loadedSession = loadProgress()

        expect(loadedSession).toBeNull()

    })

    it('returns null when saved progress is invalid JSON', () => {

        localStorage.setItem('aslPracticeProgress', 'invalid json')

        const loadedSession = loadProgress()

        expect(loadedSession).toBeNull()

    })

})