import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./auth-options";
import { dashboardPathForRole, type UserRole } from "./roles";

export function getCurrentSession() {
  return getServerSession(authOptions);
}

export async function requireRole(requiredRole: UserRole) {
  const session = await getCurrentSession();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== requiredRole) {
    redirect(dashboardPathForRole(session.user.role));
  }

  return session;
}
