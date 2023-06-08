import { NextRequest, NextResponse } from "next/server";
import { validJWT } from "@/utils";

const middleware = async (request: NextRequest) => {
  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Max-Age", "86400");

  const tokenlessRoute = request.nextUrl.pathname.startsWith("/api/auth");

  console.log("--- Middleware ---");
  console.log(`${request.method} - ${request.url}`);

  if (tokenlessRoute) return response;
  const validToken = await validJWT(response, request);
  return validToken;
};

export const config = {
  matcher: "/api/:path*",
};

export default middleware;
