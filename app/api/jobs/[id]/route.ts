import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const body = await request.json();

  const updatedJob = await prisma.job.update({
    where: {
      id: Number(id),
    },
    data: {
      status: body.status,
    },
  });

  return NextResponse.json(updatedJob);
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  await prisma.job.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({ success: true });
}
