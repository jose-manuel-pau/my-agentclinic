import { describe, expect, it } from "vitest";
import { defaultDatabaseUrl, getDatabaseUrl } from "../src/lib/database-url";

describe("care loop database utilities", () => {
  it("uses the documented local PostgreSQL URL when DATABASE_URL is not set", () => {
    const originalDatabaseUrl = process.env.DATABASE_URL;

    try {
      delete process.env.DATABASE_URL;

      expect(getDatabaseUrl()).toBe(defaultDatabaseUrl);
    } finally {
      restoreDatabaseUrl(originalDatabaseUrl);
    }
  });
});

function restoreDatabaseUrl(value: string | undefined) {
  if (value === undefined) {
    delete process.env.DATABASE_URL;
    return;
  }

  process.env.DATABASE_URL = value;
}
