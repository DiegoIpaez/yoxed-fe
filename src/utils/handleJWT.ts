import jwt, { type JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { handleHttpError } from "./handleHttpError.util";

interface NextRequestCustom extends NextRequest {
  user?: string;
}
interface JwtPayloadExt extends JwtPayload {
  uid?: string;
}

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? "xd";

const generateToken = (uid: string): string => {
  const options = { expiresIn: "2h" };
  const token = jwt.sign({ uid }, JWT_SECRET_KEY, options);
  return token;
};

const validToken = async (token: string) => {
  try {
    const jwtData: JwtPayloadExt | string = jwt.verify(token, JWT_SECRET_KEY);
    const uid = typeof jwtData !== "string" && jwtData.uid;
    if (!uid) throw new Error("Invalid user.");

    const res = await fetch("http://localhost:3000/api/auth/valid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid }),
    });
    const data = await res.json();
    if (!data?.isValid) return handleHttpError("Invalid User", 401);

    return uid;
  } catch (error) {
    throw new Error(
      `Authentication failed! Invalid token. Error: ${error as string}`
    );
  }
};

const validJWT = async (response: NextResponse, request: NextRequestCustom) => {
  try {
    const token = request.headers.get("Authorization");
    if (!token) return handleHttpError("Authentication failed! Token required.", 401);
    const isValid = await validToken(token);
    const uid = isValid instanceof NextResponse ? '' : isValid;
    request.user = uid;
    response.headers.set("Access-Control-Expose-Headers", "Token-Refresh");
    response.headers.set("Token-Refresh", generateToken(uid));
    return response;
  } catch (err: Error | unknown) {
    console.log(err);
    const msgError = err instanceof Error ? err.message : 'Authentication failed!.'
    return handleHttpError(msgError, 401);
  }
};

export { generateToken, validToken, validJWT };
