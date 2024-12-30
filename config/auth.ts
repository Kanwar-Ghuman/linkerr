import { getUserById, getUserByEmail } from "@/actions/user";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import bcryptjs from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signInWithPasswordSchema } from "@/validations/auth";
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
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as "USER" | "ADMIN";
      }
      return session;
    },
    async signIn({ user, account }) {
      if (!user.id) return false;
      if (account?.provider === "google") return true;

      const existingUser = await getUserById({ id: user.id });
      return existingUser ? true : false;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      async authorize(rawCredentials) {
        const validatedCredentials =
          signInWithPasswordSchema.safeParse(rawCredentials);
        if (!validatedCredentials.success) return null;

        const { email, password } = validatedCredentials.data;
        const user = await getUserByEmail({ email });
        if (!user?.passwordHash) return null;

        const passwordIsValid = await bcryptjs.compare(
          password,
          user.passwordHash
        );
        return passwordIsValid ? user : null;
      },
    }),
  ],
});
