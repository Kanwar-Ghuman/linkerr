import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { StudentProfileSchema } from "@/lib/forms/schemas";
import { auth } from "@/auth";
import { validateForm } from "@/validations/forms";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();

        // Use helper function for validation
        const validation = validateForm(StudentProfileSchema, body);
        if (!validation.isValid) return validation.error;

        const updatedStudent = await prisma.student.update({
            where: {
                userId: session.user.id,
            },
            data: {
                major: validation.data.major,
                university: validation.data.university,
                gradYear: validation.data.gradYear,
                skills: validation.data.skills,
                resume: validation.data.resume,
            },
        });

        return NextResponse.json(updatedStudent, { status: 200 });
    } catch (error) {
        console.error("Profile update error:", error);
        return NextResponse.json(
            { error: "Failed to update profile" },
            { status: 500 }
        );
    }
}
