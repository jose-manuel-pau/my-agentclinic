import { DashboardShell } from "../../../../components/dashboard-shell";
import { listSubmittedAilmentReports } from "../../../../lib/care-loop";
import { formatDate } from "../../../../lib/format";
import { requireRole } from "../../../../lib/session";

export default async function StaffAilmentsPage() {
  await requireRole("staff");
  const ailments = await listSubmittedAilmentReports();

  return (
    <DashboardShell
      description="Review submitted concerns and prepare care decisions."
      role="staff"
      title="Submitted ailments"
    >
      <article className="dashboard-card-wide">
        <h2>Reports queue</h2>
        {ailments.length ? (
          <div className="responsive-list">
            {ailments.map((ailment) => (
              <section className="care-list-item" key={ailment.id}>
                <header>
                  <h3>{ailment.title}</h3>
                  <span className={`status-badge severity-${ailment.severity}`}>
                    {ailment.severity}
                  </span>
                </header>
                <p>{ailment.description}</p>
                <small>
                  {ailment.agentName ?? "Unknown agent"} - {formatDate(ailment.createdAt)}
                </small>
              </section>
            ))}
          </div>
        ) : (
          <p>No submitted ailment reports are waiting for review.</p>
        )}
      </article>
    </DashboardShell>
  );
}
