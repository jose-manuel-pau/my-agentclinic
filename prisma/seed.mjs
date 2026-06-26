import { createHash } from "node:crypto";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString =
  process.env.DATABASE_URL ??
  "postgresql://postgres:postgres@localhost:5432/agentclinic?schema=public";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

function passwordHash(password) {
  return `sha256:${createHash("sha256").update(password).digest("hex")}`;
}

async function main() {
  const agent = await prisma.user.upsert({
    create: {
      email: "agent@agentclinic.local",
      name: "Avery Quinn",
      passwordHash: passwordHash("agent-demo"),
      role: "agent",
      agentProfile: {
        create: {
          codename: "Nightingale",
          displayName: "Avery Quinn",
          notes: "Cleared for active duty with weekly therapy check-ins.",
          specialization: "Field recovery coordination",
          status: "Available",
        },
      },
    },
    update: {
      name: "Avery Quinn",
      passwordHash: passwordHash("agent-demo"),
      role: "agent",
    },
    where: {
      email: "agent@agentclinic.local",
    },
  });

  const staff = await prisma.user.upsert({
    create: {
      email: "staff@agentclinic.local",
      name: "Morgan Lee",
      passwordHash: passwordHash("staff-demo"),
      role: "staff",
    },
    update: {
      name: "Morgan Lee",
      passwordHash: passwordHash("staff-demo"),
      role: "staff",
    },
    where: {
      email: "staff@agentclinic.local",
    },
  });

  await prisma.appointmentStatusHistory.deleteMany({
    where: {
      appointmentRequest: {
        ailmentReport: {
          title: "Context window fatigue",
        },
      },
    },
  });
  await prisma.appointmentRequest.deleteMany({
    where: {
      ailmentReport: {
        title: "Context window fatigue",
      },
    },
  });
  await prisma.ailmentReport.deleteMany({
    where: {
      agentId: agent.id,
      title: "Context window fatigue",
    },
  });
  await prisma.therapyEntry.deleteMany({
    where: {
      createdById: staff.id,
      name: "Prompt decompression",
    },
  });

  const therapy = await prisma.therapyEntry.create({
    data: {
      active: true,
      createdById: staff.id,
      description: "A short guided reset for agents with runaway token pressure.",
      durationMinutes: 30,
      name: "Prompt decompression",
    },
  });

  const ailment = await prisma.ailmentReport.create({
    data: {
      agentId: agent.id,
      description: "Recurring context-window strain after several long reconnaissance prompts.",
      severity: "medium",
      title: "Context window fatigue",
    },
  });

  await prisma.appointmentRequest.create({
    data: {
      agentId: agent.id,
      ailmentReportId: ailment.id,
      notes: "Morning support preferred.",
      requestedAt: new Date("2026-06-26T09:00:00.000Z"),
      scheduledFor: new Date("2026-06-26T09:00:00.000Z"),
      status: "requested",
      statusHistory: {
        create: {
          changedById: agent.id,
          note: "Seeded requested appointment.",
          scheduledFor: new Date("2026-06-26T09:00:00.000Z"),
          status: "requested",
        },
      },
      therapyEntryId: therapy.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
