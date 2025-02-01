import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: { jobId: string } }
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify user is a student
    if (session.user.role !== "STUDENT") {
      return NextResponse.json(
        { error: "Only students can apply" },
        { status: 403 }
      );
    }

    // Get student record
    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Student profile not found" },
        { status: 404 }
      );
    }

    // Check if job exists and is approved
    const job = await prisma.job.findUnique({
      where: { id: params.jobId },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (job.status !== "APPROVED") {
      return NextResponse.json(
        { error: "This job is not accepting applications" },
        { status: 400 }
      );
    }

    // Check for existing application
    const existingApplication = await prisma.jobApplication.findUnique({
      where: {
        jobId_studentId: {
          jobId: params.jobId,
          studentId: student.id,
        },
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied for this job" },
        { status: 400 }
      );
    }

    // Create application
    const application = await prisma.jobApplication.create({
      data: {
        jobId: params.jobId,
        studentId: student.id,
        status: "PENDING",
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error("Application error:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
