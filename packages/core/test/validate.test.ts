import { describe, it, expect } from 'vitest'
import { validateEvent } from '../src/validate'

describe('validateEvent', () => {
  it('passes with correct props', () => {
    const ok = validateEvent('Product Viewed', { productId: 'sku_1', price: 9.99, currency: 'EUR' })
    expect(ok.ok).toBe(true)
  })

  it('fails with wrong props', () => {
    const bad = validateEvent('Purchase Completed', { orderId: 'x', value: -1, currency: 'EUR', items: [] })
    expect(bad.ok).toBe(false)
  })

  it('fails unknown event', () => {
    const u = validateEvent('Nonexistent', {})
    expect(u.ok).toBe(false)
  })
})
