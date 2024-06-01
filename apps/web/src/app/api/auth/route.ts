import { TUser } from "@/services";
import { TResponse } from "@/services/api.type";
import { AxiosResponse } from "axios";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const response: AxiosResponse<
    TResponse<TUser>,
    string
  > = await request.json();
  const _cookies = cookies().getAll();
  console.log("_cookies", _cookies);
  // cookies().set("token", response);
  return Response.json(response, {
    status: 200,
    // headers: {
    //   "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax; Secure`,
    // },
  });
}
