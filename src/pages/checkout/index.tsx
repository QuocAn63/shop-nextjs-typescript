import {
  Col,
  Input,
  Row,
  Select,
  Space,
  Tabs,
  TabsProps,
  Typography,
} from "antd";
import CheckoutItem from "./checkoutItem";
import Currency from "@/components/currency";
import { useState } from "react";
import { CartProductItem, getCart } from "@/lib/api/cart";
import { GetServerSideProps } from "next";
import { CartPageProps } from "../cart";

const CalculateTotal = (cart: CartProductItem[]) => {
  let total = cart.reduce(
    (sum, item) =>
      sum + (item.price * (100 - item.promotion) * item.quantity) / 100,
    0
  );

  return total;
};

export const getServerSideProps: GetServerSideProps<CartPageProps> = async ({
  req,
  res,
}) => {
  try {
    let cartTokenCookie = req.cookies["cartToken"];

    let cart = await getCart(cartTokenCookie);
    return {
      props: {
        cartToken: cartTokenCookie || null,
        cart: JSON.parse(JSON.stringify(cart)),
      },
    };
  } catch (err) {
    return {
      props: {
        cartToken: null,
        cart: null,
      },
    };
  }
};

const Checkout = ({ cart, cartToken }: CartPageProps) => {
  const [currentCart, setCart] = useState<CartProductItem[]>(
    cart?.data ? cart.data : []
  );

  const tabItems: TabsProps["items"] = [
    {
      key: "shipment",
      label: "Shipment",
      children: (
        <Space direction="vertical" className="w-full">
          <Input
            name="customer_address"
            placeholder="Address"
            className="py-2"
          />
          <Space.Compact block>
            <Select placeholder="City" className="py-2 w-full" />
            <Select placeholder="District" className="py-2 w-full" />
            <Select placeholder="Wards" className="py-2 w-full" />
          </Space.Compact>
          <Typography.Text className="italic text-gray-400">
            *Shipment cost is depended on the distance
          </Typography.Text>
        </Space>
      ),
    },
    {
      key: "shop",
      label: "Get at store",
      children: <p>Get to our store at XXX, YYY, ZZZ</p>,
    },
  ];

  return (
    <>
      <header>
        <title>Sneaker Store - Checkout</title>
      </header>
      <Row gutter={40}>
        <Col span={24}>
          <div className="flex gap-2 items-end pb-5">
            <span className="text-2xl uppercase font-semibold">Checkout</span>
          </div>
        </Col>
        <Col span={12}>
          <p className="text-lg">Shipment Details:</p>
          <div className="py-3">
            <Space direction="vertical" className="w-full">
              <Input
                name="customer_fullName"
                placeholder="Full Name"
                className="py-2"
              />
              <Space.Compact block>
                <Input
                  name="customer_email"
                  placeholder="Email"
                  type="email"
                  className="py-2"
                />
                <Input
                  name="customer_phoneNumber"
                  placeholder="Phone Number"
                  className="py-2 w-1/2"
                />
              </Space.Compact>
              <Tabs items={tabItems} className="mt-5"></Tabs>
            </Space>
          </div>
          <button className="mt-3 w-full text-white font-semibold uppercase bg-black py-2 rounded hover:text-white">
            Purchase
          </button>
        </Col>
        <Col span={12}>
          <Space direction="vertical">
            {currentCart.map((item, index) => (
              <CheckoutItem key={index} {...item} />
            ))}
          </Space>
          <hr className="my-5" />
          <div>
            <p className="text-right">
              <span className="text-lg font-medium">Total:</span>
              <Currency className="text-xl font-semibold ml-2">
                {CalculateTotal(currentCart)}
              </Currency>
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Checkout;
