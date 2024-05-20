import { AuthAPI } from "@/api";
import { config } from "@/utils/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { data } = await AuthAPI.login(body);

  cookies().set("Authentication", data.result.tokens.accessToken, {
    httpOnly: true,
    maxAge: Number(config.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
    path: "/",
    sameSite: "strict",
  });
  cookies().set("Refresh", data.result.tokens.refreshToken, {
    httpOnly: true,
    maxAge: Number(config.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
    path: "/",
    sameSite: "strict",
  });

  return NextResponse.json(data, { status: 200 });
}
