import Link from "next/link";
import { DashboardShell } from "../../../components/dashboard-shell";
import {
  listAgentAilmentReports,
  listAgentAppointmentRequests,
  listTherapyEntries,
} from "../../../lib/care-loop";
import { requireRole } from "../../../lib/session";

export default async function AgentDashboardPage() {
  const session = await requireRole("agent");
  const [ailments, appointments, therapies] = await Promise.all([
    listAgentAilmentReports(session.user.id),
    listAgentAppointmentRequests(session.user.id),
    listTherapyEntries(),
  ]);

  return (
    <DashboardShell
      actions={<Link href="/dashboard/agent/appointments">Request appointment</Link>}
      description="Report ailments, browse therapies, and track appointment status."
      role="agent"
      title={`Welcome, ${session.user.name ?? "agent"}`}
    >
      <article>
        <h2>Ailments</h2>
        <p>{ailments.length} report(s) submitted.</p>
        <Link href="/dashboard/agent/ailments">Manage reports</Link>
      </article>
      <article>
        <h2>Therapies</h2>
        <p>{therapies.length} active therapy option(s) available.</p>
        <Link href="/dashboard/agent/therapies">Browse therapies</Link>
      </article>
      <article>
        <h2>Appointments</h2>
        <p>{appointments.length} appointment request(s) tracked.</p>
        <Link href="/dashboard/agent/appointments">View status</Link>
      </article>
    </DashboardShell>
  );
}
