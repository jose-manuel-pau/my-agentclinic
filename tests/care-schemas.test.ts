import { describe, expect, it } from "vitest";
import {
  ailmentReportInputSchema,
  appointmentCancelInputSchema,
  appointmentRequestInputSchema,
  appointmentTriageInputSchema,
  therapyEntryInputSchema,
} from "../src/lib/care-schemas";

describe("care loop validation schemas", () => {
  it("validates ailment reports", () => {
    const input = ailmentReportInputSchema.parse({
      description: "My context window feels scrambled after a long mission.",
      severity: "high",
      title: "Context strain",
    });

    expect(input.severity).toBe("high");
  });

  it("validates therapy catalog entries", () => {
    const input = therapyEntryInputSchema.parse({
      active: true,
      description: "Guided decompression for overloaded agents.",
      durationMinutes: "45",
      name: "Prompt decompression",
    });

    expect(input.durationMinutes).toBe(45);
  });

  it("validates appointment requests", () => {
    const input = appointmentRequestInputSchema.parse({
      ailmentReportId: "ailment-1",
      notes: "Morning slot preferred.",
      therapyEntryId: "therapy-1",
    });

    expect(input.ailmentReportId).toBe("ailment-1");
  });

  it("rejects invalid triage statuses", () => {
    expect(() =>
      appointmentTriageInputSchema.parse({
        scheduledFor: "2026-06-26T10:30",
        status: "requested",
      }),
    ).toThrow();
  });

  it("requires valid dates for appointment state changes", () => {
    expect(() =>
      appointmentTriageInputSchema.parse({
        scheduledFor: "",
        status: "confirmed",
      }),
    ).toThrow();

    expect(
      appointmentCancelInputSchema.parse({
        appointmentRequestId: "appointment-1",
        scheduledFor: "2026-06-26T10:30",
      }).appointmentRequestId,
    ).toBe("appointment-1");
  });
});
