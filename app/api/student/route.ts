/* eslint-disable @typescript-eslint/no-unused-vars */
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

    const updatedStudent = await prisma.student.upsert({
      where: {
        userId: session.user.id,
      },
      update: {
        major: validation.data.major,
        university: validation.data.university,
        gradYear: validation.data.gradYear,
        skills: validation.data.skills,
        resume: validation.data.resume,
      },
      create: {
        user: {
          connect: {
            id: session.user.id,
          },
        },
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

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const jobs = await prisma.job.findMany({
      where: {
        status: "APPROVED",
      },
      include: {
        applications: {
          where: {
            studentId: session.user.id,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedJobs = jobs.map((job) => ({
      id: job.id,
      title: job.jobTitle,
      company: job.companyName,
      location: job.roleLocation,
      salary: job.pay,
      type: job.jobType || "Full-time",
      skills: job.skills,
      description: job.jobDescription,
      remote: job.remote,
      hasApplied: job.applications.length > 0,
      createdAt: job.createdAt,
    }));

    return NextResponse.json({ jobs: formattedJobs });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
