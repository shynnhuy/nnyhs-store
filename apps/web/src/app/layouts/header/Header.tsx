import clsx from "@/utils/clsx";
import { kanit } from "@/utils/fonts";
import SearchField from "./SearchField";
import { StyledHeader } from "./styled";
import Nav from "./Nav/Nav";
import isAuth from "@/lib/is-auth";

export const Header = () => {
  const isLoggedIn = isAuth();

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
          <Nav isAuth={isLoggedIn} />
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
