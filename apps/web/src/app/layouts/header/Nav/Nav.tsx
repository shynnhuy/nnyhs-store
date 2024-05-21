"use client";
import { useLogoutMutation } from "@/mutations/auth";
import { useAuthPopupStore } from "@/provider/auth-popup-provider";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
type Props = {
  isAuth: boolean;
};
const Nav = ({ isAuth }: Props) => {
  const { openModal } = useAuthPopupStore((state) => state);
  const { mutate } = useLogoutMutation();
  return (
    <div>
      {!isAuth ? (
        <Button
          className="login-btn"
          shape="circle"
          icon={<UserOutlined style={{ fontSize: "18px" }} />}
          onClick={openModal}
        />
      ) : (
        <div onClick={() => mutate()}>Log out</div>
      )}
    </div>
  );
};

export default Nav;
