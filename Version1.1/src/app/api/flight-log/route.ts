import { NextResponse } from "next/server";

const flightLogsStore: any[] = [];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get("studentId");
  let results = flightLogsStore;
  if (studentId) {
    results = results.filter(l => l.studentId === studentId);
  }
  return NextResponse.json(results);
}

export async function POST(request: Request) {
  try {
    const record = await request.json();
    flightLogsStore.unshift(record);
    if (flightLogsStore.length > 200) flightLogsStore.pop();
    return NextResponse.json({ success: true, record });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
