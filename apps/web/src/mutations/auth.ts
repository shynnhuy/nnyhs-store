import { AuthAPI, TTokens } from "@/services";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const useLoginMutation = () =>
  useMutation({
    mutationFn: AuthAPI.auth,
  });

export const useRefreshTokenMutation = (
  options?: UseMutationOptions<TTokens>
) =>
  useMutation({
    mutationFn: async () => {
      const { data } = await AuthAPI.refreshToken();
      await AuthAPI.refreshClientToken(data.result);
      return data.result;
    },
    ...options,
  });
