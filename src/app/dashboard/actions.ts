"use server";

import { revalidatePath } from "next/cache";
import {
  appointmentCancelInputSchema,
  appointmentRequestInputSchema,
  appointmentTriageInputSchema,
  ailmentReportInputSchema,
  ailmentReportUpdateInputSchema,
  therapyEntryInputSchema,
} from "../../lib/care-schemas";
import {
  cancelAgentAppointmentRequest,
  createAilmentReport,
  createAppointmentRequest,
  createTherapyEntry,
  triageAppointmentRequest,
  updateAilmentReport,
  updateTherapyEntry,
} from "../../lib/care-loop";
import { requireRole } from "../../lib/session";

function optionalString(value: FormDataEntryValue | null) {
  return typeof value === "string" && value.trim() ? value : undefined;
}

export async function createAilmentReportAction(formData: FormData) {
  const session = await requireRole("agent");
  const input = ailmentReportInputSchema.parse({
    description: formData.get("description"),
    severity: formData.get("severity"),
    title: formData.get("title"),
  });

  await createAilmentReport(session.user.id, input);
  revalidatePath("/dashboard/agent");
  revalidatePath("/dashboard/agent/ailments");
  revalidatePath("/dashboard/staff/ailments");
}

export async function updateAilmentReportAction(formData: FormData) {
  const session = await requireRole("agent");
  const input = ailmentReportUpdateInputSchema.parse({
    description: formData.get("description"),
    id: formData.get("id"),
    severity: formData.get("severity"),
    title: formData.get("title"),
  });

  await updateAilmentReport(session.user.id, input);
  revalidatePath("/dashboard/agent");
  revalidatePath("/dashboard/agent/ailments");
  revalidatePath("/dashboard/staff/ailments");
}

export async function createTherapyEntryAction(formData: FormData) {
  const session = await requireRole("staff");
  const input = therapyEntryInputSchema.parse({
    active: formData.get("active") === "on",
    description: formData.get("description"),
    durationMinutes: formData.get("durationMinutes"),
    name: formData.get("name"),
  });

  await createTherapyEntry(session.user.id, input);
  revalidatePath("/dashboard/staff/therapies");
  revalidatePath("/dashboard/agent/therapies");
}

export async function updateTherapyEntryAction(formData: FormData) {
  await requireRole("staff");

  const id = optionalString(formData.get("id"));

  if (!id) {
    throw new Error("Therapy id is required.");
  }

  const input = therapyEntryInputSchema.parse({
    active: formData.get("active") === "on",
    description: formData.get("description"),
    durationMinutes: formData.get("durationMinutes"),
    name: formData.get("name"),
  });

  await updateTherapyEntry(id, input);
  revalidatePath("/dashboard/staff/therapies");
  revalidatePath("/dashboard/agent/therapies");
}

export async function createAppointmentRequestAction(formData: FormData) {
  const session = await requireRole("agent");
  const input = appointmentRequestInputSchema.parse({
    ailmentReportId: formData.get("ailmentReportId"),
    notes: optionalString(formData.get("notes")),
    therapyEntryId: optionalString(formData.get("therapyEntryId")),
  });

  await createAppointmentRequest(session.user.id, input);
  revalidatePath("/dashboard/agent");
  revalidatePath("/dashboard/agent/appointments");
  revalidatePath("/dashboard/staff/appointments");
}

export async function cancelAgentAppointmentRequestAction(formData: FormData) {
  const session = await requireRole("agent");
  const input = appointmentCancelInputSchema.parse({
    appointmentRequestId: formData.get("appointmentRequestId"),
    scheduledFor: formData.get("scheduledFor"),
  });

  await cancelAgentAppointmentRequest(session.user.id, input);
  revalidatePath("/dashboard/agent");
  revalidatePath("/dashboard/agent/appointments");
  revalidatePath("/dashboard/staff/appointments");
}

export async function triageAppointmentRequestAction(formData: FormData) {
  const session = await requireRole("staff");
  const appointmentRequestId = optionalString(formData.get("appointmentRequestId"));

  if (!appointmentRequestId) {
    throw new Error("Appointment request id is required.");
  }

  const input = appointmentTriageInputSchema.parse({
    note: optionalString(formData.get("note")),
    scheduledFor: optionalString(formData.get("scheduledFor")),
    status: formData.get("status"),
  });

  await triageAppointmentRequest(session.user.id, appointmentRequestId, input);
  revalidatePath("/dashboard/agent/appointments");
  revalidatePath("/dashboard/staff/appointments");
}
