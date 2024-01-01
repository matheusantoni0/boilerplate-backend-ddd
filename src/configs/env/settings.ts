import assert from "assert";

export function getEnvOrThrow(envName: string): string {
  const env = process.env[envName];
  assert(env, `Missing environment variable ${envName}`);
  return env;
}

export function getEnvOrDefault(envName: string, defaultValue: string): string {
  return process.env[envName] ?? defaultValue;
}

export const ENVIRONMENT = getEnvOrDefault("NODE_ENV", "development");
export const APP_PORT = getEnvOrDefault("APP_PORT", "3003");
export const LOAD_MODULES = getEnvOrDefault("LOAD_MODULES", ["seguro-incendio"].join(","));
export const CORS_ALLOWED_ORIGINS = getEnvOrDefault("CORS_ALLOWED_ORIGINS", "*");

export const POSTGRES_DATABASE = getEnvOrThrow("POSTGRES_DATABASE");
export const POSTGRES_HOST = getEnvOrThrow("POSTGRES_HOST");
export const POSTGRES_PASSWORD = getEnvOrThrow("POSTGRES_PASSWORD");
export const POSTGRES_PORT = getEnvOrThrow("POSTGRES_PORT");
export const POSTGRES_USERNAME = getEnvOrThrow("POSTGRES_USERNAME");
export const isProdOrStaging = (): boolean =>
  ENVIRONMENT === "production" || ENVIRONMENT === "staging";
