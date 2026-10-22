import { describe, expect, it } from 'vitest'
import {
  createPredictionEvent,
  mapCategoryToLetter
} from '../../hand_tracking/predictionContract'

describe('prediction event contract', () => {
  it('normalizes a recognized letter and preserves numeric confidence and timestamp', () => {
    const event = createPredictionEvent({
      landmarks: [[{ x: 0, y: 0, z: 0 }]],
      handedness: [[{ displayName: 'Right' }]],
      gestures: [[{ categoryName: 'b', score: 0.94 }]]
    }, 12345.67)

    expect(event).toEqual({
      handPresent: true,
      letter: 'B',
      confidence: 0.94,
      timestamp: 12345.67
    })
  })

  it('reports no hand explicitly so consumers can reset stable prediction state', () => {
    const event = createPredictionEvent({
      landmarks: [],
      handedness: [],
      gestures: []
    }, 12346)

    expect(event).toEqual({
      handPresent: false,
      letter: null,
      confidence: null,
      timestamp: 12346
    })
  })

  it('reports a present but unclassified hand without inventing a letter', () => {
    const event = createPredictionEvent({
      landmarks: [[{ x: 0, y: 0, z: 0 }]],
      handedness: [[{ displayName: 'Left' }]],
      gestures: []
    }, 12347)

    expect(event).toEqual({
      handPresent: true,
      letter: null,
      confidence: null,
      timestamp: 12347
    })
  })

  it('rejects non-letter categories and invalid classifier confidence', () => {
    const event = createPredictionEvent({
      landmarks: [[{ x: 0, y: 0, z: 0 }]],
      gestures: [[{ categoryName: 'Open_Palm', score: 1.2 }]]
    }, Number.NaN)

    expect(event).toEqual({
      handPresent: true,
      letter: null,
      confidence: null,
      timestamp: null
    })
  })

  it('maps the no-recognition category to no letter and no confidence', () => {
    const event = createPredictionEvent({
      landmarks: [[{ x: 0, y: 0, z: 0 }]],
      gestures: [[{ categoryName: 'None', score: 0.905 }]]
    }, 12348)

    expect(event).toEqual({
      handPresent: true,
      letter: null,
      confidence: null,
      timestamp: 12348
    })
  })

  it('does not guess letters from unvalidated descriptive model categories', () => {
    expect(mapCategoryToLetter('Closed_Fist')).toBe(null)
    expect(mapCategoryToLetter('Open_Palm')).toBe(null)
    expect(mapCategoryToLetter('ILoveYou')).toBe(null)
  })

  it('passes through single-letter categories and normalizes their case', () => {
    expect(mapCategoryToLetter('b')).toBe('B')
    expect(mapCategoryToLetter(' Y ')).toBe('Y')
    expect(mapCategoryToLetter('')).toBe(null)
    expect(mapCategoryToLetter(undefined)).toBe(null)
  })
})
