import { Image } from "antd";
import type { MenuProps } from "antd";
import Link from "next/link";
import { ReactNode, useEffect } from "react";

type navItemProps = {
  key: string;
  label: ReactNode | string;
  path?: string;
};

const leftItems: Array<navItemProps> = [
  {
    key: "home",
    label: "Home",
    path: "/",
  },
  {
    key: "brands",
    label: "Brands",
  },
  {
    key: "categories",
    label: "Categories",
  },
  {
    key: "shop",
    label: "Shop",
  },
];

const rightItems: Array<navItemProps> = [
  {
    key: "blogs",
    label: "Blogs",
  },
  {
    key: "shop",
    label: "Shop",
  },
];

const Header = () => {
  const handleNavigationClick: MenuProps["onClick"] = (e) => {};

  useEffect(() => {
    document.addEventListener<"scroll">("scroll", (e) => {
      const header = document.querySelector("#header");
      console.log(window.scrollY);
    });
  }, []);

  return (
    <div
      className="flex justify-center w-full border border-b-gray-200"
      id="header"
    >
      <div className="max-w-screen-xl w-full h-[80px] flex justify-between items-center">
        <div className="flex-1 flex justify-between">
          {leftItems.map((item) => (
            <Link
              href={item.key}
              key={item.key}
              className="block px-3 py-2 outline-none border-0 font-semibold uppercase hover:opacity-80"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link href="/" className="flex-1 text-center">
          <Image
            src="/main-logo.jpg"
            alt="shop-logo"
            preview={false}
            height={56}
          />
        </Link>
        <div className="flex-1 flex justify-between">
          {rightItems.map((item) => (
            <Link
              href={item.key}
              key={item.key}
              className="block px-3 py-2 outline-none border-0 font-semibold uppercase hover:opacity-80"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
