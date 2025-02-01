/* eslint-disable @typescript-eslint/no-explicit-any */
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

export async function GET(request: Request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const sort = searchParams.get("sort") || "recent";
    const search = searchParams.get("search") || "";

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build sort object
    let orderBy: any = { createdAt: "desc" };
    if (sort === "applications") {
      orderBy = { applications: { _count: "desc" } };
    }

    // Get jobs with counts
    const jobs = await prisma.job.findMany({
      where: {
        OR: [
          { jobTitle: { contains: search, mode: "insensitive" } },
          { companyName: { contains: search, mode: "insensitive" } },
          { jobDescription: { contains: search, mode: "insensitive" } },
        ],
      },
      include: {
        _count: {
          select: { applications: true },
        },
        applications: {
          select: {
            status: true,
          },
        },
      },
      orderBy,
      skip,
      take: limit,
    });

    // Get total count for pagination
    const total = await prisma.job.count({
      where: {
        OR: [
          { jobTitle: { contains: search, mode: "insensitive" } },
          { companyName: { contains: search, mode: "insensitive" } },
          { jobDescription: { contains: search, mode: "insensitive" } },
        ],
      },
    });

    // Format response
    const formattedJobs = jobs.map((job) => ({
      id: job.id,
      jobTitle: job.jobTitle,
      companyName: job.companyName,
      roleLocation: job.roleLocation,
      remote: job.remote,
      jobType: job.jobType,
      pay: job.pay,
      status: job.status,
      totalApplications: job._count.applications,
      createdAt: job.createdAt,
      skills: job.skills,
    }));

    return NextResponse.json({
      jobs: formattedJobs,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
        perPage: limit,
      },
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
