import pg from "pg";
import { getDatabaseName, loadLocalDatabaseUrl } from "./database-url.mjs";

const connectionString = loadLocalDatabaseUrl();
const client = new pg.Client({ connectionString });

try {
  await client.connect();
  await client.query("select 1");
  console.log("PostgreSQL is reachable.");
} catch (error) {
  console.error("PostgreSQL is not reachable.");
  console.error(`Tried: ${connectionString}`);
  console.error("");
  console.error(`If the PostgreSQL server is running but the database is missing, run:`);
  console.error(`  npm run db:create`);
  console.error("");
  console.error("Start the local database first:");
  console.error("  npm run db:start");
  console.error("");
  console.error("If Docker is not installed, install Docker Desktop or start a local PostgreSQL");
  console.error("server that matches DATABASE_URL, then rerun this command.");
  console.error("");
  console.error(`Expected database: ${getDatabaseName(connectionString)}`);
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}
