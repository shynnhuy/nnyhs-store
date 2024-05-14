"use client";
import { Header } from "@/components/layouts/header";

import { AuthPopup } from "@/components/auth/AuthPopup";
import { Fragment } from "react";
import { notification } from "antd";
import { SessionProvider } from "next-auth/react";

notification.config({
  placement: "bottomRight",
  bottom: 50,
  duration: 3,
});

const MainLayout = ({ children }: any) => {
  return (
    <Fragment>
      <SessionProvider>
        <Header />
        {children}
        <AuthPopup />
      </SessionProvider>
    </Fragment>
  );
};

export default MainLayout;
