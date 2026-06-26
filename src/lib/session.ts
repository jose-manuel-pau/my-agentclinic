import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./auth-options";
import { dashboardPathForRole, type UserRole } from "./roles";

export async function getCurrentSession() {
  try {
    return await getServerSession(authOptions);
  } catch (error) {
    if (isJwtSessionError(error)) {
      return null;
    }

    throw error;
  }
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

function isJwtSessionError(error: unknown) {
  return (
    error instanceof Error &&
    (error.name === "JWT_SESSION_ERROR" ||
      error.message.includes("decryption operation failed") ||
      error.message.includes("JWT"))
  );
}
