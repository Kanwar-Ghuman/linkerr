"use server";

import bcryptjs from "bcryptjs";
import { AuthError } from "next-auth";
import { prisma } from "@/config/db";
import { getUserByEmail } from "@/actions/user";
import { signIn } from "@/auth";
import {
  signInWithPasswordSchema,
  signUpWithPasswordSchema,
  type SignInWithPasswordFormInput,
  type SignUpWithPasswordFormInput,
} from "@/validations/auth";

export async function signUpWithPassword(
  rawInput: SignUpWithPasswordFormInput
): Promise<"invalid-input" | "exists" | "error" | "success"> {
  try {
    const validatedInput = signUpWithPasswordSchema.safeParse(rawInput);
    if (!validatedInput.success) return "invalid-input";

    const user = await getUserByEmail({ email: validatedInput.data.email });
    if (user) return "exists";

    const passwordHash = await bcryptjs.hash(validatedInput.data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: validatedInput.data.email,
        passwordHash,
      },
    });

    return newUser ? "success" : "error";
  } catch (error) {
    console.error(error);
    throw new Error("Error signing up with password");
  }
}

export async function signInWithPassword(
  rawInput: SignInWithPasswordFormInput
): Promise<
  "invalid-input" | "invalid-credentials" | "not-registered" | "success"
> {
  try {
    const validatedInput = signInWithPasswordSchema.safeParse(rawInput);
    if (!validatedInput.success) return "invalid-input";

    const existingUser = await getUserByEmail({
      email: validatedInput.data.email,
    });
    if (!existingUser) return "not-registered";

    await signIn("credentials", {
      email: validatedInput.data.email,
      password: validatedInput.data.password,
      redirect: false,
    });

    return "success";
  } catch (error) {
    if (error instanceof AuthError) {
      return "invalid-credentials";
    }
    throw error;
  }
}
