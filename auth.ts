import { linkOAuthAccount } from "@/actions/auth";
import { getUserById } from "@/actions/user";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";

import authConfig from "@/config/auth";
import { prisma } from "@/config/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
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
    // eslint-disable-next-line @typescript-eslint/require-await
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    async session({ session, token }) {
      // if they have an id (sub) and user has been created, return it
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      // if they have a role and user has been created, return it
      if (token.role && session.user) {
        session.user.role = token.role as "USER" | "ADMIN";
      }

      return session;
    },
    async signIn({ user, account }) {
      if (!user.id) return false;
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById({ id: user.id });

      return !existingUser?.emailVerifiedAt ? false : true;
    },
  },

  adapter: PrismaAdapter(prisma),
  ...authConfig,
});
