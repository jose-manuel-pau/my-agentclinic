import type { Prisma } from "@prisma/client";
import { assertAppointmentStatusTransition } from "./appointment-status";
import type {
  AilmentReportInput,
  AilmentReportUpdateInput,
  AilmentSeverity,
  AppointmentCancelInput,
  AppointmentRequestInput,
  AppointmentStatus,
  AppointmentTriageInput,
  TherapyEntryInput,
} from "./care-schemas";
import { getPrismaClient } from "./prisma";

export type AgentView = {
  email: string;
  id: string;
  name: string | null;
};

export type AilmentReportView = {
  agentName: string | null;
  createdAt: Date;
  description: string;
  id: string;
  severity: AilmentSeverity;
  title: string;
};

export type TherapyEntryView = {
  active: boolean;
  createdAt: Date;
  description: string;
  durationMinutes: number;
  id: string;
  name: string;
};

export type AppointmentRequestView = {
  agentName: string | null;
  ailmentTitle: string;
  createdAt: Date;
  id: string;
  notes: string | null;
  scheduledFor: Date | null;
  status: AppointmentStatus;
  therapyName: string | null;
};

function parseRequiredDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error("A valid appointment date is required.");
  }

  return date;
}

const appointmentInclude = {
  agent: {
    select: {
      name: true,
    },
  },
  ailmentReport: {
    select: {
      title: true,
    },
  },
  therapyEntry: {
    select: {
      name: true,
    },
  },
} satisfies Prisma.AppointmentRequestInclude;

type AppointmentWithRelations = Prisma.AppointmentRequestGetPayload<{
  include: typeof appointmentInclude;
}>;

function toAppointmentView(appointment: AppointmentWithRelations): AppointmentRequestView {
  return {
    agentName: appointment.agent.name,
    ailmentTitle: appointment.ailmentReport.title,
    createdAt: appointment.createdAt,
    id: appointment.id,
    notes: appointment.notes,
    scheduledFor: appointment.scheduledFor,
    status: appointment.status,
    therapyName: appointment.therapyEntry?.name ?? null,
  };
}

export async function listAgentsForStaff(): Promise<AgentView[]> {
  return getPrismaClient().user.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      email: true,
      id: true,
      name: true,
    },
    where: {
      role: "agent",
    },
  });
}

export async function listAgentAilmentReports(agentId: string): Promise<AilmentReportView[]> {
  const ailments = await getPrismaClient().ailmentReport.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      agentId,
    },
  });

  return ailments.map((ailment) => ({
    agentName: null,
    createdAt: ailment.createdAt,
    description: ailment.description,
    id: ailment.id,
    severity: ailment.severity,
    title: ailment.title,
  }));
}

