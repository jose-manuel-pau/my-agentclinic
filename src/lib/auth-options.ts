import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAuthSecret } from "./auth-secret";
import { authenticateUser } from "./auth-users";
import { roleSchema } from "./roles";

export const authOptions: NextAuthOptions = {
  logger: {
    error(code, metadata) {
      if (code === "JWT_SESSION_ERROR") {
        return;
      }

      console.error(`[next-auth][error][${code}]`, metadata);
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: getAuthSecret(),
  providers: [
    CredentialsProvider({
      name: "Demo credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await authenticateUser(credentials);

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = roleSchema.parse(user.role);
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = roleSchema.parse(token.role);
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
