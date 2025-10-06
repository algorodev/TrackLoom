import { z } from 'zod'
import { eventSchemas, type EventName } from './events'
import { EnvelopeSchema } from './envelope'

export type Ok<T> = { ok: true; data: T };
export type Err = { ok: false; error: z.ZodError | Error; code?: string };

export function validateEvent<E extends EventName>(
  name: E,
  properties: unknown,
): Ok<z.infer<(typeof eventSchemas)[E]>> | Err {
  const schema = eventSchemas[name]
  if (!schema) {
    return { ok: false, error: new Error(`Unknown event: ${name}`), code: 'UNKNOWN_EVENT' }
  }
  const parsed = schema.safeParse(properties)
  return parsed.success
    ? { ok: true, data: parsed.data as z.infer<(typeof eventSchemas)[E]> }
    : { ok: false, error: parsed.error, code: 'SCHEMA_INVALID' }
}

export function validateEnvelope(envelope: unknown) {
  return EnvelopeSchema.safeParse(envelope)
}
