import { describe, it, expect } from 'vitest';
import { createStablePrediction } from '../game/stablePrediction.js';

describe('createStablePrediction', () => {
  it('accepts a letter after one second', () => {
    const stablePrediction = createStablePrediction();

    expect(stablePrediction.update('B', 0)).toBe(null);
    expect(stablePrediction.update('B', 500)).toBe(null);
    expect(stablePrediction.update('B', 1000)).toBe('B');
  });

  it('does not accept a letter before one second', () => {
    const stablePrediction = createStablePrediction();

    stablePrediction.update('C', 0);

    expect(stablePrediction.update('C', 999)).toBe(null);
  });

  it('resets the timer when the letter changes', () => {
    const stablePrediction = createStablePrediction();

    stablePrediction.update('B', 0);
    stablePrediction.update('B', 700);

    expect(stablePrediction.update('C', 800)).toBe(null);
    expect(stablePrediction.update('C', 1500)).toBe(null);
    expect(stablePrediction.update('C', 1800)).toBe('C');
  });

  it('resets when no valid letter is detected', () => {
    const stablePrediction = createStablePrediction();

    stablePrediction.update('B', 0);
    stablePrediction.update('B', 500);

    expect(stablePrediction.update(null, 600)).toBe(null);
    expect(stablePrediction.update('B', 700)).toBe(null);
    expect(stablePrediction.update('B', 1700)).toBe('B');
  });

  it('does not accept unsupported letters', () => {
    const stablePrediction = createStablePrediction();

    expect(stablePrediction.update('A', 0)).toBe(null);
    expect(stablePrediction.update('A', 1500)).toBe(null);
  });

  it('accepts a held letter only once', () => {
    const stablePrediction = createStablePrediction();

    stablePrediction.update('V', 0);

    expect(stablePrediction.update('V', 1000)).toBe('V');
    expect(stablePrediction.update('V', 1500)).toBe(null);
    expect(stablePrediction.update('V', 2000)).toBe(null);
  });

  it('allows a letter to be accepted again after reset', () => {
    const stablePrediction = createStablePrediction();

    stablePrediction.update('L', 0);
    expect(stablePrediction.update('L', 1000)).toBe('L');

    stablePrediction.reset();

    expect(stablePrediction.update('L', 2000)).toBe(null);
    expect(stablePrediction.update('L', 3000)).toBe('L');
  });

  it('ignores out-of-order frames and resets on an invalid timestamp', () => {
    const stablePrediction = createStablePrediction();

    stablePrediction.update('B', 1000);
    expect(stablePrediction.update('B', 900)).toBe(null);
    expect(stablePrediction.update('B', 2000)).toBe('B');

    expect(stablePrediction.update('C', Number.NaN)).toBe(null);
    stablePrediction.update('C', 3000);
    expect(stablePrediction.update('C', 4000)).toBe('C');
  });
});