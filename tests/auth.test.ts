import { describe, expect, it } from "vitest";
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
});
