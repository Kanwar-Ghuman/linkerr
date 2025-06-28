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
      return NextResponse.json(
        { jobs: [], error: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log("Session user:", session.user.id);

    // Find or create a student record if it doesn't exist
    let student = await prisma.student.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    if (!student) {
      console.log("No student found for user:", session.user.id);
      // Create a temporary student record instead of returning a 404
      student = await prisma.student.create({
        data: {
          userId: session.user.id,
          major: "",
          university: "",
          gradYear: 2025,
          resume: "",
        },
      });
      console.log("Created new student record:", student.id);
    }

    console.log("Found/created student:", student.id);

    // Rest of the function remains the same...
    const jobs = await prisma.job.findMany({
      where: {
        status: "APPROVED",
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
      company:
        job.companyName || job.employer?.companyName || "Unknown Company",
      location: job.roleLocation || "Remote",
      salary: job.pay || 0,
      type: job.jobType || "Full-time",
      skills: Array.isArray(job.skills) ? job.skills : [],
      description: job.jobDescription || "",
      remote: job.remote || "No",
      hasApplied: job.applications.length > 0,
      createdAt: job.createdAt,
    }));

    console.log("Formatted jobs:", formattedJobs.length);

    return NextResponse.json({ jobs: formattedJobs });
  } catch (error) {
    console.error("Jobs fetch error:", error);
    return NextResponse.json(
      { jobs: [], error: "Failed to fetch jobs" },
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
