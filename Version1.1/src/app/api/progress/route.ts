import { NextResponse } from "next/server";

// Memoria volátil para progreso de alumnos en Next.js
const progressStore: { [studentId: string]: any } = {};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get("studentId") || "default";
  const data = progressStore[studentId] || { studentId, currentPhase: "M", phaseData: {} };
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const studentId = body.studentId || "default";
    progressStore[studentId] = body.state || body;
    return NextResponse.json({ success: true, message: "Progreso guardado correctamente" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