export async function listSubmittedAilmentReports(): Promise<AilmentReportView[]> {
  const ailments = await getPrismaClient().ailmentReport.findMany({
    include: {
      agent: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return ailments.map((ailment) => ({
    agentName: ailment.agent.name,
    createdAt: ailment.createdAt,
    description: ailment.description,
    id: ailment.id,
    severity: ailment.severity,
    title: ailment.title,
  }));
}

export async function createAilmentReport(agentId: string, input: AilmentReportInput) {
  return getPrismaClient().ailmentReport.create({
    data: {
      agentId,
      description: input.description,
      severity: input.severity,
      title: input.title,
    },
  });
}

export function updateAilmentReport(agentId: string, input: AilmentReportUpdateInput) {
  return getPrismaClient().ailmentReport.updateMany({
    data: {
      description: input.description,
      severity: input.severity,
      title: input.title,
    },
    where: {
      agentId,
      id: input.id,
    },
  });
}

export async function listTherapyEntries(includeInactive = false): Promise<TherapyEntryView[]> {
  const therapies = await getPrismaClient().therapyEntry.findMany({
    orderBy: {
      name: "asc",
    },
    where: includeInactive
      ? undefined
      : {
          active: true,
        },
  });

  return therapies.map((therapy) => ({
    active: therapy.active,
    createdAt: therapy.createdAt,
    description: therapy.description,
    durationMinutes: therapy.durationMinutes,
    id: therapy.id,
    name: therapy.name,
  }));
}

export async function createTherapyEntry(createdById: string, input: TherapyEntryInput) {
  return getPrismaClient().therapyEntry.create({
    data: {
      active: input.active,
      createdById,
      description: input.description,
      durationMinutes: input.durationMinutes,
      name: input.name,
    },
  });
}

export async function updateTherapyEntry(id: string, input: TherapyEntryInput) {
  return getPrismaClient().therapyEntry.update({
    data: {
      active: input.active,
      description: input.description,
      durationMinutes: input.durationMinutes,
      name: input.name,
    },
    where: {
      id,
    },
  });
}

export async function listAgentAppointmentRequests(
  agentId: string,
): Promise<AppointmentRequestView[]> {
  const appointments = await getPrismaClient().appointmentRequest.findMany({
    include: appointmentInclude,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      agentId,
    },
  });

  return appointments.map(toAppointmentView);
}

export async function listStaffAppointmentRequests(): Promise<AppointmentRequestView[]> {
  const appointments = await getPrismaClient().appointmentRequest.findMany({
    include: appointmentInclude,
    orderBy: {
      createdAt: "desc",
    },
  });

  return appointments.map(toAppointmentView);
}

export async function createAppointmentRequest(agentId: string, input: AppointmentRequestInput) {
  const requestedAt = new Date();
  const ailment = await getPrismaClient().ailmentReport.findFirst({
    where: {
      agentId,
      id: input.ailmentReportId,
    },
  });

  if (!ailment) {
    throw new Error("Ailment report not found.");
  }

  return getPrismaClient().appointmentRequest.create({
    data: {
      agentId,
      ailmentReportId: input.ailmentReportId,
      notes: input.notes,
      requestedAt,
      scheduledFor: requestedAt,
      statusHistory: {
        create: {
          changedById: agentId,
          note: "Appointment requested.",
          scheduledFor: requestedAt,
          status: "requested",
        },
      },
      therapyEntryId: input.therapyEntryId || null,
    },
  });
}

export async function cancelAgentAppointmentRequest(
  agentId: string,
  input: AppointmentCancelInput,
) {
  const scheduledFor = parseRequiredDate(input.scheduledFor);

  return getPrismaClient().$transaction(async (prisma) => {
    const appointment = await prisma.appointmentRequest.findFirst({
      where: {
        agentId,
        id: input.appointmentRequestId,
      },
    });

    if (!appointment) {
      throw new Error("Appointment request not found.");
    }

    assertAppointmentStatusTransition(appointment.status, "cancelled");

    return prisma.appointmentRequest.update({
      data: {
        scheduledFor,
        status: "cancelled",
        statusHistory: {
          create: {
            changedById: agentId,
            note: "Cancelled by agent.",
            scheduledFor,
            status: "cancelled",
          },
        },
      },
      include: appointmentInclude,
      where: {
        id: input.appointmentRequestId,
      },
    });
  });
}

export async function triageAppointmentRequest(
  changedById: string,
  appointmentRequestId: string,
  input: AppointmentTriageInput,
) {
  const scheduledFor = parseRequiredDate(input.scheduledFor);

  return getPrismaClient().$transaction(async (prisma) => {
    const appointment = await prisma.appointmentRequest.findUnique({
      where: {
        id: appointmentRequestId,
      },
    });

    if (!appointment) {
      throw new Error("Appointment request not found.");
    }

    assertAppointmentStatusTransition(appointment.status, input.status);

    return prisma.appointmentRequest.update({
      data: {
        scheduledFor,
        status: input.status,
        statusHistory: {
          create: {
            changedById,
            note: input.note,
            scheduledFor,
            status: input.status,
          },
        },
      },
      include: appointmentInclude,
      where: {
        id: appointmentRequestId,
      },
    });
  });
}
