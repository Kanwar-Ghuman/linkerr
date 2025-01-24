import { getUserByEmail } from "@/actions/user";
import bcryptjs from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signInWithPasswordSchema } from "@/validations/auth";

export default {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "student", // Default role
        };
      },
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
} satisfies NextAuthConfig;
