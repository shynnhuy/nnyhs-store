"use client";
import { Header } from "@/components/header";

import { AuthPopup } from "@/components/auth/AuthPopup";
import { Fragment } from "react";
import { notification } from "antd";

notification.config({
  placement: "bottomRight",
  bottom: 50,
  duration: 3,
});

const MainLayout = ({ children }: any) => {
  return (
    <Fragment>
      <Header />
      {children}
      <AuthPopup />
    </Fragment>
  );
};

export default MainLayout;
