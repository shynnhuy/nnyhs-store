import { TLoginParams } from "@/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { redirect } from "next/navigation";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (loginParams: TLoginParams) => {
      const res = await axios.post("/api/auth/login", loginParams);
      return res;
    },
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/auth/logout");
      return res;
    },
    onSuccess: () => {
      console.log("HELLO");
      redirect("/");
    },
  });
};
