export const defaultDatabaseUrl =
  "postgresql://postgres:postgres@localhost:5432/agentclinic?schema=public";

export function getDatabaseUrl() {
  return process.env.DATABASE_URL ?? defaultDatabaseUrl;
}
