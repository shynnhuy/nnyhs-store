"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { useStore } from "@/store";
import { Button } from "@ui/components";
import { Space } from "antd";
import { KeyRound, ShoppingBag } from "lucide-react";
import UserMenu from "./UserMenu";

const Nav = () => {
  const { isAuth, openModal } = useStore();

  return (
    <Space>
      <ModeToggle />

      {!isAuth ? (
        <Button size="icon" onClick={openModal}>
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
