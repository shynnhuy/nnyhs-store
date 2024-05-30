"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { useStore } from "@/store";
import { Button } from "@ui/components";
import { Space } from "antd";
import { KeyRound, ShoppingBag } from "lucide-react";
import UserMenu from "./UserMenu";
import { useAuthModal } from "@/components/auth/popup";

const Nav = () => {
  const { isAuth } = useStore();
  const { openModal } = useAuthModal();

  return (
    <Space>
      <ModeToggle />

      {!isAuth ? (
        <Button variant="outline" size="icon" onClick={openModal}>
          <KeyRound className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      ) : (
        <UserMenu />
      )}

      <Button size="icon" variant="outline" badge={1}>
        <ShoppingBag className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </Space>
  );
};

export default Nav;
