import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { StudentProfileSchema } from "@/lib/forms/schemas";
import { auth } from "@/auth";
import { validateForm } from "@/validations/forms";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      console.log("No session found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Session user:", session.user.id);

    const student = await prisma.student.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    if (!student) {
      console.log("No student found for user:", session.user.id);
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    console.log("Found student:", student.id);

    // Modified query to get only approved jobs
    const jobs = await prisma.job.findMany({
      where: {
        status: "APPROVED", // Only show approved jobs
      },
      include: {
        applications: {
          where: {
            studentId: student.id,
          },
        },
        employer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("Found jobs:", jobs.length);

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

    console.log("Formatted jobs:", formattedJobs.length);

    return NextResponse.json({ jobs: formattedJobs });
  } catch (error) {
    console.error("Jobs fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

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

    return NextResponse.json(updatedStudent);
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
