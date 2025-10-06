export type EnvName = 'dev' | 'staging' | 'prod';

export type CoreConfig = {
  app: { name: string; version?: string; env?: EnvName };
  respectDNT?: boolean;
  onError?: (err: unknown) => void;
};

export const defaultConfig: CoreConfig = {
  app: { name: 'app' },
  respectDNT: true,
}
