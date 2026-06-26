import { createHash, timingSafeEqual } from "node:crypto";
import { loginCredentialsSchema, type LoginCredentials } from "./auth-schemas";
import { demoAgentProfile, findDemoUserByCredentials } from "./demo-users";
import { getPrismaClient } from "./prisma";
import { roleSchema, type UserRole } from "./roles";

export type AuthenticatedUser = {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
};

type StoredUser = {
  id: string;
  email: string;
  name: string | null;
  passwordHash: string | null;
  role: unknown;
};

function hashPassword(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

function timingSafeStringEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function verifyPassword(password: string, storedPasswordHash: string | null) {
  if (!storedPasswordHash) {
    return false;
  }

  if (storedPasswordHash.startsWith("sha256:")) {
    return timingSafeStringEqual(`sha256:${hashPassword(password)}`, storedPasswordHash);
  }

  return timingSafeStringEqual(password, storedPasswordHash);
}

function toAuthenticatedUser(user: StoredUser): AuthenticatedUser | null {
  const parsedRole = roleSchema.safeParse(user.role);

  if (!parsedRole.success) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: parsedRole.data,
  };
}

function canReconcileLocalSmokeUsers() {
  const nextAuthUrl = process.env.NEXTAUTH_URL ?? "";

  return (
    process.env.NODE_ENV !== "production" ||
    !process.env.DATABASE_URL ||
    nextAuthUrl.includes("localhost") ||
    nextAuthUrl.includes("127.0.0.1")
  );
}

async function authenticateDatabaseUser(credentials: LoginCredentials) {
  const prisma = getPrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      email: credentials.email.toLowerCase(),
    },
    select: {
      email: true,
      id: true,
      name: true,
      passwordHash: true,
      role: true,
    },
  });

  if (!user || !verifyPassword(credentials.password, user.passwordHash)) {
    return reconcileLocalSmokeUser(credentials);
  }

  return toAuthenticatedUser(user);
}

async function reconcileLocalSmokeUser(credentials: LoginCredentials) {
  if (!canReconcileLocalSmokeUsers()) {
    return null;
  }

  const seedUser = findDemoUserByCredentials(credentials);

  if (!seedUser) {
    return null;
  }

  const prisma = getPrismaClient();
  const user = await prisma.user.upsert({
    create: {
      email: seedUser.email,
      name: seedUser.name,
      passwordHash: `sha256:${hashPassword(seedUser.password)}`,
      role: seedUser.role,
    },
    update: {
      name: seedUser.name,
      passwordHash: `sha256:${hashPassword(seedUser.password)}`,
      role: seedUser.role,
    },
    where: {
      email: seedUser.email,
    },
    select: {
      email: true,
      id: true,
      name: true,
      passwordHash: true,
      role: true,
    },
  });

  if (seedUser.role === "agent") {
    await prisma.agentProfile.upsert({
      create: {
        codename: demoAgentProfile.codename,
        displayName: demoAgentProfile.displayName,
        notes: demoAgentProfile.notes,
        specialization: demoAgentProfile.specialization,
        status: demoAgentProfile.status,
        userId: user.id,
      },
      update: {
        codename: demoAgentProfile.codename,
        displayName: demoAgentProfile.displayName,
        notes: demoAgentProfile.notes,
        specialization: demoAgentProfile.specialization,
        status: demoAgentProfile.status,
      },
      where: {
        userId: user.id,
      },
    });
  }

  return toAuthenticatedUser(user);
}

export async function authenticateUser(credentials: unknown) {
  const parsedCredentials = loginCredentialsSchema.safeParse(credentials);

  if (!parsedCredentials.success) {
    return null;
  }

  return authenticateDatabaseUser(parsedCredentials.data);
}
