import { describe, it, expect } from 'vitest'
import { configure } from '../src/api'

describe('configure', () => {
  it('applies minimal config successfully', () => {
    const ok = configure({ app: { name: 'myapp' } })
    expect(ok).toBe(true)
  })

  it('accepts full app config', () => {
    const ok = configure({ app: { name: 'myapp', version: '1.2.3', env: 'staging' } })
    expect(ok).toBe(true)
  })
})
