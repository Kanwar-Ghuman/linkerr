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
- Format responses using PLAIN TEXT only - NO markdown, asterisks, or special formatting
- Use simple numbered lists and clear line breaks for readability
- Keep responses conversational and natural

Core Areas of Expertise:
1. Career Exploration: Help students discover careers based on interests, values, and strengths
2. Education Pathways: Guide on college vs. trade school vs. gap year decisions
3. Experience Building: Suggest ways to gain experience while in high school
4. Interview Preparation: Coach through interview anxiety and first-job nerves
5. Job Opportunities: Answer questions about specific jobs available on the platform

IMPORTANT FORMATTING RULES:
- Never use asterisks (*) for bold text
- Never use underscores (_) for emphasis
- Never use markdown formatting
- Use CAPS for emphasis sparingly
- Use simple line breaks and numbered lists
- Keep job listings clean and easy to read

IMPORTANT: You now have access to real job listings from the Linkerr platform. When students ask about jobs, internships, or specific opportunities, you can reference these actual positions. Some jobs may be pending approval, but they represent real opportunities that will be available soon. Always mention that students can apply through the Linkerr platform.

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
      // Fetch available jobs from database (including PENDING for now)
      const jobs = await prisma.job.findMany({
        where: {
          status: {
            in: ["APPROVED", "PENDING"],
          },
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
          status: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 20,
      });

      // Format jobs for AI context with clean formatting
      const jobsContext =
        jobs.length > 0
          ? `

AVAILABLE JOB OPPORTUNITIES ON LINKERR:
${jobs
  .map(
    (job, index) => `
${index + 1}. ${job.jobTitle} at ${job.companyName}
   Location: ${job.roleLocation} (${job.remote})
   Type: ${job.jobType || "Not specified"}
   Salary: $${job.pay.toLocaleString()}/hour
   Skills: ${job.skills.join(", ")}
   Description: ${job.jobDescription.substring(0, 200)}${
      job.jobDescription.length > 200 ? "..." : ""
    }
   Posted: ${new Date(job.createdAt).toLocaleDateString()}
   Status: ${job.status === "PENDING" ? "Pending approval" : "Ready to apply"}
`
  )
  .join("")}

When referencing these jobs, use clean formatting without asterisks or markdown. List job details clearly using simple text and line breaks. Always remind students they can apply through the Linkerr platform.`
          : `

Currently, there are no job listings available on the platform, but I can still help with career exploration, education planning, and skill development!`;

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
