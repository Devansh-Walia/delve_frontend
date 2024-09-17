import { Suspense } from "react";

import Item from "./item";

type Props = {
  pathname: string;
  navItems: {
    name: string;
    icon: React.ReactNode;
  }[];
};

const SidePanel = ({ pathname, navItems }: Props) => {
  return (
    <nav className="flex w-full items-center justify-center sm:flex-col border-b-1 sm:divide-y-2 sm:border-b-2">
      {navItems.map((item, index) => (
        <Suspense key={index}>
          <Item item={item} pathname={pathname} itemKey={index} />
        </Suspense>
      ))}
    </nav>
  );
};

export default SidePanel;
