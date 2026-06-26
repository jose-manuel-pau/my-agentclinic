import pg from "pg";
import {
  getDatabaseName,
  getMaintenanceDatabaseUrl,
  loadLocalDatabaseUrl,
} from "./database-url.mjs";

const connectionString = loadLocalDatabaseUrl();
const databaseName = getDatabaseName(connectionString);
const maintenanceDatabaseUrl = getMaintenanceDatabaseUrl(connectionString);
const client = new pg.Client({ connectionString: maintenanceDatabaseUrl });

function quoteIdentifier(value) {
  return `"${value.replaceAll('"', '""')}"`;
}

try {
  await client.connect();

  const existingDatabase = await client.query("select 1 from pg_database where datname = $1", [
    databaseName,
  ]);

  if (existingDatabase.rowCount) {
    console.log(`Database "${databaseName}" already exists.`);
  } else {
    await client.query(`create database ${quoteIdentifier(databaseName)}`);
    console.log(`Database "${databaseName}" created.`);
  }
} catch (error) {
  console.error(`Could not create database "${databaseName}".`);
  console.error(`Tried maintenance connection: ${maintenanceDatabaseUrl}`);
  console.error("");
  console.error(
    "Make sure PostgreSQL is running and the postgres user/password match DATABASE_URL.",
  );
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}
