import { DashboardShell } from "../../../components/dashboard-shell";
import { requireRole } from "../../../lib/session";

export default async function StaffDashboardPage() {
  const session = await requireRole("staff");

  return (
    <DashboardShell
      description="Review operational status and prepare for staff-facing clinic workflows."
      role="staff"
      title={`Staff console for ${session.user.name ?? "AgentClinic"}`}
    >
      <article>
        <h2>Coverage</h2>
        <p>Staff workspace access is active and separated from the agent dashboard.</p>
      </article>
      <article>
        <h2>Agents</h2>
        <p>Agent lists and case management remain out of scope for this nano phase.</p>
      </article>
      <article>
        <h2>Operations</h2>
        <p>Use this shell as the foundation for upcoming staff workflows.</p>
      </article>
    </DashboardShell>
  );
}
