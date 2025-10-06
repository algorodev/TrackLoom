import { describe, it, expect, vi } from 'vitest'
import { configure, track, page, identify, reset } from '../src/api'

describe('api', () => {
  it('track returns a validated envelope for a known event', () => {
    configure({ app: { name: 'shop' } })
    const env = track('Page Viewed', { path: '/pricing', title: 'Pricing' })
    expect(env && typeof env === 'object').toBe(true)
    if (env && typeof env === 'object') {
      expect(env).toHaveProperty('id')
      expect(env).toHaveProperty('name', 'Page Viewed')
      expect(env).toHaveProperty('ts')
      expect(env).toHaveProperty('context')
      expect((env as any).properties?.path).toBe('/pricing')
    }
  })

  it('page sugar calls track(\'Page Viewed\')', () => {
    configure({ app: { name: 'shop' } })
    const env = page({ path: '/home' })
    expect((env as any).name).toBe('Page Viewed')
  })

  it('invalid props trigger onError and non-throwing behavior in production', () => {
    const prev = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'
    const onError = vi.fn()
    configure({ app: { name: 'shop' }, onError })

    const res = track('Product Added', { productId: 'p1', quantity: -2 } as any)
    expect(onError).toHaveBeenCalledTimes(1)
    expect(res).toBe(false)

    process.env.NODE_ENV = prev
  })

  it('identify + track includes userId in context', () => {
    configure({ app: { name: 'shop' } })
    identify('user-42')
    const env = track('Page Viewed', { path: '/u/42' })
    expect((env as any).context.userId).toBe('user-42')
    reset()
  })
})
