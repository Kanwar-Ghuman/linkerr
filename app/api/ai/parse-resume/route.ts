/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function truncateText(text: string): string {
  // Split into sections and keep important parts
  const sections = text.split(/\n\s*\n/);
  const importantSections = sections.filter((section) =>
    /experience|education|skills|projects/i.test(section)
  );

  // Join sections and limit to ~4000 chars (~1000 tokens)
  return importantSections.join("\n\n").slice(0, 4000);
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { resumeUrl } = await request.json();
    const resumeResponse = await fetch(resumeUrl);
    const fullResumeText = await resumeResponse.text();

    // Process and truncate text
    const processedText = truncateText(fullResumeText);

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Analyze this resume excerpt and provide feedback in this JSON format:
          {
            "currentScore": number,
            "suggestions": {
              "content": [
                { "title": "string", "description": "string", "improvement": "string" }
              ],
              "format": [
                { "title": "string", "description": "string", "improvement": "string" }
              ],
              "skills": [
                { "title": "string", "description": "string", "improvement": "string" }
              ]
            },
            "strongPoints": ["string"],
            "keywordsMissing": ["string"]
          }`,
        },
        {
          role: "user",
          content: processedText,
        },
      ],
      model: "gpt-4",
      max_tokens: 1000,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "No analysis generated" },
        { status: 500 }
      );
    }

    const analysis = JSON.parse(content.trim());
    return NextResponse.json({ analysis });
  } catch (error: any) {
    if (error?.status === 429) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please try again in a few minutes.",
        },
        { status: 429 }
      );
    }

    console.error("Resume analysis error:", error);
    return NextResponse.json(
      {
        error: "Failed to analyze resume",
      },
      { status: 500 }
    );
  }
}
