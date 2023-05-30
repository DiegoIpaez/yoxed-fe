import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { handleHttpError, handleServerError } from "@/utils";

export async function GET() {
  try {
    const users = await prisma.comments.findMany();
    return NextResponse.json({ data: users });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { yoxId, userId, description } = await request.json();
    if (!yoxId || !userId || !description) {
      return handleHttpError("bad credentials", 400);
    }
    const newComment = await prisma.comments.create({
      data: {
        description,
        yoxId,
        userId,
      },
    });
    return NextResponse.json({ data: { comment: newComment } });
  } catch (error) {
    return handleServerError(error);
  }
}
