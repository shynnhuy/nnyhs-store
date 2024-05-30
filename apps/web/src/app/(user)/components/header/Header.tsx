import clsx from "@/utils/clsx";
import { kanit } from "@/utils/fonts";
import Nav from "./Nav/Nav";
import SearchField from "./SearchField";
import { StyledHeader } from "./styled";
import Link from "next/link";

export const Header = () => {
  return (
    <StyledHeader>
      <div className="container">
        <Link href="/">
          <div className="logo">
            <span className={clsx(kanit.className, "text")}>Store</span>
          </div>
        </Link>

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
