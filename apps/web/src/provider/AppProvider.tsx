"use client";
import { notification } from "antd";
import React, { FC, Fragment, PropsWithChildren } from "react";

notification.config({
  placement: "bottomRight",
});

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

export default AppProvider;
