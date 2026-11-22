import { NextResponse } from "next/server";

const eventsStore: any[] = [];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get("studentId");
  let results = eventsStore;
  if (studentId) {
    results = results.filter(e => e.studentId === studentId);
  }
  return NextResponse.json(results);
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    eventsStore.push(payload);
    if (eventsStore.length > 500) eventsStore.shift();
    return NextResponse.json({ success: true, count: eventsStore.length });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
