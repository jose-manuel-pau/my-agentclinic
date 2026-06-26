import { DashboardShell } from "../../../../components/dashboard-shell";
import { listStaffAppointmentRequests } from "../../../../lib/care-loop";
import { formatDateTime } from "../../../../lib/format";
import { requireRole } from "../../../../lib/session";
import { triageAppointmentRequestAction } from "../../actions";

export default async function StaffAppointmentsPage() {
  await requireRole("staff");
  const appointments = await listStaffAppointmentRequests();

  return (
    <DashboardShell
      description="Confirm, reschedule, or cancel appointment requests."
      role="staff"
      title="Appointment triage"
    >
      <article className="dashboard-card-wide">
        <h2>Requests queue</h2>
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
                <p>
                  {appointment.agentName ?? "Unknown agent"} -{" "}
                  {appointment.therapyName ?? "No therapy selected"}
                </p>
                <small>Scheduled: {formatDateTime(appointment.scheduledFor)}</small>
                {appointment.status !== "cancelled" ? (
                  <form action={triageAppointmentRequestAction} className="triage-form">
                    <input name="appointmentRequestId" type="hidden" value={appointment.id} />
                    <label>
                      Status
                      <select name="status" required>
                        <option value="confirmed">Confirm</option>
                        <option value="rescheduled">Reschedule</option>
                        <option value="cancelled">Cancel</option>
                      </select>
                    </label>
                    <label>
                      Status date
                      <input name="scheduledFor" required type="datetime-local" />
                    </label>
                    <label>
                      Note
                      <textarea name="note" rows={2} />
                    </label>
                    <button type="submit">Update request</button>
                  </form>
                ) : null}
              </section>
            ))}
          </div>
        ) : (
          <p>No appointment requests are waiting for triage.</p>
        )}
      </article>
    </DashboardShell>
  );
}
