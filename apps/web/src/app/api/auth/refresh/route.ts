import { TTokens } from "@/services";
import { config } from "@/utils/config";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const tokens: TTokens = await request.json();

    cookies().set("Authentication", tokens.accessToken, {
      httpOnly: true,
      maxAge: Number(config.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
      path: "/",
      sameSite: "strict",
    });
    cookies().set("Refresh", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(config.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
      path: "/",
      sameSite: "strict",
    });

    revalidatePath("/");
    return NextResponse.json(tokens, { status: 200 });
  } catch (error: any) {
    console.log("error", error);
    return NextResponse.json(error.response.data.errorResponse, {
      status: error.response.status,
    });
  }
}
