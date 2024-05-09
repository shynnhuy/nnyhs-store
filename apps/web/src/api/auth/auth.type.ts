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

export type TAuthResponse = {
  accessToken: string;
  refreshToken: string;
};
