// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import { auth } from "@/auth";
// import { sendAcceptanceEmail } from "@/lib/email";

// const prisma = new PrismaClient();

// export async function POST(
//   request: Request,
//   { params }: { params: { jobId: string; applicationId: string } }
// ) {
//   try {
//     const session = await auth();
//     if (!session?.user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // Get the application with student and job details
//     const application = await prisma.jobApplication.findUnique({
//       where: { id: params.applicationId },
//       include: {
//         student: {
//           include: {
//             user: true,
//           },
//         },
//         job: true,
//       },
//     });

//     if (!application) {
//       return NextResponse.json(
//         { error: "Application not found" },
//         { status: 404 }
//       );
//     }

//     // Update application status
//     const updatedApplication = await prisma.jobApplication.update({
//       where: { id: params.applicationId },
//       data: { status: "ACCEPTED" },
//       include: {
//         student: {
//           include: {
//             user: true,
//           },
//         },
//         job: true,
//       },
//     });

//     // Send acceptance email
//     await sendAcceptanceEmail(
//       application.student.user.email,
//       application.student.user.name || "Student",
//       application.job.jobTitle,
//       application.job.companyName
//     );

//     return NextResponse.json(updatedApplication);
//   } catch (error) {
//     console.error("Error accepting application:", error);
//     return NextResponse.json(
//       { error: "Failed to accept application" },
//       { status: 500 }
//     );
//   }
// }
