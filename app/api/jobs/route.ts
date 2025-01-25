import { prisma } from "@/config/db";
import { JobValidation } from "@/lib/forms/schemas";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {
        const body = await req.json()

        const parseResult = JobValidation.safeParse(body);

        if (!parseResult.success) {
            return NextResponse.json(
                { error: "Invalid request data." },
                { status: 405 },
            )
        }

        console.log(parseResult)

        const {
            jobTitle,
            jobDescription,
            jobType,
            roleLocation,
            companyName,
            remote,
            skills,
            pay,
            education,
        } = parseResult.data;

        const newJob = await prisma.job.create({
            data: {
                jobTitle,
                jobDescription,
                jobType,
                roleLocation,
                companyName,
                remote,
                skills,
                pay: new Prisma.Decimal(pay),
                education,
            },
        });

        return NextResponse.json(
            { data: newJob },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { details: String(error) },
            { status: 500 }
        )
    }
}
