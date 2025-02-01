import { NextResponse } from "next/server";
import { z } from "zod";

export function validateForm(schema: z.ZodSchema, form: unknown) {
  try {
    const validated = schema.parse(form);
    return { isValid: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        error: NextResponse.json({ error: error.errors }, { status: 400 }),
      };
    }
    return {
      isValid: false,
      error: NextResponse.json({ error: "Validation failed" }, { status: 400 }),
    };
  }
}
