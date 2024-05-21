"use server";

import { SessionData, defaultSession, sessionOptions } from "@/lib/";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ADD THE LOGOUT FUNCTION
export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect("/");
}

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
}

export async function login(formData: FormData) {
  const session = await getSession();

  const formUsername = formData.get("username") as string;
  const _ = formData.get("password") as string;

  const user = {
    id: "1",
    username: formUsername,
    img: "avatar.png",
  };

  if (!user) {
    return { error: "Wrong Credentials!" };
  }

  session.isLoggedIn = true;
  session.userId = user.id;
  session.userName = user.username;

  await session.save();
  redirect("/");
}
