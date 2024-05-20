/* eslint-disable turbo/no-undeclared-env-vars */
export const config = {
  BASE_URL: process.env["BASE_URL"] || "http://localhost:3100/api/v1",
  JWT_ACCESS_TOKEN_SECRET: process.env["NEXT_PUBLIC_JWT_ACCESS_TOKEN_SECRET"],
  JWT_ACCESS_TOKEN_EXPIRATION_TIME:
    process.env["NEXT_PUBLIC_JWT_ACCESS_TOKEN_EXPIRATION_TIME"] || "60 * 15",
  JWT_REFRESH_TOKEN_SECRET: process.env["NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET"],
  JWT_REFRESH_TOKEN_EXPIRATION_TIME:
    process.env["NEXT_PUBLIC_JWT_REFRESH_TOKEN_EXPIRATION_TIME"] ||
    "60 * 60 * 7",
};
