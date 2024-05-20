import { TLoginParams } from "@/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (loginParams: TLoginParams) => {
      const res = await axios.post("/api/auth/login", loginParams);
      return res;
    },
  });
};
