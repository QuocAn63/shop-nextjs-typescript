import Currency from "@/components/currency";
import { CartProductItem } from "@/lib/api/cart";
import { CartProps, getCart } from "@/lib/api/cart";
import { ProductProps } from "@/lib/api/product";
import { CloseOutlined } from "@ant-design/icons";
import { Col, InputNumber, Row, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import { ObjectId } from "mongodb";
import { GetServerSideProps, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { FC, useState } from "react";

interface CartPageProps {
  cartToken: string | null;
  cart: CartProps | null;
}

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

const Cart: FC<CartPageProps> = ({ cartToken, cart }) => {
  const [currentCart, setCurrentCart] = useState<CartProductItem[] | []>(
    cart?.data || []
  );

  const cartTableColumns: ColumnsType<CartProductItem> = [
    {
      title: "Name",
      key: "name",
      render(_, records) {
        return (
          <div>
            <Link href="/" className="font-semibold" target="_blank">
              {records["name"]}
            </Link>
            <p className="text-sm pt-2">
              <span>Size: </span>
              <span className="font-semibold">{records["size"]}</span>
            </p>
          </div>
        );
      },
    },
    {
      title: "Picture",
      dataIndex: "theme",
      key: "theme",
      render: (value) => (
        <Image src={`/${value}`} alt={value} width={100} height={200} />
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
      render: (value, records) => (
        <InputNumber
          defaultValue={value}
          min={1}
          onChange={handleChangeQuantity(records._id) as any}
        />
      ),
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
      render: (_, records) => (
        <button
          className="block bg-transparent outline-none border-none text-gray-400 hover:text-red-400 transition-colors"
          onClick={() => handleRemoveProduct(records._id)}
        >
          <CloseOutlined />
        </button>
      ),
    },
  ];

  const handleChangeQuantity =
    (productId: ObjectId) => async (value: number) => {
      const newCart = currentCart.map((item) => {
        if (item._id === productId && typeof value === "number") {
          item.quantity = value;
        }
        return { id: item._id, quantity: value, size: item.size };
      });
      try {
        const result = await axios.put("/api/cart/update", {
          cart: JSON.stringify(newCart),
        });

        alert(result.data.message);
        Router.reload();
      } catch (err) {
        alert(err);
      }
    };

  const handleRemoveProduct = async (productId: ObjectId) => {
    try {
      const result = await axios.delete("/api/cart/update", {
        data: { id: productId.toString() },
      });

      alert(result.data.message);
      Router.reload();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <header>
        <title>Sneaker Store - Cart</title>
      </header>
      <main>
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
            <aside className="px-8 ">
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
      </main>
    </>
  );
};

export default Cart;
