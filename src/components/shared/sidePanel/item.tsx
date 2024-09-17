"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  item: {
    name: string;
    icon: React.ReactNode;
  };
  pathname: string;
  itemKey: number;
};

const Item = ({ item, pathname, itemKey }: Props) => {
  const params = useSearchParams();
  const slug = item.name.toLowerCase();

  return (
    <Link
      href={{
        pathname,
        query: { slug },
      }}
      className={`flex w-full flex-col sm:flex-row gap-2 justify-center sm:justify-start items-center py-4 px-2 sm:px-4 hover:bg-secondary-blue-highlight/70  hover:text-secondary/70 ${
        params.get("slug") === slug
          ? "bg-secondary-blue-highlight text-secondary"
          : params.get("slug") === null && itemKey === 0
          ? "bg-secondary-blue-highlight text-secondary"
          : ""
      }`}
    >
      {item.icon}
      <span className="capitalize">{item.name}</span>
    </Link>
  );
};

export default Item;
