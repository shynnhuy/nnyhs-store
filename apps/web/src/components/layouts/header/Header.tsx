"use client";
import clsx from "@/utils/clsx";
import { StyledHeader } from "./styled";
import { kanit } from "@/utils/fonts";
import SearchField from "./SearchField";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuthPopup } from "../../auth/AuthPopup";

export const Header = () => {
  const { openModal } = useAuthPopup();
  return (
    <StyledHeader>
      <div className="container">
        <div className="logo">
          <span className={clsx(kanit.className, "text")}>Store</span>
        </div>

        <div className="search-box">
          <SearchField />
        </div>

        <div className="actions">
          <Button
            className="login-btn"
            shape="circle"
            icon={<UserOutlined style={{ fontSize: "18px" }} />}
            onClick={openModal}
          />
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
