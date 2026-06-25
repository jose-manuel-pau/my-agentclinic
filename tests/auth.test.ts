import { describe, expect, it } from "vitest";
import { authenticateUser, verifyPassword } from "../src/lib/auth-users";
import { loginCredentialsSchema } from "../src/lib/auth-schemas";
import { findDemoUserByCredentials } from "../src/lib/demo-users";

describe("auth validation", () => {
  it("validates login credentials at the form boundary", () => {
    const parsedCredentials = loginCredentialsSchema.parse({
      email: "agent@agentclinic.local",
      password: "agent-demo",
    });

    expect(parsedCredentials.email).toBe("agent@agentclinic.local");
  });

  it("rejects malformed login credentials", () => {
    expect(() =>
      loginCredentialsSchema.parse({
        email: "not-an-email",
        password: "",
      }),
    ).toThrow();
  });

  it("finds demo users deterministically without a production database", () => {
    const agent = findDemoUserByCredentials({
      email: "agent@agentclinic.local",
      password: "agent-demo",
    });

    expect(agent?.role).toBe("agent");
  });

  it("authenticates demo users only when no database is configured", async () => {
    const originalDatabaseUrl = process.env.DATABASE_URL;

    try {
      delete process.env.DATABASE_URL;

      const agent = await authenticateUser({
        email: "agent@agentclinic.local",
        password: "agent-demo",
      });

      expect(agent?.role).toBe("agent");
    } finally {
      restoreDatabaseUrl(originalDatabaseUrl);
    }
  });

  it("verifies supported stored password formats", () => {
    expect(verifyPassword("agent-demo", "agent-demo")).toBe(true);
    expect(
      verifyPassword(
        "agent-demo",
        "sha256:fe45a8e1cbc95c5b7c9e7422e4e99b9659b7bc6471fa22dee22da1e9a45281ea",
      ),
    ).toBe(true);
    expect(verifyPassword("wrong", "agent-demo")).toBe(false);
  });
});

function restoreDatabaseUrl(value: string | undefined) {
  if (value === undefined) {
    delete process.env.DATABASE_URL;
    return;
  }

  process.env.DATABASE_URL = value;
}
