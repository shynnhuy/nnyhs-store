import { AuthAPI } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () =>
  useMutation({
    mutationFn: AuthAPI.auth,
  });
