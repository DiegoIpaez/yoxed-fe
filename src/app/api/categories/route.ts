import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { handleHttpError, handleServerError } from "@/utils";

export async function GET() {
  try {
    const categories = await prisma.categories.findMany({
      include: { user: true, yoxs: true },
    });
    return NextResponse.json({ data: categories });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, userId } = await request.json();
    if (!name || !userId) {
      return handleHttpError("bad credentials", 400);
    }
    const newCategory = await prisma.categories.create({
      data: {
        name,
        userId,
      },
    });
    return NextResponse.json({ data: { category: newCategory } });
  } catch (error) {
    return handleServerError(error);
  }
}
