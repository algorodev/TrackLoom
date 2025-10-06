import { z } from 'zod'
import type { EventName } from './events'

export const ContextSchema = z.object({
  sessionId: z.string(),
  anonId: z.string().optional(),
  userId: z.string().optional(),
  reason: z.enum(['cold', 'warm', 'hot']).optional(),
  app: z.object({
    name: z.string(),
    version: z.string().optional(),
    env: z.enum(['dev', 'staging', 'prod']).optional(),
  }).optional(),
  page: z.object({
    url: z.string().optional(),
    referrer: z.string().optional(),
    title: z.string().optional(),
    path: z.string().optional(),
  }).optional(),
  device: z.object({
    ua: z.string().optional(),
    language: z.string().optional(),
    screen: z.object({
      w: z.number().int().positive().optional(),
      h: z.number().int().positive().optional(),
    }).optional(),
  }).optional(),
  locale: z.string().optional(),
  timezone: z.string().optional(),
  consent: z.object({
    state: z.enum(['granted', 'denied', 'unknown']),
    basis: z.enum(['consent', 'contract', 'legitimate_interest']).optional(),
    at: z.string().optional(),
    source: z.enum(['cmp', 'manual']).optional(),
  }).optional(),
  library: z.object({
    name: z.literal('trackloom'),
    version: z.string(),
  }).optional(),
})

export type TLContext = z.infer<typeof ContextSchema>;

export const MetaSchema = z.object({
  schemaVersion: z.number().int().positive().optional(),
  retryCount: z.number().int().nonnegative().optional(),
  droppedReason: z.enum(['overflow', 'ttl', 'invalid', 'adapter_error']).optional(),
}).optional()

export const EnvelopeSchema = z.object({
  id: z.string(),
  name: z.custom<EventName>(),
  ts: z.string(),
  properties: z.unknown(),
  context: ContextSchema,
  meta: MetaSchema,
})

export type TLMeta = z.infer<typeof MetaSchema>;
