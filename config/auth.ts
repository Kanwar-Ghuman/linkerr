import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
}

export default {
  providers: [
    GoogleProvider({
      clientId: getEnvVar("GOOGLE_ID"),
      clientSecret: getEnvVar("GOOGLE_SECRET"),
    }),
  ],
} satisfies NextAuthConfig;
