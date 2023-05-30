import { NextResponse } from "next/server";
import { getHttpStatusMessage } from "./getHttpStatusMsg.util";

export const handleHttpError = (
  description: string,
  statusCode = 500,
) => {
  const message = getHttpStatusMessage(statusCode);
  return NextResponse.json(
    {
      error: {
        message,
        description,
      },
    },
    {
      status: statusCode,
    }
  );
};

export const handleServerError = (error: Error | any) => {
  const description = error instanceof Error ? error.message : "";
  return NextResponse.json(
    {
      error: {
        message: "Internal server error",
        description,
      },
    },
    {
      status: 500,
    }
  );
};
