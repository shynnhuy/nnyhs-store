"use client";
import { FC } from "react";
import { NavItem } from "@/components/nav-item";
import { Button } from "@ui/components";
import {
  FileStack,
  LucideLayoutDashboard,
  Moon,
  Package,
  SettingsIcon,
  Sun,
  UsersIcon,
} from "lucide-react";
import { useTheme } from "next-themes";

type Props = {};

export const Sidebar: FC<Props> = () => {
  const { theme, setTheme } = useTheme();
  const items = [
    {
      icon: LucideLayoutDashboard,
      label: "Dashboard",
    },
    {
      icon: FileStack,
      label: "Categories",
    },
    {
      icon: Package,
      label: "Products",
    },
    {
      icon: UsersIcon,
      label: "Users",
    },
    {
      icon: SettingsIcon,
      label: "Settings",
    },
  ];
  return (
    <div className="flex-1 overflow-auto py-2">
      <div className="flex flex-col justify-between h-full">
        <nav className="grid items-start px-4 text-sm font-medium">
          {items.map(({ icon: Icon, label }, index) => (
            <NavItem key={index} href={`/admin/${label.toLowerCase()}`}>
              <Icon className="h-4 w-4" />
              {label}
            </NavItem>
          ))}
        </nav>
        <Button
          variant="outline"
          className="mx-4 mt-auto flex items-center"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] mr-2 block dark:hidden" />
          <Moon className="h-[1.2rem] w-[1.2rem] mr-2 hidden dark:block" />
          Dark Mode
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
