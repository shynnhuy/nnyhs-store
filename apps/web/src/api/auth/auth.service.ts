import { APIService, TAuthResponse } from "..";
import {
  TLoginParams,
  TRegisterParams,
  TUser,
  TVerifyEmail,
} from "./auth.type";

export const AuthAPI = {
  login: async (loginParams: TLoginParams) => {
    const res = await APIService.post<TUser>("/auth/login", loginParams);
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
  refreshToken: async () => {
    return APIService.get<TAuthResponse>("/auth/refresh");
  },
  logout: async () => {
    return APIService.delete("/logout");
  },
};

export const requestRefresh = async () => {
  const { data } = await AuthAPI.refreshToken();
  return {
    accessToken: data.result?.accessToken,
    refreshToken: data.result?.refreshToken,
  };
};
