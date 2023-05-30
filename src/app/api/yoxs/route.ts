import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { handleHttpError, handleServerError } from "@/utils";

export async function GET() {
  try {
    const users = await prisma.yoxs.findMany({
      include: {
        category: true,
        comments: true,
        user: { select: { id: true, email: true, uid: true } },
      },
    });
    return NextResponse.json({ data: users });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, fileUrl, description, categoryId, userId } =
      await request.json();
    if (!title || !description || !fileUrl || !categoryId || !userId) {
      return handleHttpError("bad credentials", 400);
    }
    const newComment = await prisma.yoxs.create({
      data: {
        title,
        fileUrl,
        description,
        categoryId,
        userId,
      },
    });
    return NextResponse.json({ data: { yox: newComment } });
  } catch (error) {
    return handleServerError(error);
  }
}
