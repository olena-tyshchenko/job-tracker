import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const jobs = await prisma.job.findMany();

  return NextResponse.json(jobs);
}
