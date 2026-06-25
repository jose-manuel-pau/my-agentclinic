import { createHash, timingSafeEqual } from "node:crypto";
import { loginCredentialsSchema, type LoginCredentials } from "./auth-schemas";
import { findDemoUserByCredentials } from "./demo-users";
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

async function authenticateDatabaseUser(credentials: LoginCredentials) {
  const user = await getPrismaClient().user.findUnique({
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
    return null;
  }

  return toAuthenticatedUser(user);
}

function authenticateDemoUser(credentials: LoginCredentials) {
  const user = findDemoUserByCredentials(credentials);

  return user
    ? {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    : null;
}

export async function authenticateUser(credentials: unknown) {
  const parsedCredentials = loginCredentialsSchema.safeParse(credentials);

  if (!parsedCredentials.success) {
    return null;
  }

  if (!process.env.DATABASE_URL) {
    return authenticateDemoUser(parsedCredentials.data);
  }

  return authenticateDatabaseUser(parsedCredentials.data);
}
