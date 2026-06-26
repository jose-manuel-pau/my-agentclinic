import type { AppointmentStatus } from "./care-schemas";

const transitions: Record<AppointmentStatus, AppointmentStatus[]> = {
  cancelled: [],
  completed: [],
  confirmed: ["cancelled"],
  requested: ["confirmed", "rescheduled", "cancelled"],
  rescheduled: ["cancelled"],
};

export function getAllowedAppointmentTransitions(status: AppointmentStatus) {
  return transitions[status];
}

export function canTransitionAppointmentStatus(
  currentStatus: AppointmentStatus,
  nextStatus: AppointmentStatus,
) {
  return transitions[currentStatus].includes(nextStatus);
}

export function assertAppointmentStatusTransition(
  currentStatus: AppointmentStatus,
  nextStatus: AppointmentStatus,
) {
  if (!canTransitionAppointmentStatus(currentStatus, nextStatus)) {
    throw new Error(`Cannot transition appointment from ${currentStatus} to ${nextStatus}.`);
  }
}
