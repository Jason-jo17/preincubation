import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "manager" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Mock authorization for now
        if (credentials?.username === "admin") {
          return { id: "1", name: "Admin User", email: "admin@example.com", role: "ADMIN" };
        } else if (credentials?.username === "manager") {
          return { id: "2", name: "Manager User", email: "manager@example.com", role: "MANAGER" };
        } else if (credentials?.username === "student") {
          return { id: "3", name: "Student User", email: "student@example.com", role: "STUDENT" };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "super-secret-local-key-for-dev",
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
