"use client";
import RefreshTokenJob from "@/components/RefreshTokenJob";
import { AuthPopup } from "@/components/auth/popup";
import {
  FC,
  Fragment,
  PropsWithChildren,
  memo,
  useEffect,
  useMemo,
} from "react";

import RouteLoader from "@/components/route-loader";
import { useRefreshTokenMutation } from "@/mutations/auth";
import { AuthAPI, TTokens } from "@/services";
import { useStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@ui/components";
import { differenceInMinutes } from "date-fns";
import { decodeJwt } from "jose";
import { ToastContainer, ToastContainerProps } from "react-toastify";

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
      useStore.persist?.hasHydrated() &&
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
  }, [initialTokens, refreshToken]);

  useEffect(() => {
    if (initialTokens) {
      setTokens(initialTokens);
    }
  }, [initialTokens, setTokens]);

  useEffect(() => {
    if (data) loggedIn({ user: data.data.result });
  }, [data, loggedIn]);

  const toastConfig = useMemo<ToastContainerProps>(
    () => ({
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }),
    []
  );

  return (
    <Fragment>
      {children}
      <RouteLoader />
      <AuthPopup />
      <RefreshTokenJob />
      <ToastContainer {...toastConfig} />
    </Fragment>
  );
};

export default memo(AppProvider);
