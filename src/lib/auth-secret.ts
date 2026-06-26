const devAuthSecret = "agentclinic-local-development-secret-change-before-production-2026";

export function getAuthSecret() {
  return process.env.NEXTAUTH_SECRET ?? devAuthSecret;
}
