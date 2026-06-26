import { z } from "zod";

export const ailmentSeveritySchema = z.enum(["low", "medium", "high"]);

export const appointmentStatusSchema = z.enum([
  "requested",
  "confirmed",
  "rescheduled",
  "cancelled",
  "completed",
]);

export const ailmentReportInputSchema = z.object({
  description: z.string().trim().min(10).max(1200),
  severity: ailmentSeveritySchema.default("medium"),
  title: z.string().trim().min(3).max(120),
});

export const therapyEntryInputSchema = z.object({
  active: z.boolean().default(true),
  description: z.string().trim().min(10).max(1200),
  durationMinutes: z.coerce.number().int().min(15).max(240),
  name: z.string().trim().min(3).max(120),
});

export const appointmentRequestInputSchema = z.object({
  ailmentReportId: z.string().min(1),
  notes: z.string().trim().max(1200).optional(),
  therapyEntryId: z.string().optional(),
});

export const ailmentReportUpdateInputSchema = ailmentReportInputSchema.extend({
  id: z.string().min(1),
});

export const appointmentCancelInputSchema = z.object({
  appointmentRequestId: z.string().min(1),
  scheduledFor: z.string().min(1).refine(isValidDateString, "A valid date is required."),
});

export const appointmentTriageInputSchema = z.object({
  note: z.string().trim().max(1200).optional(),
  scheduledFor: z.string().min(1).refine(isValidDateString, "A valid date is required."),
  status: z.enum(["confirmed", "rescheduled", "cancelled"]),
});

export type AilmentReportInput = z.infer<typeof ailmentReportInputSchema>;
export type AilmentReportUpdateInput = z.infer<typeof ailmentReportUpdateInputSchema>;
export type AilmentSeverity = z.infer<typeof ailmentSeveritySchema>;
export type AppointmentCancelInput = z.infer<typeof appointmentCancelInputSchema>;
export type AppointmentRequestInput = z.infer<typeof appointmentRequestInputSchema>;
export type AppointmentStatus = z.infer<typeof appointmentStatusSchema>;
export type AppointmentTriageInput = z.infer<typeof appointmentTriageInputSchema>;
export type TherapyEntryInput = z.infer<typeof therapyEntryInputSchema>;

function isValidDateString(value: string) {
  return !Number.isNaN(new Date(value).getTime());
}
