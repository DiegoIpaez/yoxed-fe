import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { handleServerError } from "@/utils";

export const GET = async () => {
  try {
    const users = await prisma.users.findMany();
    return NextResponse.json({ data: users }, { status: 200 });
  } catch (error) {
    return handleServerError(error);
  }
};
