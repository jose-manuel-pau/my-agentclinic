CREATE TYPE "AilmentSeverity" AS ENUM ('low', 'medium', 'high');
CREATE TYPE "AppointmentStatus" AS ENUM ('requested', 'confirmed', 'rescheduled', 'cancelled', 'completed');

CREATE TABLE "AilmentReport" (
  "id" TEXT NOT NULL,
  "agentId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "severity" "AilmentSeverity" NOT NULL DEFAULT 'medium',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AilmentReport_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "TherapyEntry" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "durationMinutes" INTEGER NOT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "createdById" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "TherapyEntry_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AppointmentRequest" (
  "id" TEXT NOT NULL,
  "agentId" TEXT NOT NULL,
  "ailmentReportId" TEXT NOT NULL,
  "therapyEntryId" TEXT,
  "status" "AppointmentStatus" NOT NULL DEFAULT 'requested',
  "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "scheduledFor" TIMESTAMP(3),
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AppointmentRequest_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AppointmentStatusHistory" (
  "id" TEXT NOT NULL,
  "appointmentRequestId" TEXT NOT NULL,
  "status" "AppointmentStatus" NOT NULL,
  "note" TEXT,
  "changedById" TEXT,
  "scheduledFor" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AppointmentStatusHistory_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "AilmentReport_agentId_idx" ON "AilmentReport"("agentId");
CREATE INDEX "AilmentReport_createdAt_idx" ON "AilmentReport"("createdAt");
CREATE INDEX "TherapyEntry_active_idx" ON "TherapyEntry"("active");
CREATE INDEX "TherapyEntry_createdById_idx" ON "TherapyEntry"("createdById");
CREATE INDEX "AppointmentRequest_agentId_idx" ON "AppointmentRequest"("agentId");
CREATE INDEX "AppointmentRequest_ailmentReportId_idx" ON "AppointmentRequest"("ailmentReportId");
CREATE INDEX "AppointmentRequest_therapyEntryId_idx" ON "AppointmentRequest"("therapyEntryId");
CREATE INDEX "AppointmentRequest_status_idx" ON "AppointmentRequest"("status");
CREATE INDEX "AppointmentStatusHistory_appointmentRequestId_idx" ON "AppointmentStatusHistory"("appointmentRequestId");
CREATE INDEX "AppointmentStatusHistory_changedById_idx" ON "AppointmentStatusHistory"("changedById");
CREATE INDEX "AppointmentStatusHistory_status_idx" ON "AppointmentStatusHistory"("status");

ALTER TABLE "AilmentReport" ADD CONSTRAINT "AilmentReport_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TherapyEntry" ADD CONSTRAINT "TherapyEntry_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "AppointmentRequest" ADD CONSTRAINT "AppointmentRequest_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AppointmentRequest" ADD CONSTRAINT "AppointmentRequest_ailmentReportId_fkey" FOREIGN KEY ("ailmentReportId") REFERENCES "AilmentReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AppointmentRequest" ADD CONSTRAINT "AppointmentRequest_therapyEntryId_fkey" FOREIGN KEY ("therapyEntryId") REFERENCES "TherapyEntry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "AppointmentStatusHistory" ADD CONSTRAINT "AppointmentStatusHistory_appointmentRequestId_fkey" FOREIGN KEY ("appointmentRequestId") REFERENCES "AppointmentRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AppointmentStatusHistory" ADD CONSTRAINT "AppointmentStatusHistory_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
