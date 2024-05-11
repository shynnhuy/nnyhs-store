import { AuthAPI, TLoginParams } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (loginParams: TLoginParams) => {
      const res = await AuthAPI.login(loginParams);
      return res;
    },
  });
};
