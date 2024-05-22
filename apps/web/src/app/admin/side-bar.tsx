import { NavItem } from "@/components/nav-item";
import {
  LucideLayoutDashboard,
  Package,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { FC } from "react";

type Props = {};

export const Sidebar: FC<Props> = (props) => {
  return (
    <div className="flex-1 overflow-auto py-2">
      <nav className="grid items-start px-4 text-sm font-medium">
        <NavItem href="/admin">
          <LucideLayoutDashboard className="h-4 w-4" />
          Dashboard
        </NavItem>
        <NavItem href="/admin/products">
          <Package className="h-4 w-4" />
          Products
        </NavItem>
        <NavItem href="/admin/users">
          <UsersIcon className="h-4 w-4" />
          Users
        </NavItem>
        <NavItem href="/admin/settings">
          <SettingsIcon className="h-4 w-4" />
          Settings
        </NavItem>
      </nav>
    </div>
  );
};

export default Sidebar;
