import { Checkbox, Radio, Space } from "antd";
import { FC } from "react";
import classNames from "classnames";
import styles from "./shopSidebar.module.scss";
import type { sidebarItemProps } from "@/pages/shop";

type ShopSidebarProps = {
  brands: sidebarItemProps;
  sizes: sidebarItemProps;
  priceRange: sidebarItemProps;
};

const ShopSidebar: FC<ShopSidebarProps> = ({
  brands,
  sizes,
  priceRange,
  ...props
}) => {
  const ShopSidebarItem: FC<sidebarItemProps> = ({ label, options, type }) => {
    let GroupComponent: any = Checkbox.Group;
    let OptionComponent: any = Checkbox;

    if (type === "radio") {
      GroupComponent = Radio.Group;
      OptionComponent = Radio;
    }

    return (
      <div className={classNames(styles["sidebarItemWrapper"])}>
        <h3 className="font-semibold uppercase cursor-pointer block py-2">
          {label}
        </h3>
        <div className="max-h-[410px] overflow-y-auto pl-3">
          <div
            className={classNames("flex flex-col", styles["option-container"])}
          >
            <GroupComponent>
              <Space direction="vertical">
                {options.map((option) => (
                  <OptionComponent
                    key={option.key}
                    className={classNames(styles["option-item"])}
                    value={option.value}
                  >
                    {option.label}
                  </OptionComponent>
                ))}
              </Space>
            </GroupComponent>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <ShopSidebarItem {...brands} />
      <ShopSidebarItem {...priceRange} />
      <ShopSidebarItem {...sizes} />
    </div>
  );
};

export default ShopSidebar;
