import { NextResponse } from "next/server";
import { PrismaClient, JobStatus } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { jobId } = await params;
    const data = await request.json();
    const status = data.status as JobStatus;

    if (!Object.values(JobStatus).includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    // Get admin record
    const admin = await prisma.admin.findUnique({
      where: { userId: session.user.id },
    });

    if (!admin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }

    const existingJob = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!existingJob) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        status: status,
        adminId: admin.id, // Use admin.id instead of session.user.id
      },
      include: {
        employer: true,
        approvedBy: true,
      },
    });

    return NextResponse.json({
      message: `Job ${status.toLowerCase()} successfully`,
      job: updatedJob,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { message: "Failed to update job status" },
      { status: 500 }
    );
  }
}
