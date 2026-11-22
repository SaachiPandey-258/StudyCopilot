import { NextResponse } from "next/server";
import { BENCHMARK_QUESTIONS, EVALUATION_METRICS } from "@/lib/benchmarkData";

export async function GET() {
  return NextResponse.json({
    metrics: EVALUATION_METRICS,
    questions: BENCHMARK_QUESTIONS
  });
}
