/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Building2, MapPin } from "lucide-react";

interface Job {
  id: string;
  jobTitle: string;
  companyName: string;
  roleLocation: string;
  remote: string;
  pay: string;
  skills: string[];
  matchPercentage: number;
}

interface Suggestion {
  title: string;
  description: string;
  improvement: string;
}

interface ResumeAnalysis {
  currentScore: number;
  suggestions: {
    content: Suggestion[];
    format: Suggestion[];
    skills: Suggestion[];
  };
  strongPoints: string[];
  keywordsMissing: string[];
}

export default function ReviewsPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const response = await fetch("/api/ai/parse-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeUrl: url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to parse resume");
      }

      if (!data.analysis) {
        throw new Error("Invalid response format");
      }

      setAnalysis(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze resume");
      console.error("Resume parsing error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          LinkerrAI Resume Analyzer
        </h1>
        <p className="text-gray-600">
          Get personalized suggestions to improve your resume
        </p>
      </div>

      {/* Upload Section */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <Input
            type="url"
            placeholder="Enter resume URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
            required
          />
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Analyze Resume
          </Button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      {/* Results Section */}
      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Analyzing your resume...</p>
        </div>
      ) : analysis ? (
        <div className="space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-blue-100">
              <span className="text-3xl font-bold text-blue-600">
                {analysis.currentScore}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(analysis.suggestions).map(
              ([category, suggestions]) => (
                <Card key={category} className="p-6">
                  <h3 className="text-lg font-semibold capitalize mb-4">
                    {category}
                  </h3>
                  <div className="space-y-4">
                    {suggestions.map((suggestion, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="font-medium text-blue-600">
                          {suggestion.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {suggestion.description}
                        </p>
                        <p className="text-sm text-green-600">
                          {suggestion.improvement}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              )
            )}
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Strong Points</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.strongPoints.map((point, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm"
                >
                  {point}
                </span>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Missing Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.keywordsMissing.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </Card>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-600">{error}</div>
      ) : null}
    </div>
  );
}
