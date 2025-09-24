import { describe, it, expect } from 'vitest'
import { identity } from '../src'

describe('identity', () => {
  it('returns the same value', () => {
    expect(identity(42)).toBe(42)
  })
})
