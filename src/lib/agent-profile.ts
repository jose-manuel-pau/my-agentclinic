import type { AgentProfile } from "@prisma/client";
import { getDemoAgentProfile } from "./demo-users";
import { getPrismaClient } from "./prisma";

export type AgentProfileView = Pick<
  AgentProfile,
  "codename" | "displayName" | "notes" | "specialization" | "status" | "userId"
>;

function toAgentProfileView(profile: AgentProfile): AgentProfileView {
  return {
    codename: profile.codename,
    displayName: profile.displayName,
    notes: profile.notes,
    specialization: profile.specialization,
    status: profile.status,
    userId: profile.userId,
  };
}

export async function getAgentProfileForUser(userId: string): Promise<AgentProfileView | null> {
  if (!process.env.DATABASE_URL) {
    return getDemoAgentProfile(userId);
  }

  const profile = await getPrismaClient().agentProfile.findUnique({
    where: {
      userId,
    },
  });

  return profile ? toAgentProfileView(profile) : null;
}
