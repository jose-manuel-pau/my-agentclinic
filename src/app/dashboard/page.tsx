import { redirect } from "next/navigation";
import { getCurrentSession } from "../../lib/session";
import { dashboardPathForRole } from "../../lib/roles";

export default async function DashboardPage() {
  const session = await getCurrentSession();

  if (!session?.user) {
    redirect("/login");
  }

  redirect(dashboardPathForRole(session.user.role));
}
