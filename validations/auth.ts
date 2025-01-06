import * as z from "zod";

export const emailSchema = z
  .string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  })
  .email();

export const userIdSchema = z
  .string({
    required_error: "User Id is required",
    invalid_type_error: "User Id must be a string",
  })
  .min(1, {
    message: "User Id must be at least 1 character long",
  })
  .max(512, {
    message: "User Id must be at most 512 characters long",
  });

export const passwordSchema = z
  .string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  })
  .min(8, {
    message: "Password must be at least 8 characters long",
  })
  .max(256, {
    message: "Password must be at most 256 characters long",
  });

export const signUpWithPasswordSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signInWithPasswordSchema = z.object({
  email: emailSchema,
  password: z.string(),
});

export type SignUpWithPasswordFormInput = z.infer<
  typeof signUpWithPasswordSchema
>;
export type SignInWithPasswordFormInput = z.infer<
  typeof signInWithPasswordSchema
>;
