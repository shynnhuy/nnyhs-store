import { APIService, NextService } from "..";
import { TResponse } from "../api.type";
import {
  TLoginParams,
  TLoginResponse,
  TRegisterParams,
  TTokens,
  TUser,
  TVerifyEmail,
} from "./auth.type";

export const AuthAPI = {
  getMe: async () => {
    const res = await APIService.get<TUser>("/users/me");
    return res;
  },
  auth: async (loginParams: TLoginParams) => {
    const res = await NextService.post<TResponse<TLoginResponse>>(
      "/auth/login",
      loginParams
    );
    return res;
  },
  login: async (loginParams: TLoginParams) => {
    const res = await APIService.post<TLoginResponse>(
      "/auth/login",
      loginParams
    );
    return res;
  },
  register: async (registerParams: TRegisterParams) => {
    return APIService.post("/auth/register", registerParams);
  },
  verifyEmail: async (verifyParams: TVerifyEmail) => {
    return APIService.get(
      `/auth/verify-email/${verifyParams.otp}/${verifyParams.email}`
    );
  },
  resendOTP: async () => {},
  refreshToken: async () => APIService.get<TTokens>("/auth/refresh"),
  refreshClientToken: async (params: TTokens) =>
    NextService.post("/auth/refresh", params),
  logout: async () => {
    return NextService.post("/auth/logout");
  },
};
