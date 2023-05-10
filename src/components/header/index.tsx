import { Dropdown, Image, Input, Menu } from "antd";
import Link from "next/link";
import { FC, Fragment, ReactNode, useEffect, useState } from "react";
import {
  CloseOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import styles from "./header.module.scss";
import Cart from "../cart";
import classNames from "classnames/bind";
import { useQueryParam } from "@/hooks";
import { BrandProps } from "@/lib/api/brand";
type navItemChildrenProps = {
  key: string;
  label: string | ReactNode;
  href?: string;
  children?: Array<navItemChildrenProps>;
  onClick?: () => void;
};

type navItemProps = {
  key: string;
  label: ReactNode | string;
  href?: string;
  itemchildren?: Array<navItemChildrenProps>;
  onClick?: () => void;
};

const cx = classNames.bind(styles);

const Header = ({ brands }: { brands: BrandProps[] }) => {
  const leftItems: Array<navItemProps> = [
    {
      key: "home",
      label: "Home",
      href: "/",
    },
    {
      key: "brands",
      label: "Brands",
      itemchildren: brands.map((brand) => {
        const props: navItemChildrenProps = {
          key: brand.slug,
          label: <Link href={"/shop?brands=" + brand.slug}>{brand.name}</Link>,
        };

        if (brand.categories) {
          props.children = brand.categories.map((category) => ({
            key: category.slug,
            label: (
              <Link href={"/shop?category=" + category.slug}>
                {category.name}
              </Link>
            ),
          }));
        }

        return props;
      }),
    },
    {
      key: "shop",
      label: "Shop",
      href: "/shop",
    },
  ];

  const rightItems: Array<navItemProps> = [
    {
      key: "blogs",
      label: "Blogs",
      href: "/blogs",
    },
    {
      key: "about",
      label: "About",
      href: "/about",
    },
    {
      key: "search",
      label: (
        <div className="flex items-center gap-3">
          <button
            className="flex items-center justify-center border-0 bg-transparent px-1 py-2 text-2xl"
            onClick={() => handleOpenSearchBar()}
          >
            <SearchOutlined />
          </button>
          <Cart>
            <Link href="/cart">
              <div className="flex items-center justify-center border-0 bg-transparent px-1 py-2 text-2xl">
                <ShoppingCartOutlined />
              </div>
            </Link>
          </Cart>
        </div>
      ),
    },
  ];

  const handleNavigationScroll = () => {
    let lastY = 0;

    document.addEventListener<"scroll">("scroll", (e) => {
      const header = document.getElementById("header");
      const scrollValue = window.scrollY;
      if (scrollValue > lastY) {
        // scroll up
        header?.setAttribute(
          "style",
          "top: -80px; transition: top .3s ease-in-out"
        );
      } else {
        // scroll down
        header?.setAttribute(
          "style",
          "top: 0; transition: top .3s ease-in-out"
        );
      }
      lastY = scrollValue;
    });
  };

  const handleClearEvent = () => {
    document.removeEventListener<"scroll">("scroll", () => {
      return;
    });
  };

  const handleOpenSearchBar = () => {
    let seachOverlay = document.getElementById("seachOverlay");
    let searchModal = document.getElementById("searchModal");

    seachOverlay?.classList.add(styles.showOverlay);
    searchModal?.classList.add(styles.showModal);
  };

  const handleCloseSearchBar = () => {
    let seachOverlay = document.getElementById("seachOverlay");
    let searchModal = document.getElementById("searchModal");

    seachOverlay?.classList.remove(styles.showOverlay);
    searchModal?.classList.remove(styles.showModal);
  };

  const handleClearSearchBox = () => {
    setSearchValue("");
  };

  const handleClickToSearch = () => {
    handleCloseSearchBar();
    router.push("/shop?" + createQueryString("keyword", searchValue));
  };

  const NavItem: FC<React.HTMLAttributes<HTMLAnchorElement> & navItemProps> = ({
    href,
    label,
    ...props
  }) => {
    let Wrapper: any = Fragment;
    let wrapperProps = {};

    if (props.itemchildren) {
      Wrapper = Dropdown;
      wrapperProps = {
        dropdownRender: () => (
          <Menu items={props.itemchildren} className="min-w-[180px]"></Menu>
        ),
      };
    }

    if (href !== undefined) {
      return (
        <Wrapper {...wrapperProps}>
          <Link href={href} {...props}>
            {label}
          </Link>
        </Wrapper>
      );
    } else {
      return (
        <Wrapper {...wrapperProps}>
          <span {...props}>{label}</span>
        </Wrapper>
      );
    }
  };

  const bindingPressingEnterEvent = (mode: "focus" | "blur") => {
    const listenPressingEnterCb = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        router.push("/shop?" + createQueryString("keyword", searchValue));
      }
    };
    if (mode === "focus") {
      window.addEventListener("keydown", listenPressingEnterCb);
    } else {
      window.removeEventListener("keydown", listenPressingEnterCb);
    }
  };

  const { router, createQueryString } = useQueryParam();
  const [searchValue, setSearchValue] = useState<string>("");
  useEffect(() => {
    handleNavigationScroll();

    return () => handleClearEvent();
  }, []);

  return (
    <>
      <div
        className={cx("seachOverlay")}
        id="seachOverlay"
        onClick={handleCloseSearchBar}
      ></div>
      <div className={cx("searchModal")} id="searchModal">
        <div className="h-full flex items-center justify-center">
          <div className="flex-[0.6] h-8">
            <div className="flex items-center">
              <button
                className="px-3 flex items-center shadow-none"
                onClick={handleClickToSearch}
              >
                <SearchOutlined className="text-xl" />
              </button>
              <Input
                placeholder="Search your item"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => bindingPressingEnterEvent("focus")}
                onBlur={() => bindingPressingEnterEvent("blur")}
                className="font-semibold px-5 border rounded-none border-gray-800 hover:border-gray-800 focus:border-gray-800 focus:shadow-none"
              />
            </div>
          </div>
        </div>
        <button
          className="absolute text-2xl flex items-center right-10 top-1/2 -translate-y-1/2"
          onClick={handleCloseSearchBar}
        >
          <CloseOutlined />
        </button>
      </div>
      <div
        className="bg-white fixed flex justify-center w-full border border-b-gray-200 z-30"
        id="header"
      >
        <div className="xl:px-[5vw] w-full h-[80px] flex justify-around items-center">
          <div className="flex-1 flex justify-between items-center">
            {leftItems.map((item) => {
              const { key, ...props } = item;
              return (
                <NavItem
                  key={key}
                  href={item.href}
                  itemchildren={item.itemchildren}
                  className="block py-2 outline-none border-0 font-semibold uppercase hover:opacity-80 cursor-pointer"
                  {...props}
                />
              );
            })}
          </div>
          <Link href="/" className="flex-1 text-center">
            <Image
              src="/main-logo.jpg"
              alt="shop-logo"
              preview={false}
              height={56}
            />
          </Link>
          <div className="flex-1 flex justify-between items-center">
            {rightItems.map((item) => {
              const { key, ...props } = item;
              return (
                <NavItem
                  key={key}
                  href={item.href}
                  itemchildren={item.itemchildren}
                  className="block py-2 outline-none border-0 font-semibold uppercase hover:opacity-80 cursor-pointer"
                  {...props}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
