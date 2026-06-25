import type { LoginCredentials } from "./auth-schemas";
import type { UserRole } from "./roles";

export type DemoUser = {
  id: string;
  email: string;
  name: string;
  password: string;
  role: UserRole;
};

export type DemoAgentProfile = {
  userId: string;
  displayName: string;
  codename: string;
  specialization: string;
  status: string;
  notes: string;
};

export const demoUsers: DemoUser[] = [
  {
    id: "demo-agent",
    email: "agent@agentclinic.local",
    name: "Avery Quinn",
    password: "agent-demo",
    role: "agent",
  },
  {
    id: "demo-staff",
    email: "staff@agentclinic.local",
    name: "Morgan Lee",
    password: "staff-demo",
    role: "staff",
  },
];

export const demoAgentProfile: DemoAgentProfile = {
  userId: "demo-agent",
  displayName: "Avery Quinn",
  codename: "Nightingale",
  specialization: "Field recovery coordination",
  status: "Available",
  notes: "Cleared for active duty with weekly therapy check-ins.",
};

export function findDemoUserByCredentials(credentials: LoginCredentials) {
  const normalizedEmail = credentials.email.toLowerCase();

  return demoUsers.find(
    (user) => user.email === normalizedEmail && user.password === credentials.password,
  );
}

export function getDemoAgentProfile(userId: string) {
  return demoAgentProfile.userId === userId ? demoAgentProfile : null;
}
