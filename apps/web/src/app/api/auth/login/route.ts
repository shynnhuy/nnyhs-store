import { AuthAPI } from "@/services";
import { config } from "@/utils/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
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

    revalidatePath("/");
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.log("error", error);
    return NextResponse.json(error.response.data.errorResponse, {
      status: error.response.status,
    });
  }
}
