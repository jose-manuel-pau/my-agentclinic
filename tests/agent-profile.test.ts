import { describe, expect, it } from "vitest";
import { getAgentProfileForUser } from "../src/lib/agent-profile";

describe("agent profile data", () => {
  it("returns the demo profile when no database is configured", async () => {
    const originalDatabaseUrl = process.env.DATABASE_URL;
    delete process.env.DATABASE_URL;

    const profile = await getAgentProfileForUser("demo-agent");

    restoreDatabaseUrl(originalDatabaseUrl);

    expect(profile?.codename).toBe("Nightingale");
  });

  it("returns null when the demo agent profile does not match", async () => {
    const originalDatabaseUrl = process.env.DATABASE_URL;
    delete process.env.DATABASE_URL;

    const profile = await getAgentProfileForUser("missing-agent");

    restoreDatabaseUrl(originalDatabaseUrl);

    expect(profile).toBeNull();
  });
});

function restoreDatabaseUrl(value: string | undefined) {
  if (value === undefined) {
    delete process.env.DATABASE_URL;
    return;
  }

  process.env.DATABASE_URL = value;
}
