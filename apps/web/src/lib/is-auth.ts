import { cookies } from "next/headers";

export default function isAuth(): boolean {
  // Attempt to retrieve the auth cookie from the cookie store
  const cookieStore = cookies();
  const authCookie = cookieStore.get("Authentication");

  // If no auth cookie is found, log the event and return false
  if (!authCookie) {
    console.log("Auth cookie not found");
    return false;
  }

  return true;
}
