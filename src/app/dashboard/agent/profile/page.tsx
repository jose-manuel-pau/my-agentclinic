import { DashboardShell } from "../../../../components/dashboard-shell";
import { getAgentProfileForUser } from "../../../../lib/agent-profile";
import { requireRole } from "../../../../lib/session";

export default async function AgentProfilePage() {
  const session = await requireRole("agent");
  const profile = await getAgentProfileForUser(session.user.id);

  return (
    <DashboardShell
      description="Profile details loaded through the Phase 02 data spine."
      role="agent"
      title="Agent profile"
    >
      {profile ? (
        <article className="profile-card">
          <header>
            <p className="dashboard-eyebrow">{profile.status}</p>
            <h2>{profile.displayName}</h2>
          </header>
          <dl className="profile-list">
            <div>
              <dt>Codename</dt>
              <dd>{profile.codename}</dd>
            </div>
            <div>
              <dt>Specialization</dt>
              <dd>{profile.specialization ?? "Not recorded"}</dd>
            </div>
            <div>
              <dt>Notes</dt>
              <dd>{profile.notes ?? "No notes recorded"}</dd>
            </div>
          </dl>
        </article>
      ) : (
        <article>
          <h2>No profile found</h2>
          <p>An agent profile has not been created for this account yet.</p>
        </article>
      )}
    </DashboardShell>
  );
}
