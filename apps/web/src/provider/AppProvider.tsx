"use client";
import { notification } from "antd";
import React, { FC, Fragment, PropsWithChildren } from "react";
import RefreshTokenJob from "@/components/RefreshTokenJob";
import { AuthPopup } from "@/components/auth/popup";

import RouteLoader from "@/components/route-loader";

notification.config({
  placement: "bottomRight",
});

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
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
