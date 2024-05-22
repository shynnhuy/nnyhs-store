"use client";
import { AuthAPI } from "@/api";
import { useStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { Button, Space, notification } from "antd";
import { ShoppingBag, User2, LogOut } from "lucide-react";

const Nav = () => {
  const { isAuth, openModal, logOut } = useStore();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: AuthAPI.logout,
    onSuccess: () => {
      logOut();
      notification.success({
        message: "Logged out successfully",
      });
    },
  });

  return (
    <Space>
      {!isAuth ? (
        <Button
          className="login-btn"
          type="default"
          icon={<User2 />}
          onClick={openModal}
        />
      ) : (
        <Button
          type="default"
          disabled={isPending}
          loading={isPending}
          className="login-btn"
          onClick={() => logout()}
          icon={<LogOut />}
        />
      )}

      <Button className="login-btn" icon={<ShoppingBag />} type="default" />
    </Space>
  );
};

export default Nav;
