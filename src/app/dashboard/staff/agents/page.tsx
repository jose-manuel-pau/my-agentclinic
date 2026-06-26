import { DashboardShell } from "../../../../components/dashboard-shell";
import { listAgentsForStaff } from "../../../../lib/care-loop";
import { requireRole } from "../../../../lib/session";

export default async function StaffAgentsPage() {
  await requireRole("staff");
  const agents = await listAgentsForStaff();

  return (
    <DashboardShell
      description="View the agents currently available in the care loop."
      role="staff"
      title="Agents"
    >
      <article className="dashboard-card-wide">
        <h2>All agents</h2>
        {agents.length ? (
          <div className="responsive-list">
            {agents.map((agent) => (
              <section className="care-list-item" key={agent.id}>
                <h3>{agent.name ?? "Unnamed agent"}</h3>
                <p>{agent.email}</p>
              </section>
            ))}
          </div>
        ) : (
          <p>No agents are available yet.</p>
        )}
      </article>
    </DashboardShell>
  );
}
