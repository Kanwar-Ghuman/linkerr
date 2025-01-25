import { prisma } from "@/config/db";
import { JobValidation } from "@/lib/forms/schemas";
<<<<<<< HEAD
import { Prisma } from "@prisma/client";
=======
>>>>>>> 8114418 (worked on the schemas and database job listing creation)
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
<<<<<<< HEAD
            jobDescription,
=======
            jobDesctiption,
>>>>>>> 8114418 (worked on the schemas and database job listing creation)
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
<<<<<<< HEAD
                jobDescription,
=======
                jobDesctiption,
>>>>>>> 8114418 (worked on the schemas and database job listing creation)
                jobType,
                roleLocation,
                companyName,
                remote,
                skills,
<<<<<<< HEAD
                pay: new Prisma.Decimal(pay),
=======
                pay,
>>>>>>> 8114418 (worked on the schemas and database job listing creation)
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
