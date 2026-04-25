import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "manager" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Mock authorization for now
        if (credentials?.username === "admin") {
          return { id: "1", name: "Admin User", email: "admin@example.com", role: "ADMIN" };
        } else if (credentials?.username === "manager") {
          return { id: "2", name: "Manager User", email: "manager@example.com", role: "MANAGER" };
        } else if (credentials?.username === "student") {
          return { id: "3", name: "Student User", email: "student@example.com", role: "STUDENT" };
        } else if (credentials?.username === "stakeholder") {
          return { id: "4", name: "Stakeholder User", email: "stakeholder@example.com", role: "STAKEHOLDER" };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      if (trigger === "update" && session?.role) {
        token.role = session.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role as string;
        (session.user as any).id = token.id as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "super-secret-local-key-for-dev",
  session: {
    strategy: "jwt",
  },
};
