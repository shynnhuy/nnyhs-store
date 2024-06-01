"use client";
import { notification } from "antd";
import React, {
  FC,
  Fragment,
  PropsWithChildren,
  memo,
  useEffect,
  useMemo,
} from "react";
import RefreshTokenJob from "@/components/RefreshTokenJob";
import { AuthPopup } from "@/components/auth/popup";

import RouteLoader from "@/components/route-loader";
import { AuthAPI, TTokens } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store";
import { decodeJwt } from "jose";
import { useRefreshTokenMutation } from "@/mutations/auth";
import { differenceInMinutes } from "date-fns";
import { useToast } from "@ui/components";

type Props = {
  initialTokens?: TTokens;
};

const AppProvider: FC<PropsWithChildren<Props>> = ({
  children,
  initialTokens,
}) => {
  const { toast } = useToast();
  const { user, loggedIn, setTokens } = useStore();

  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: AuthAPI.getMe,
    enabled:
      useStore.persist.hasHydrated() &&
      !user &&
      !!initialTokens?.accessToken &&
      !!initialTokens?.refreshToken,
  });

  const { mutate: refreshToken } = useRefreshTokenMutation({
    onSuccess: (data) => {
      setTokens(data);
      toast({
        description: "Token refreshed",
      });
    },
  });

  useEffect(() => {
    if (!initialTokens?.accessToken || !initialTokens?.refreshToken) return;

    const decoded = decodeJwt(initialTokens.accessToken);

    const now = new Date();
    const exp = decoded.exp ? new Date(decoded.exp * 1000) : new Date();

    if (differenceInMinutes(exp, now) <= 5) {
      refreshToken();
    }
  }, [initialTokens]);

  useEffect(() => {
    if (initialTokens) {
      setTokens(initialTokens);
    }
  }, [initialTokens]);

  useEffect(() => {
    if (data) loggedIn({ user: data.data.result });
  }, [data, loggedIn]);

  return (
    <Fragment>
      {children}
      <RouteLoader />
      <AuthPopup />
      <RefreshTokenJob />
    </Fragment>
  );
};

export default memo(AppProvider);
