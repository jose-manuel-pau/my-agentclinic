import { z } from "zod";

export const roleSchema = z.enum(["agent", "staff"]);

export type UserRole = z.infer<typeof roleSchema>;

export function isUserRole(value: unknown): value is UserRole {
  return roleSchema.safeParse(value).success;
}

export function dashboardPathForRole(role: UserRole) {
  return role === "staff" ? "/dashboard/staff" : "/dashboard/agent";
}

export function canAccessRoleDashboard(userRole: UserRole, dashboardRole: UserRole) {
  return userRole === dashboardRole;
}
