import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PRESET_LECTURES } from "@/lib/presetLectures";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lectureId = "zjkBMFhNj_g" } = body;

    const userApiKey = req.headers.get("x-gemini-api-key")?.trim();
    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

    const activeLecture = PRESET_LECTURES.find((p) => p.id === lectureId) || PRESET_LECTURES[0];

    // If API key is provided and user requested live generation
    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const candidateModels = [
          "gemini-1.5-flash-latest",
          "gemini-1.5-flash",
          "gemini-2.0-flash",
          "gemini-1.5-flash-001",
          "gemini-1.5-flash-002",
          "gemini-1.5-pro-latest",
          "gemini-pro"
        ];

        const systemInstruction = `You are an academic curriculum designer. Given a lecture transcript, generate a structured revision guide containing:
1. Executive Summary (1 paragraph)
2. Core Principles (3-4 bullet points)
3. Key Definitions with exact [MM:SS] timestamps
4. Quick Quiz with questions and answers with timestamps.
Output valid JSON only with keys: executiveSummary, corePrinciples, keyDefinitions, quickQuiz.`;

        const prompt = `LECTURE: ${activeLecture.title} by ${activeLecture.channel}
TRANSCRIPT:
${activeLecture.transcriptSegments.map(s => `[${s.start}s] ${s.text}`).join("\n")}

Generate the revision guide JSON.`;

        let rawText = "";
        for (const modelName of candidateModels) {
          try {
            const model = genAI.getGenerativeModel({
              model: modelName,
              systemInstruction,
            });
            const result = await model.generateContent(prompt);
            rawText = result.response.text();
            if (rawText) break;
          } catch (mErr: any) {
            if (mErr?.message?.includes("404") || mErr?.message?.includes("not found")) {
              continue;
            }
            throw mErr;
          }
        }

        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return NextResponse.json({
            guide: parsed,
            source: "live_gemini",
            lectureId: activeLecture.id
          });
        }
      } catch (e) {
        console.warn("Live notes generation failed, falling back to preset:", e);
      }
    }

    // Return the verified preset revision guide
    return NextResponse.json({
      guide: activeLecture.revisionGuide,
      source: "cached_example",
      badge: "Real Gemini Output (Verified Artifact)",
      lectureId: activeLecture.id
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to load revision notes" }, { status: 500 });
  }
}
