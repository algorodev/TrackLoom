import { type EventName, type PropsOf } from './events'
import { validateEvent, validateEnvelope } from './validate'
import { SDKError, SchemaError, devThrowOrFalse } from './errors'
import { defaultConfig, type CoreConfig } from './config'
import { getContext, initState, resetIdentity, setUser } from './state'

let cfg: CoreConfig = { ...defaultConfig }

function nowIso() {
  return new Date().toISOString()
}

export function configure(config: CoreConfig) {
  cfg = { ...defaultConfig, ...config }
  initState(cfg.app)
  return true
}

export function identify(userId: string, traits?: Record<string, unknown>) {
  if (!cfg) return devThrowOrFalse(new SDKError('NOT_CONFIGURED', 'TrackLoom not configured'))
  setUser(userId, traits)
  return true
}

export function reset() {
  if (!cfg) return devThrowOrFalse(new SDKError('NOT_CONFIGURED', 'TrackLoom not configured'))
  resetIdentity()
  return true
}

export function track<E extends EventName>(name: E, props: PropsOf<E>) {
  if (!cfg) return devThrowOrFalse(new SDKError('NOT_CONFIGURED', 'TrackLoom not configured'))

  const propCheck = validateEvent(name, props)
  if (!propCheck.ok) {
    const err = new SchemaError(`Invalid props for "${name}": ${propCheck.error}`)
    cfg.onError?.(err)
    return devThrowOrFalse(err)
  }

  const envelope = {
    id: crypto.randomUUID(),
    name,
    ts: nowIso(),
    properties: propCheck.data,
    context: getContext(),
    meta: { schemaVersion: 1 },
  }

  const envCheck = validateEnvelope(envelope)
  if (!envCheck.success) {
    const err = new SDKError('ENVELOPE_INVALID', envCheck.error.message, envCheck.error)
    cfg.onError?.(err)
    return devThrowOrFalse(err)
  }

  return envCheck.data
}

export function page(props: Partial<import('./events').PropsOf<'Page Viewed'>> = {}) {
  return track('Page Viewed', props as any)
}
