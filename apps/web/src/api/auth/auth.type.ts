export enum ERole {
  ADMIN = "admin",
  CUSTOMER = "customer",
}

export type TLoginParams = {
  email: string;
  password: string;
};

export type TRegisterParams = {
  email: string;
  name: string;
  password: string;
  role?: ERole;
};

export type TVerifyEmail = {
  otp: string;
  email: string;
};

export type TTokens = {
  accessToken: string;
  refreshToken: string;
};

export type TUser = {
  id: string;
  email: string;
  isVerified: boolean;
  name: string;
  otp: string;
  otpExpiryTime: string;
  refreshToken: string;
  role: string;
  enable2FA: boolean;
  twoFactorAuthenticationSecret: string;
};

export type TLoginResponse = {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: TUser;
};
