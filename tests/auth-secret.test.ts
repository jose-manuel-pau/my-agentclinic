import { describe, expect, it } from "vitest";
import { getAuthSecret } from "../src/lib/auth-secret";

describe("auth secret", () => {
  it("provides a stable local development fallback", () => {
    const originalSecret = process.env.NEXTAUTH_SECRET;

    try {
      delete process.env.NEXTAUTH_SECRET;

      expect(getAuthSecret()).toContain("agentclinic-local-development-secret");
    } finally {
      restoreNextAuthSecret(originalSecret);
    }
  });

  it("prefers the configured environment secret", () => {
    const originalSecret = process.env.NEXTAUTH_SECRET;

    try {
      process.env.NEXTAUTH_SECRET = "configured-secret";

      expect(getAuthSecret()).toBe("configured-secret");
    } finally {
      restoreNextAuthSecret(originalSecret);
    }
  });
});

function restoreNextAuthSecret(value: string | undefined) {
  if (value === undefined) {
    delete process.env.NEXTAUTH_SECRET;
    return;
  }

  process.env.NEXTAUTH_SECRET = value;
}
