import { Dropdown, Typography } from "antd";
import { FC, ReactNode } from "react";
import CartItem from "./cartItem";
import Link from "next/link";
import { CartProps } from "@/lib/api/cart";

type CartComponentProps = {
  cart?: CartProps;
  children: ReactNode;
};

const Cart: FC<CartComponentProps> = ({ cart, children }) => {
  return (
    <Dropdown
      dropdownRender={() => (
        <div className="bg-white rounded-md w-[400px] min-h-[260px] shadow p-3 border border-gray-200">
          <Typography.Text className="text-base font-medium pb-3">
            Cart
          </Typography.Text>
          {cart && cart?.data.length !== 0 ? (
            <>
              <div className="min-h-[220px]">
                {cart?.data.map((cartItem) => (
                  <CartItem {...cartItem} />
                ))}
              </div>
              <div className="text-center pt-4">
                <Link
                  href="/cart"
                  className="inline-block rounded px-3 py-1 font-semibold bg-black text-white hover:opacity-80 hover:text-white"
                >
                  View cart
                </Link>
              </div>
            </>
          ) : (
            <div>Empty cart</div>
          )}
        </div>
      )}
    >
      <div className="relative">
        <>
          {children}
          <span className="absolute top-0 -right-2 bg-white rounded-full border-2 border-black w-5 h-5 flex items-center justify-center text-sm">
            {cart?.data.length || 0}
          </span>
        </>
      </div>
    </Dropdown>
  );
};

export default Cart;
