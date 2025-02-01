/* eslint-disable prefer-const */
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const adminEmailList = ["ghumankm@gmail.com", "rohanpeddmallu@gmail.com"];

const employerEmailList = [
  "kanwarmehtab.ghuman@franklinsabers.org",
  "heyanantraj@gmail.com",
];

const studentsEmailList = ["mcdabg1236@gmail.com"];

export enum Role {
  ADMIN = "ADMIN",
  EMPLOYER = "EMPLOYER",
  STUDENT = "STUDENT",
}

function getUserRole(email: string): Role {
  if (adminEmailList.includes(email)) return Role.ADMIN;
  if (employerEmailList.includes(email)) return Role.EMPLOYER;
  if (studentsEmailList.includes(email)) return Role.STUDENT;
  throw new Error("Unauthorized email");
}
const prisma = new PrismaClient();

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],

  session: { strategy: "jwt" },
  pages: { signIn: "/signin" },

  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  events: {
    async signIn({ user, isNewUser }) {
      if (!isNewUser) return;
      if (!user.email) {
        throw new Error("User email is required");
      }
      user.role = getUserRole(user.email);

      await prisma.user.update({
        where: { email: user.email },
        data: { role: user.role },
      });

      if (user.role === "ADMIN" || user.role === "EMPLOYER") {
        let employer = await prisma.employer.findUnique({
          where: { userId: user.id },
        });
        if (!employer) {
          await prisma.employer.create({
            data: { userId: user.id!, companyName: "" },
          });
        }
      }
    },
  },
});
