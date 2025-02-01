/* eslint-disable @typescript-eslint/no-unused-vars */
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
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { status } = body;

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updatedJob = await prisma.job.update({
      where: { id: params.jobId },
      data: {
        status: status as "APPROVED" | "REJECTED",
        adminId: session.user.id,
      },
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update job status" },
      { status: 500 }
    );
  }
}
