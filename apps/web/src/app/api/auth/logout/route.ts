import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_: NextRequest) {
  cookies().set("Authentication", "", {
    maxAge: 0,
    httpOnly: true,
    path: "/",
    sameSite: "strict",
  });
  cookies().set("Refresh", "", {
    maxAge: 0,
    httpOnly: true,
    path: "/",
    sameSite: "strict",
  });
  return NextResponse.json({ status: 201 });
}
