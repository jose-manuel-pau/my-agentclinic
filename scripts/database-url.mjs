import { existsSync, readFileSync } from "node:fs";

export const defaultDatabaseUrl =
  "postgresql://postgres:postgres@localhost:5432/agentclinic?schema=public";

export function loadEnvFile(fileName) {
  if (!existsSync(fileName)) {
    return;
  }

  for (const line of readFileSync(fileName, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)\s*$/);

    if (!match || process.env[match[1]]) {
      continue;
    }

    process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
}

export function loadLocalDatabaseUrl() {
  loadEnvFile(".env");
  loadEnvFile(".env.local");

  return process.env.DATABASE_URL ?? defaultDatabaseUrl;
}

export function getMaintenanceDatabaseUrl(connectionString) {
  const url = new URL(connectionString);

  url.pathname = "/postgres";
  url.search = "";

  return url.toString();
}

export function getDatabaseName(connectionString) {
  const url = new URL(connectionString);

  return decodeURIComponent(url.pathname.replace(/^\//, ""));
}
