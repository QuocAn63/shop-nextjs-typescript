import CartItem from "@/components/cart/cartItem";
import Currency from "@/components/currency";
import Layout from "@/components/layout";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Col, InputNumber, Row, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";

interface CartDataType {
  key: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  promotion: number;
}

const cartTableColumns: ColumnsType<CartDataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render(value) {
      return <Link href="/">{value}</Link>;
    },
  },
  {
    title: "Picture",
    dataIndex: "image",
    key: "image",
    render: (value) => (
      <Image src={value} alt={value} width={100} height={200} />
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (value, records) => (
      <Currency price={value} promotion={records["promotion"]} wrap />
    ),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    render: (value) => <InputNumber defaultValue={value} min={1} />,
  },
  {
    title: "Amount",
    key: "amount",
    render: (_, records) => {
      return (
        <Currency
          price={records["price"]}
          quantity={records["quantity"]}
          promotion={records["promotion"]}
          wrap
        />
      );
    },
  },
  {
    title: "Actions",
    key: "actions",
    dataIndex: "key",
    render: (value) => (
      <button className="block bg-transparent outline-none border-none text-gray-500 hover:text-red-400 transition-colors">
        <CloseOutlined />
      </button>
    ),
  },
];

const productItem = {
  key: "1",
  name: "AIR JORDAN 1 MID LIGHT CARDINAL CURRY (GS) [554725-201]",
  image: "/91-7329.jpg",
  price: 4200000,
  promotion: 30,
  quantity: 1,
};

const Cart: FC = () => {
  const [currentCart, setCurrentCart] = useState<Array<CartDataType>>([
    productItem,
    productItem,
    productItem,
    productItem,
    productItem,
  ]);

  return (
    <>
      <header>
        <title>Sneaker Store - Cart</title>
      </header>
      <main>
        <Layout>
          <Row gutter={16}>
            <Col span={24}>
              <div className="flex gap-2 items-end pb-5">
                <span className="text-2xl uppercase font-semibold">Cart</span>
                <span className="text-lg font-semibold">
                  ({currentCart.length} items)
                </span>
              </div>
            </Col>
            <Col span={18}>
              <Table
                columns={cartTableColumns}
                dataSource={currentCart}
                pagination={false}
              />
            </Col>
            <Col span={6}>
              <aside className="px-8">
                <div>
                  <p className="flex justify-between">
                    <span className="font-semibold">Provisional: </span>
                    <Currency>{0}</Currency>
                  </p>
                  <hr className="block mt-10 mb-2"></hr>
                  <p className="flex justify-between">
                    <span className="font-semibold">Subtotal: </span>
                    <Currency className="text-lg">{0}</Currency>
                  </p>
                </div>
                <div className="flex gap-5 mt-5">
                  <Link
                    href="/checkout"
                    className="block rounded text-center py-3 font-semibold uppercase w-full text-white border-2 border-black bg-black hover:text-white hover:opacity-80 transition-all"
                  >
                    Pay Now
                  </Link>
                  <Link
                    href="/"
                    className="block rounded text-center py-3 font-semibold uppercase w-full text-black border-2 border-black hover:opacity-80 transition-all"
                  >
                    Continue Buying
                  </Link>
                </div>
              </aside>
            </Col>
          </Row>
        </Layout>
      </main>
    </>
  );
};

export default Cart;
