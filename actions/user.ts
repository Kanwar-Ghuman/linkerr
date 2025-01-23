"use server";

import { type User } from "@prisma/client";

import { prisma } from "@/config/db";
import {
  getUserByEmailSchema,
  getUserByIdSchema,
  type GetUserByEmailInput,
  type GetUserByIdInput,
} from "@/validations/user";

export async function getUserById(
  rawInput: GetUserByIdInput
): Promise<User | null> {
  try {
    const validatedInput = getUserByIdSchema.safeParse(rawInput);
    if (!validatedInput.success) return null;

    return await prisma.user.findUnique({
      where: {
        id: validatedInput.data.id,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error getting user by Id");
  }
}

export async function getUserByEmail(
  rawInput: GetUserByEmailInput
): Promise<User | null> {
  try {
    const validatedInput = getUserByEmailSchema.safeParse(rawInput);
    if (!validatedInput.success) return null;

    return await prisma.user.findUnique({
      where: {
        email: validatedInput.data.email,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error getting user by email");
  }
}
