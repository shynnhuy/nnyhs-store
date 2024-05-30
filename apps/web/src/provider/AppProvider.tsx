"use client";
import { notification } from "antd";
import React, { FC, Fragment, PropsWithChildren, useEffect } from "react";
import RefreshTokenJob from "@/components/RefreshTokenJob";
import { AuthPopup } from "@/components/auth/popup";

import RouteLoader from "@/components/route-loader";
import { AuthAPI, TTokens } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store";

notification.config({
  placement: "bottomRight",
});

type Props = {
  initialTokens?: TTokens;
};

const AppProvider: FC<PropsWithChildren<Props>> = ({
  children,
  initialTokens,
}) => {
  const { loggedIn } = useStore();
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: AuthAPI.getMe,
    enabled: !!initialTokens?.accessToken && !!initialTokens?.refreshToken,
  });

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

export default AppProvider;
