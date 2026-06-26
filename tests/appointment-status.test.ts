import { describe, expect, it } from "vitest";
import {
  assertAppointmentStatusTransition,
  canTransitionAppointmentStatus,
  getAllowedAppointmentTransitions,
} from "../src/lib/appointment-status";

describe("appointment status transitions", () => {
  it("allows staff triage transitions from requested", () => {
    expect(getAllowedAppointmentTransitions("requested")).toEqual([
      "confirmed",
      "rescheduled",
      "cancelled",
    ]);
    expect(canTransitionAppointmentStatus("requested", "confirmed")).toBe(true);
  });

  it("prevents terminal status transitions", () => {
    expect(canTransitionAppointmentStatus("cancelled", "confirmed")).toBe(false);
    expect(() => assertAppointmentStatusTransition("completed", "rescheduled")).toThrow();
  });

  it("allows agents to cancel active requests but not completed ones", () => {
    expect(canTransitionAppointmentStatus("confirmed", "cancelled")).toBe(true);
    expect(canTransitionAppointmentStatus("rescheduled", "cancelled")).toBe(true);
    expect(canTransitionAppointmentStatus("completed", "cancelled")).toBe(false);
  });
});
