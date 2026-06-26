import { DashboardShell } from "../../../../components/dashboard-shell";
import { listTherapyEntries } from "../../../../lib/care-loop";
import { requireRole } from "../../../../lib/session";

export default async function AgentTherapiesPage() {
  await requireRole("agent");
  const therapies = await listTherapyEntries();

  return (
    <DashboardShell
      description="Browse available therapies before requesting an appointment."
      role="agent"
      title="Therapy catalog"
    >
      {therapies.length ? (
        therapies.map((therapy) => (
          <article key={therapy.id}>
            <h2>{therapy.name}</h2>
            <p>{therapy.description}</p>
            <small>{therapy.durationMinutes} minutes</small>
          </article>
        ))
      ) : (
        <article>
          <h2>No therapies available</h2>
          <p>Staff have not published therapy entries yet.</p>
        </article>
      )}
    </DashboardShell>
  );
}
