import { SessionOptions } from "iron-session";

export interface SessionData {
  userId?: string;
  userName?: string;
  img?: string;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  // You need to create a secret key at least 32 characters long.
  password: "Aya/ph1OVAg8ju+PmgJgcWNYuCh5u9jCPAoKhggD4CQ="!,
  cookieName: "test-session",
  cookieOptions: {
    httpOnly: true,
    // Secure only works in `https` environments. So if the environment is `https`, it'll return true.
    secure: process.env.NODE_ENV === "production",
  },
};
