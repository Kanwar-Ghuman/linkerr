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

    // Add fetch error handling
    let resumeResponse;
    try {
      resumeResponse = await fetch(resumeUrl);
      if (!resumeResponse.ok) {
        throw new Error(`Failed to fetch resume: ${resumeResponse.status}`);
      }
    } catch (fetchError) {
      console.error("Resume fetch error:", fetchError);
      return NextResponse.json(
        { error: "Failed to retrieve resume. Check the URL and try again." },
        { status: 400 }
      );
    }

    const fullResumeText = await resumeResponse.text();
    if (!fullResumeText || fullResumeText.length < 50) {
      return NextResponse.json(
        { error: "Resume content too short or empty" },
        { status: 400 }
      );
    }

    // Process and truncate text
    const processedText = truncateText(fullResumeText);
    console.log(
      `Original text length: ${fullResumeText.length}, Processed length: ${processedText.length}`
    );

    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `Analyze this resume excerpt and provide feedback in this JSON format:
            {
              "currentScore": number between 0-100 representing overall resume quality percentage,
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
            }
            
            For currentScore, provide a whole number between 0-100 representing how strong the resume is.`,
          },
          {
            role: "user",
            content: processedText,
          },
        ],
        model: "gpt-4o", // Try using 3.5-turbo if gpt-4 has issues
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

      // Add try/catch specifically for JSON parsing
      try {
        const rawAnalysis = JSON.parse(content.trim());

        // Ensure currentScore is a clean 0-100 value
        const normalizedAnalysis = {
          ...rawAnalysis,
          currentScore: Math.min(
            100,
            Math.max(0, Math.round(rawAnalysis.currentScore || 50))
          ),
        };

        return NextResponse.json({ analysis: normalizedAnalysis });
      } catch (jsonError) {
        console.error("JSON parsing error:", jsonError);
        console.log("Raw content:", content);
        return NextResponse.json(
          { error: "Failed to parse AI response" },
          { status: 500 }
        );
      }
    } catch (openaiError: any) {
      console.error("OpenAI API error:", openaiError);

      if (openaiError?.status === 429) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again in a few minutes." },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          error: `OpenAI API error: ${openaiError?.message || "Unknown error"}`,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
