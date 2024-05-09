import "@tanstack/react-query";
import { AxiosError } from "axios";
import { TError } from "./api/api.type";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<TError>;
  }
}
