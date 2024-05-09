import { APIService, TLoginParams } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (loginParams: TLoginParams) => {
      const res = await APIService.post("/auth/login", loginParams);
      return res.data;
    },
  });
};
