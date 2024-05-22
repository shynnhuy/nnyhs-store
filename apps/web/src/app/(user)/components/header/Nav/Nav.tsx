"use client";
import { useStore } from "@/store";
import { Badge, Button, Space } from "antd";
import { KeyRound, ShoppingBag } from "lucide-react";
import UserMenu from "./UserMenu";

const Nav = () => {
  const { isAuth, openModal } = useStore();

  return (
    <Space>
      {!isAuth ? (
        <Button
          className="login-btn"
          type="default"
          icon={<KeyRound />}
          onClick={openModal}
        />
      ) : (
        <UserMenu />
      )}

      <Badge count={1} size="default">
        <Button className="login-btn" icon={<ShoppingBag />} type="default" />
      </Badge>
    </Space>
  );
};

export default Nav;
