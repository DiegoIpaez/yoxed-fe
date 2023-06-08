import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { handleServerError } from "@/utils";
import { USER_HTTP_ERRORS } from "@/constants";

export const POST = async (request: NextRequest) => {
  try {
    const { INVALID_CREDENTIALS, USER_ALREADY_EXISTS } = USER_HTTP_ERRORS;
    const { uid } = await request.json();
    if (!uid) throw new Error(INVALID_CREDENTIALS.message);
    const user = await prisma.users.findFirst({
      where: {
        uid,
      },
    });
    if (!user) throw new Error(USER_ALREADY_EXISTS.message);
    return NextResponse.json({ isValid: true, message: '' }, { status: 200 });
  } catch (error) {
    const msgError = error instanceof Error && error.message
    return NextResponse.json({ isValid: false, message: msgError }, { status: 200 });
  }
};
