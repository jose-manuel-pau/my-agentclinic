import Link from "next/link";
import { DashboardShell } from "../../../components/dashboard-shell";
import {
  listStaffAppointmentRequests,
  listAgentsForStaff,
  listSubmittedAilmentReports,
  listTherapyEntries,
} from "../../../lib/care-loop";
import { requireRole } from "../../../lib/session";

export default async function StaffDashboardPage() {
  const session = await requireRole("staff");
  const [agents, ailments, appointments, therapies] = await Promise.all([
    listAgentsForStaff(),
    listSubmittedAilmentReports(),
    listStaffAppointmentRequests(),
    listTherapyEntries(true),
  ]);

  return (
    <DashboardShell
      actions={<Link href="/dashboard/staff/appointments">Open triage</Link>}
      description="Review reports, manage therapies, and triage appointment requests."
      role="staff"
      title={`Staff console for ${session.user.name ?? "AgentClinic"}`}
    >
      <article>
        <h2>Agents</h2>
        <p>{agents.length} agent(s) visible.</p>
        <Link href="/dashboard/staff/agents">View agents</Link>
      </article>
      <article>
        <h2>Ailments</h2>
        <p>{ailments.length} submitted report(s) visible.</p>
        <Link href="/dashboard/staff/ailments">Review reports</Link>
      </article>
      <article>
        <h2>Therapies</h2>
        <p>{therapies.length} catalog item(s) managed.</p>
        <Link href="/dashboard/staff/therapies">Manage catalog</Link>
      </article>
      <article>
        <h2>Triage</h2>
        <p>{appointments.length} appointment request(s) available.</p>
        <Link href="/dashboard/staff/appointments">Triage requests</Link>
      </article>
    </DashboardShell>
  );
}
