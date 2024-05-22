"use client";
import { useStore } from "@/store";
import { useEffect, useMemo } from "react";
import { decodeJwt } from "jose";
import { differenceInMinutes } from "date-fns";
import { AuthAPI } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";

const RefreshTokenJob = () => {
  const { tokens, setTokens } = useStore();
  const decoded = useMemo(
    () => (tokens?.accessToken ? decodeJwt(tokens.accessToken) : null),
    [tokens]
  );

  const { mutate } = useMutation({
    mutationFn: async () => {
      const { data } = await AuthAPI.refreshToken();
      await AuthAPI.refreshClientToken(data.result);
      return data.result;
    },
    onSuccess: (data) => {
      setTokens(data);
      notification.success({
        message: "Token refreshed",
      });
    },
  });

  useEffect(() => {
    if (!decoded) return;
    const interval = setInterval(
      async () => {
        const now = new Date();
        const exp = decoded.exp ? new Date(decoded.exp * 1000) : new Date();
        if (differenceInMinutes(exp, now) <= 15) {
          mutate();
        }
      },
      1000 * 60 * 10 // 10 minutes
    );

    return () => clearInterval(interval);
  }, [decoded, mutate]);

  return null;
};

export default RefreshTokenJob;
