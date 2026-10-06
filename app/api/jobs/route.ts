import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const jobs = await prisma.job.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(jobs);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newJob = await prisma.job.create({
    data: {
      position: body.position,
      company: body.company,
      status: body.status || "Saved",
    },
  });

  return NextResponse.json(newJob);
}
