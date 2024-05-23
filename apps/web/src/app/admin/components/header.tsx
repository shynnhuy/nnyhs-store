import { FC } from "react";

type Props = {
  title: string;
  actions?: React.ReactNode[];
};

const Header: FC<Props> = ({ title, actions }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="font-semibold text-lg md:text-2xl">{title}</h1>
      <div className="flex gap-x-2">{actions?.map((action) => action)}</div>
    </div>
  );
};

export default Header;
