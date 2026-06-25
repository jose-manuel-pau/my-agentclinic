import { describe, expect, it } from "vitest";
import {
  canAccessRoleDashboard,
  dashboardPathForRole,
  isUserRole,
  roleSchema,
} from "../src/lib/roles";

describe("role helpers", () => {
  it("accepts the supported user roles", () => {
    expect(roleSchema.parse("agent")).toBe("agent");
    expect(roleSchema.parse("staff")).toBe("staff");
    expect(isUserRole("patient")).toBe(false);
  });

  it("maps roles to their dashboard routes", () => {
    expect(dashboardPathForRole("agent")).toBe("/dashboard/agent");
    expect(dashboardPathForRole("staff")).toBe("/dashboard/staff");
  });

  it("keeps role dashboard access explicit", () => {
    expect(canAccessRoleDashboard("agent", "agent")).toBe(true);
    expect(canAccessRoleDashboard("agent", "staff")).toBe(false);
    expect(canAccessRoleDashboard("staff", "staff")).toBe(true);
  });
});
