import type { TLContext } from './envelope'

type InternalState = {
  cfgAppName: string;
  userId?: string;
  traits?: Record<string, unknown>;
  sessionId: string;
  anonId: string;
  appVersion?: string;
  env?: 'dev' | 'staging' | 'prod';
};

let s: InternalState = {
  cfgAppName: 'app',
  sessionId: crypto.randomUUID(),
  anonId: crypto.randomUUID(),
}

export function initState(app: { name: string; version?: string; env?: 'dev' | 'staging' | 'prod' }) {
  s.cfgAppName = app.name
  s.appVersion = app.version
  s.env = app.env
}

export function setUser(userId?: string, traits?: Record<string, unknown>) {
  s.userId = userId
  s.traits = traits ?? s.traits
}

export function resetIdentity() {
  s.userId = undefined
  s.traits = undefined
}

export function getContext(): TLContext {
  return {
    sessionId: s.sessionId,
    anonId: s.anonId,
    userId: s.userId,
    app: { name: s.cfgAppName, version: s.appVersion, env: s.env },
    library: { name: 'trackloom', version: '0.1.0' },
  }
}
