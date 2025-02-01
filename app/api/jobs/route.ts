import { NextResponse } from "next/server";
import { JobValidation } from "@/lib/forms/schemas";
import { PrismaClient } from "@prisma/client";
import { validateForm } from "@/validations/forms";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate form data
    const validation = validateForm(JobValidation, body);
    if (!validation.isValid) return validation.error;

    const jobData = validation.data;
    const remote = jobData.remote.toUpperCase();

    const createdJob = await prisma.job.create({
      data: {
        jobTitle: jobData.jobTitle,
        jobDescription: jobData.jobDescription,
        jobType: jobData.jobType || null,
        roleLocation: jobData.roleLocation || "",
        companyName: jobData.companyName,
        remote: remote as "REMOTE" | "ONSITE" | "HYBRID",
        skills: jobData.skills,
        pay: jobData.pay,
        employerId: "SIMULATED_EMPLOYER_ID", // Replace with real auth
      },
    });

    return NextResponse.json(createdJob, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
