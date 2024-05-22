import clsx from "@/utils/clsx";
import { kanit } from "@/utils/fonts";
import Nav from "./Nav/Nav";
import SearchField from "./SearchField";
import { StyledHeader } from "./styled";

export const Header = () => {
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
          <Nav />
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
