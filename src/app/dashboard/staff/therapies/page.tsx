import { DashboardShell } from "../../../../components/dashboard-shell";
import { listTherapyEntries } from "../../../../lib/care-loop";
import { requireRole } from "../../../../lib/session";
import { createTherapyEntryAction, updateTherapyEntryAction } from "../../actions";

export default async function StaffTherapiesPage() {
  await requireRole("staff");
  const therapies = await listTherapyEntries(true);

  return (
    <DashboardShell
      description="Create and maintain care options available to agents."
      role="staff"
      title="Therapy catalog"
    >
      <article className="dashboard-card-wide">
        <h2>Create therapy</h2>
        <form action={createTherapyEntryAction}>
          <label htmlFor="name">
            Name
            <input id="name" minLength={3} name="name" required type="text" />
          </label>
          <label htmlFor="durationMinutes">
            Duration minutes
            <input
              defaultValue={30}
              id="durationMinutes"
              max={240}
              min={15}
              name="durationMinutes"
              required
              type="number"
            />
          </label>
          <label htmlFor="description">
            Description
            <textarea id="description" minLength={10} name="description" required rows={4} />
          </label>
          <label htmlFor="active">
            <input defaultChecked id="active" name="active" type="checkbox" />
            Active
          </label>
          <button type="submit">Create therapy</button>
        </form>
      </article>

      <article className="dashboard-card-wide">
        <h2>Manage therapies</h2>
        {therapies.length ? (
          <div className="responsive-list">
            {therapies.map((therapy) => (
              <form action={updateTherapyEntryAction} className="care-list-item" key={therapy.id}>
                <input name="id" type="hidden" value={therapy.id} />
                <label>
                  Name
                  <input defaultValue={therapy.name} minLength={3} name="name" required />
                </label>
                <label>
                  Duration minutes
                  <input
                    defaultValue={therapy.durationMinutes}
                    max={240}
                    min={15}
                    name="durationMinutes"
                    required
                    type="number"
                  />
                </label>
                <label>
                  Description
                  <textarea
                    defaultValue={therapy.description}
                    minLength={10}
                    name="description"
                    required
                    rows={3}
                  />
                </label>
                <label>
                  <input defaultChecked={therapy.active} name="active" type="checkbox" />
                  Active
                </label>
                <button type="submit">Save therapy</button>
              </form>
            ))}
          </div>
        ) : (
          <p>No therapies have been created yet.</p>
        )}
      </article>
    </DashboardShell>
  );
}
