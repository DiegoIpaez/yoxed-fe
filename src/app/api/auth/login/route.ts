import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { generateToken, handleServerError } from "@/utils";
import { USER_HTTP_ERRORS } from "@/constants";

export const POST = async (request: NextRequest) => {
  try {
    const { INVALID_CREDENTIALS, USER_ALREADY_EXISTS, USER_NOT_FOUND } =
      USER_HTTP_ERRORS;

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(INVALID_CREDENTIALS.message, {
        status: INVALID_CREDENTIALS.code,
      });
    }
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return NextResponse.json(USER_ALREADY_EXISTS.message, { status: 400 });
    }
    const token = generateToken(user?.uid);
    return NextResponse.json({ data: { user, token } }, { status: 200 });
  } catch (error) {
    return handleServerError(error);
  }
};
