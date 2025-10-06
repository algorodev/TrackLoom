export type SDKErrorCode =
  | 'SCHEMA_INVALID'
  | 'UNKNOWN_EVENT'
  | 'ENVELOPE_INVALID'
  | 'CONSENT_BLOCKED'
  | 'NOT_CONFIGURED';

export class SDKError extends Error {
  code: SDKErrorCode
  cause?: unknown

  constructor(code: SDKErrorCode, message: string, cause?: unknown) {
    super(message)
    this.name = 'SDKError'
    this.code = code
    this.cause = cause
  }
}

export class SchemaError extends SDKError {
  constructor(message: string, cause?: unknown) {
    super('SCHEMA_INVALID', message, cause)
    this.name = 'SchemaError'
  }
}

export function devThrowOrFalse(e: Error): false {
  if (process.env.NODE_ENV !== 'production') throw e
  return false
}
