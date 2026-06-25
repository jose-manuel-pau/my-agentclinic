import { existsSync, readFileSync } from "node:fs";
import { defineConfig } from "prisma/config";

const defaultDatabaseUrl =
  "postgresql://postgres:postgres@localhost:5432/agentclinic?schema=public";

const loadedEnvKeys = new Set<string>();

loadEnvFile(".env", false);
loadEnvFile(".env.local", true);

function loadEnvFile(path: string, overrideLoadedValues: boolean) {
  if (!existsSync(path)) {
    return;
  }

  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);

    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;
    const value = rawValue.replace(/^["']|["']$/g, "");

    if (process.env[key] !== undefined && (!overrideLoadedValues || !loadedEnvKeys.has(key))) {
      continue;
    }

    process.env[key] = value;
    loadedEnvKeys.add(key);
  }
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL ?? defaultDatabaseUrl,
  },
});
