import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { jobId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify user is admin
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { status } = body;

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Get admin record
    const admin = await prisma.admin.findUnique({
      where: { userId: session.user.id },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Admin record not found" },
        { status: 404 }
      );
    }

    // Update job status
    const updatedJob = await prisma.job.update({
      where: { id: params.jobId },
      data: {
        status: status as "APPROVED" | "REJECTED",
        adminId: admin.id, // Track who approved/rejected
      },
    });

    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    console.error("Job status update error:", error);
    return NextResponse.json(
      { error: "Failed to update job status" },
      { status: 500 }
    );
  }
}
