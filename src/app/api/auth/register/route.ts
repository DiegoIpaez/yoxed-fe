import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { handleServerError } from "@/utils";
import { USER_HTTP_ERRORS } from "@/constants";

export const POST = async (request: NextRequest) => {
  try {
    const { INVALID_CREDENTIALS, USER_ALREADY_EXISTS, USER_NOT_FOUND } =
      USER_HTTP_ERRORS;

    const { email, password, username } = await request.json();

    if (!email || !password || !username) {
      return NextResponse.json(INVALID_CREDENTIALS.message, {
        status: INVALID_CREDENTIALS.code,
      });
    }
    const isExist = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (isExist)
      return NextResponse.json(USER_ALREADY_EXISTS.message, { status: 400 });

    const newUser = await prisma.users.create({
      data: {
        email,
        username,
      },
    });
    return NextResponse.json({ data: { user: newUser } }, { status: 200 });
  } catch (error) {
    return handleServerError(error);
  }
};
