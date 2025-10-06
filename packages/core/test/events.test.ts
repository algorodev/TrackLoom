import { describe, it, expect, expectTypeOf } from 'vitest'
import { eventSchemas, type PropsOf } from '../src/events'
import { track } from '../src/api'

describe('Event catalog & typing', () => {
  it('EventName is derived from catalog keys', () => {
    const names = Object.keys(eventSchemas)
    expect(names).toContain('Page Viewed')
  })

  it('PropsOf enforces correct props for Purchase Completed', () => {
    type Purchase = PropsOf<'Purchase Completed'>;
    const ok: Purchase = {
      orderId: 'ord_1',
      value: 49,
      currency: 'EUR',
      items: [{ productId: 'sku_1', quantity: 1, price: 49 }],
    }
    expectTypeOf(ok).toEqualTypeOf<Purchase>()

    const bad: Purchase = { orderId: 'x', value: 1, currency: 'EU', items: [] }
    void bad
  })

  it('track returns an envelope for valid events', () => {
    const env = track('Page Viewed', { path: '/pricing', title: 'Pricing' })
    if (env && typeof env === 'object') {
      expect(env).toHaveProperty('id')
      expect(env).toHaveProperty('name', 'Page Viewed')
      expect(env).toHaveProperty('properties')
      expect(env).toHaveProperty('context')
    }
  })

  it('track fails for invalid props', () => {
    expect(() => {
      track('Product Added', { productId: 'p1', quantity: -2 })
    }).toThrow('Invalid props for "Product Added"')
  })
})
