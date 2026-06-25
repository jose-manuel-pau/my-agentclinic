import Link from "next/link";
import { DashboardShell } from "../../../components/dashboard-shell";
import { requireRole } from "../../../lib/session";

export default async function AgentDashboardPage() {
  const session = await requireRole("agent");

  return (
    <DashboardShell
      actions={<Link href="/dashboard/agent/profile">Open profile</Link>}
      description="Track personal readiness, therapy touchpoints, and profile details."
      role="agent"
      title={`Welcome, ${session.user.name ?? "agent"}`}
    >
      <article>
        <h2>Readiness</h2>
        <p>Your dashboard is ready for health workflow modules in the next phase.</p>
      </article>
      <article>
        <h2>Profile</h2>
        <p>Review the first data-spine-backed agent profile screen.</p>
      </article>
      <article>
        <h2>Therapy</h2>
        <p>Therapy and appointment workflows are intentionally reserved for later phases.</p>
      </article>
    </DashboardShell>
  );
}
