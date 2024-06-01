import "@tanstack/react-query";
import { AxiosError } from "axios";
import { TError } from "./services/api.type";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<TError>;
  }
}
