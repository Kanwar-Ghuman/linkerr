import { linkOAuthAccount } from "@/actions/auth";
import { getUserById } from "@/actions/user";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import { Role } from "@prisma/client";

import authConfig from "@/config/auth";
import { prisma } from "@/config/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    verifyRequest: "/signin/magic-link-signin",
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  events: {
    async linkAccount({ user }) {
      if (user.id) await linkOAuthAccount({ userId: user.id });
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role as Role;
      }

      if (account?.provider === "google" && account.role) {
        const userRole = account.role as Role;
        token.role = userRole;

        await prisma.user.update({
          where: { id: token.sub! },
          data: {
            role: userRole,
          },
        });
      }
      return token;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }

      return session;
    },

    async signIn({ user, account }) {
      if (!user.id) return false;

      // Allow OAuth providers
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await getUserById({ id: user.id });
      return !existingUser?.emailVerified ? false : true;
    },
  },

  adapter: PrismaAdapter(prisma),
});
