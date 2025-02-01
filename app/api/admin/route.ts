import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const jobs = await prisma.job.findMany({
      include: {
        employer: true,
        applications: true,
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
      salary: `$${job.pay}`,
      type: job.jobType || "Full-time",
      skills: job.skills,
      status: job.status,
      postedDate: job.createdAt,
      applications: job.applications.length,
    }));

    return NextResponse.json({ jobs: formattedJobs });
  } catch (error) {
    console.error("Admin jobs API Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
