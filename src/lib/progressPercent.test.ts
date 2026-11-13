import { describe, expect, it } from 'vitest'
import { progressPercent } from './progressPercent'

describe('progressPercent', () => {
  it('rounds to a whole percentage', () => {
    expect(progressPercent(45, 200)).toBe(23)
  })

  it('clamps above max and below zero', () => {
    expect(progressPercent(250, 200)).toBe(100)
    expect(progressPercent(-5, 200)).toBe(0)
  })

  it('returns 0 when max is not positive', () => {
    expect(progressPercent(10, 0)).toBe(0)
  })
})
