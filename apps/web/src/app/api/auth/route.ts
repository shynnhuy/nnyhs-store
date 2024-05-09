import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  cookies().set("token", body);
  return Response.json(body, {
    status: 200,
    // headers: {
    //   "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax; Secure`,
    // },
  });
}
