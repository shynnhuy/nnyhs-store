import axios from "axios";
import { APIService } from "..";
import { TResponse } from "../api.type";
import {
  TLoginParams,
  TLoginResponse,
  TRegisterParams,
  TTokens,
  TVerifyEmail,
} from "./auth.type";

export const AuthAPI = {
  auth: async (loginParams: TLoginParams) => {
    const res = await axios.post<TResponse<TLoginResponse>>(
      "/api/auth/login",
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
    axios.post("/api/auth/refresh", params),
  logout: async () => {
    return axios.post("/api/auth/logout");
  },
};
