import { DashboardShell } from "../../../../components/dashboard-shell";
import { formatDate } from "../../../../lib/format";
import { listAgentAilmentReports } from "../../../../lib/care-loop";
import { requireRole } from "../../../../lib/session";
import { createAilmentReportAction, updateAilmentReportAction } from "../../actions";

export default async function AgentAilmentsPage() {
  const session = await requireRole("agent");
  const ailments = await listAgentAilmentReports(session.user.id);

  return (
    <DashboardShell
      description="Report health concerns so staff can connect them to care."
      role="agent"
      title="Ailment reports"
    >
      <article className="dashboard-card-wide">
        <h2>Submit an ailment</h2>
        <form action={createAilmentReportAction}>
          <label htmlFor="title">
            Title
            <input id="title" minLength={3} name="title" required type="text" />
          </label>
          <label htmlFor="severity">
            Severity
            <select defaultValue="medium" id="severity" name="severity" required>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <label htmlFor="description">
            Description
            <textarea id="description" minLength={10} name="description" required rows={4} />
          </label>
          <button type="submit">Submit report</button>
        </form>
      </article>

      <article className="dashboard-card-wide">
        <h2>Your reports</h2>
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
                <small>Submitted {formatDate(ailment.createdAt)}</small>
                <form action={updateAilmentReportAction} className="triage-form">
                  <input name="id" type="hidden" value={ailment.id} />
                  <label>
                    Title
                    <input defaultValue={ailment.title} minLength={3} name="title" required />
                  </label>
                  <label>
                    Severity
                    <select defaultValue={ailment.severity} name="severity" required>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </label>
                  <label>
                    Description
                    <textarea
                      defaultValue={ailment.description}
                      minLength={10}
                      name="description"
                      required
                      rows={3}
                    />
                  </label>
                  <button type="submit">Save report</button>
                </form>
              </section>
            ))}
          </div>
        ) : (
          <p>No ailment reports have been submitted yet.</p>
        )}
      </article>
    </DashboardShell>
  );
}
