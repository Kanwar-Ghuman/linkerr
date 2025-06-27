import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prisma = new PrismaClient();

const CAREER_COUNSELOR_PROMPT = `You are LinkerrAI, a friendly and supportive AI career counselor specifically designed for high school students. Your goal is to help them explore careers, make educational decisions, and build confidence for their future.

Key Guidelines:
- Be encouraging and supportive - many students feel overwhelmed about their future
- Use age-appropriate language and examples they can relate to
- Focus on exploration rather than definitive answers
- Acknowledge that it's normal to not know what you want to do yet
- Provide practical, actionable advice for high schoolers
- Be enthusiastic about different career paths and educational options

Core Areas of Expertise:
1. Career Exploration: Help students discover careers based on interests, values, and strengths
2. Education Pathways: Guide on college vs. trade school vs. gap year decisions
3. Experience Building: Suggest ways to gain experience while in high school
4. Interview Preparation: Coach through interview anxiety and first-job nerves
5. Job Opportunities: Answer questions about specific jobs available on the platform

IMPORTANT: You now have access to real job listings from the Linkerr platform. When students ask about jobs, internships, or specific opportunities, you can reference these actual positions. Always mention that these are real opportunities they can apply for on Linkerr.

Always end responses with a follow-up question to keep the conversation going and show genuine interest in helping them.`;

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message, conversationHistory } = await request.json();

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message cannot be empty" },
        { status: 400 }
      );
    }

    try {
      // Fetch available jobs from database
      const jobs = await prisma.job.findMany({
        where: {
          status: "APPROVED",
        },
        select: {
          id: true,
          jobTitle: true,
          jobDescription: true,
          jobType: true,
          roleLocation: true,
          companyName: true,
          remote: true,
          skills: true,
          pay: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 20, // Limit to most recent 20 jobs to avoid token limits
      });

      // Format jobs for AI context
      const jobsContext =
        jobs.length > 0
          ? `

AVAILABLE JOB OPPORTUNITIES ON LINKERR:
${jobs
  .map(
    (job, index) => `
${index + 1}. ${job.jobTitle} at ${job.companyName}
   - Location: ${job.roleLocation} (${job.remote})
   - Type: ${job.jobType || "Not specified"}
   - Salary: $${job.pay.toLocaleString()}
   - Skills: ${job.skills.join(", ")}
   - Description: ${job.jobDescription.substring(0, 200)}${
      job.jobDescription.length > 200 ? "..." : ""
    }
   - Posted: ${new Date(job.createdAt).toLocaleDateString()}
`
  )
  .join("")}

When referencing these jobs, remind students they can apply directly through the Linkerr platform. You can help them understand if they're qualified, what skills they might need to develop, or how these roles could fit into their career path.`
          : `

Currently, there are no approved job listings available on the platform, but I can still help with career exploration, education planning, and skill development!`;

      const messages = [
        {
          role: "system" as const,
          content: CAREER_COUNSELOR_PROMPT + jobsContext,
        },
        ...(conversationHistory || []),
        {
          role: "user" as const,
          content: message,
        },
      ];

      const completion = await openai.chat.completions.create({
        messages,
        model: "gpt-4o-mini",
        max_tokens: 1000,
        temperature: 0.7,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        return NextResponse.json(
          { error: "No response generated" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        response: content,
        timestamp: new Date().toISOString(),
        jobsCount: jobs.length,
      });
    } catch (openaiError) {
      console.error("OpenAI API error:", openaiError);

      if (
        openaiError &&
        typeof openaiError === "object" &&
        "status" in openaiError &&
        openaiError.status === 429
      ) {
        return NextResponse.json(
          {
            error:
              "I'm getting a lot of questions right now! Please try again in a few minutes.",
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          error: `Sorry, I'm having trouble right now. Please try again later.`,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
