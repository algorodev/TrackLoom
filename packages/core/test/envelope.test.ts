import { describe, it, expect } from 'vitest'
import { EnvelopeSchema } from '../src/envelope'

describe('EnvelopeSchema', () => {
  const base = {
    id: 'uuid-1',
    name: 'Page Viewed',
    ts: new Date().toISOString(),
    properties: { path: '/home' },
    context: {
      sessionId: 'sess-1',
      library: { name: 'trackloom', version: '0.1.0' },
    },
    meta: { schemaVersion: 1 },
  }

  it('parses a valid envelope', () => {
    const res = EnvelopeSchema.safeParse(base)
    expect(res.success).toBe(true)
  })

  it('fails if id missing', () => {
    const { id, ...rest } = base as any
    const res = EnvelopeSchema.safeParse(rest)
    expect(res.success).toBe(false)
  })

  it('fails if context.sessionId missing', () => {
    const bad = {
      ...base,
      context: { library: { name: 'trackloom', version: '0.1.0' } },
    }
    const res = EnvelopeSchema.safeParse(bad)
    expect(res.success).toBe(false)
  })
})
