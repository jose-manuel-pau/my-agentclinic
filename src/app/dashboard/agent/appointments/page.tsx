import { DashboardShell } from "../../../../components/dashboard-shell";
import {
  listAgentAilmentReports,
  listAgentAppointmentRequests,
  listTherapyEntries,
} from "../../../../lib/care-loop";
import { formatDateTime } from "../../../../lib/format";
import { requireRole } from "../../../../lib/session";
import { cancelAgentAppointmentRequestAction, createAppointmentRequestAction } from "../../actions";

export default async function AgentAppointmentsPage() {
  const session = await requireRole("agent");
  const [ailments, therapies, appointments] = await Promise.all([
    listAgentAilmentReports(session.user.id),
    listTherapyEntries(),
    listAgentAppointmentRequests(session.user.id),
  ]);

  return (
    <DashboardShell
      description="Request appointments and track staff triage updates."
      role="agent"
      title="Appointment requests"
    >
      <article className="dashboard-card-wide">
        <h2>Request appointment</h2>
        {ailments.length ? (
          <form action={createAppointmentRequestAction}>
            <label htmlFor="ailmentReportId">
              Ailment
              <select id="ailmentReportId" name="ailmentReportId" required>
                {ailments.map((ailment) => (
                  <option key={ailment.id} value={ailment.id}>
                    {ailment.title}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="therapyEntryId">
              Therapy
              <select defaultValue="" id="therapyEntryId" name="therapyEntryId">
                <option value="">No therapy selected</option>
                {therapies.map((therapy) => (
                  <option key={therapy.id} value={therapy.id}>
                    {therapy.name}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="notes">
              Notes
              <textarea id="notes" name="notes" rows={3} />
            </label>
            <button type="submit">Request appointment</button>
          </form>
        ) : (
          <p>Create an ailment report before requesting an appointment.</p>
        )}
      </article>

      <article className="dashboard-card-wide">
        <h2>Your appointment status</h2>
        {appointments.length ? (
          <div className="responsive-list">
            {appointments.map((appointment) => (
              <section className="care-list-item" key={appointment.id}>
                <header>
                  <h3>{appointment.ailmentTitle}</h3>
                  <span className={`status-badge status-${appointment.status}`}>
                    {appointment.status}
                  </span>
                </header>
                <p>{appointment.therapyName ?? "No therapy selected"}</p>
                <small>Scheduled: {formatDateTime(appointment.scheduledFor)}</small>
                {appointment.status !== "cancelled" && appointment.status !== "completed" ? (
                  <form action={cancelAgentAppointmentRequestAction} className="triage-form">
                    <input name="appointmentRequestId" type="hidden" value={appointment.id} />
                    <input name="scheduledFor" type="hidden" value={new Date().toISOString()} />
                    <button type="submit">Cancel request</button>
                  </form>
                ) : null}
              </section>
            ))}
          </div>
        ) : (
          <p>No appointment requests have been submitted yet.</p>
        )}
      </article>
    </DashboardShell>
  );
}
