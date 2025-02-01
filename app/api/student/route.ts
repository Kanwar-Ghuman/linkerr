export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // First get the student record
    const student = await prisma.student.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    if (!student) {
      return new NextResponse("Student not found", { status: 404 });
    }

    // Then get all approved jobs with application status
    const jobs = await prisma.job.findMany({
      where: {
        status: "APPROVED",
      },
      include: {
        applications: {
          where: {
            studentId: student.id, // Use actual student.id instead of session.user.id
          },
        },
        employer: true, // Include employer details
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("Found jobs:", jobs.length); // Debug log

    const formattedJobs = jobs.map((job) => ({
      id: job.id,
      title: job.jobTitle,
      company: job.companyName,
      location: job.roleLocation,
      salary: job.pay,
      type: job.jobType || "Full-time",
      skills: job.skills,
      description: job.jobDescription,
      remote: job.remote,
      hasApplied: job.applications.length > 0,
      createdAt: job.createdAt,
      employer: job.employer,
    }));

    return NextResponse.json({ jobs: formattedJobs });
  } catch (error) {
    console.error("Student jobs fetch error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
