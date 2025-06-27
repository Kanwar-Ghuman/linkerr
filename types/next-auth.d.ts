import { Role } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface NextAuthOptions {
    allowDangerousEmailAccountLinking?: boolean;
  }
  interface User {
    role?: Role;
  }

  interface Session {
    user: {
      id: string;
      role: string;
      name: string;
      email: string;
      image: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
