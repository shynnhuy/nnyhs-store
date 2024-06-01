"use client";
import { useRefreshTokenMutation } from "@/mutations/auth";
import { useStore } from "@/store";
import { notification } from "antd";
import { differenceInMinutes } from "date-fns";
import { decodeJwt } from "jose";
import { useEffect, useMemo } from "react";

const RefreshTokenJob = () => {
  const { tokens, setTokens } = useStore();
  const decoded = useMemo(
    () => (tokens?.accessToken ? decodeJwt(tokens.accessToken) : null),
    [tokens]
  );

  const { mutate } = useRefreshTokenMutation({
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
        console.log("REFERSH TOKEN: --", differenceInMinutes(exp, now) <= 15);
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
