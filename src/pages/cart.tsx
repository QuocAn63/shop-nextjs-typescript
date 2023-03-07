import CartItem from "@/components/cart/cartItem";
import Currency from "@/components/currency";
import Layout from "@/components/layout";
import { Col, InputNumber, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Image from "next/image";
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
  },
  {
    title: "Picture",
    dataIndex: "image",
    key: "image",
    render: (text) => <Image src={text} alt={text} width={100} height={200} />,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (text, records) => (
      <Currency price={text} promotion={records["promotion"]} wrap />
    ),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    render: (text) => <InputNumber defaultValue={text} />,
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
            <Col span={16}>
              <Table
                columns={cartTableColumns}
                dataSource={currentCart}
                pagination={false}
              />
            </Col>
            <Col span={8}>
              <aside className="px-8">Cart Sidebar</aside>
            </Col>
          </Row>
        </Layout>
      </main>
    </>
  );
};

export default Cart;
