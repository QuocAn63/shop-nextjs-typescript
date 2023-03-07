import { Dropdown, Typography } from "antd";
import { ScriptProps } from "next/script";
import { FC } from "react";
import CartItem from "./cartItem";
import Link from "next/link";

const productItem = {
  id: "air_jordan_1_mid_light",
  name: "AIR JORDAN 1 MID LIGHT CARDINAL CURRY (GS) [554725-201]",
  image: "/91-7329.jpg",
  price: 4200000,
  promotion: 30,
  quantity: 1,
  category: "AIR JORDAN 6",
  brand: "AIR JORDAN",
  productSizes: ["40.0", "40.5", "41.0", "42.0", "43.0"],
  status: "available",
  description: "",
};

const Cart: FC<ScriptProps> = ({ children }) => {
  return (
    <Dropdown
      dropdownRender={() => (
        <div className="bg-white rounded-md w-[400px] shadow p-3 border border-gray-200">
          <Typography.Text className="text-base font-medium pb-3">
            Cart
          </Typography.Text>
          <div className="min-h-[220px]">
            <CartItem {...productItem} />
            <CartItem {...productItem} />
            <CartItem {...productItem} />
            <CartItem {...productItem} />
          </div>
          <div className="text-center pt-4">
            <Link
              href="/cart"
              className="inline-block rounded px-3 py-1 font-semibold bg-black text-white hover:opacity-80 hover:text-white"
            >
              View cart
            </Link>
          </div>
        </div>
      )}
    >
      {children}
    </Dropdown>
  );
};

export default Cart;
