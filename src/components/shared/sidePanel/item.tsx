"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  item: {
    name: string;
    icon: React.ReactNode;
    path: string;
  };
  pathname: string;
  itemKey: number;
};

const Item = ({ item, pathname, itemKey }: Props) => {
  const currentPathname = usePathname();

  return (
    <Link
      href={item.path}
      className={clsx(
        "flex w-full flex-col sm:flex-row gap-2 justify-center truncate sm:justify-start items-center py-4 px-2 sm:px-4 hover:bg-secondary-blue-highlight/70  hover:text-secondary/70",
        currentPathname === item.path
          ? "bg-secondary-blue-highlight text-secondary"
          : currentPathname === pathname && itemKey === 0
          ? "bg-secondary-blue-highlight text-secondary"
          : ""
      )}
    >
      {item.icon}
      <span className="capitalize">{item.name}</span>
    </Link>
  );
};

export default Item;
