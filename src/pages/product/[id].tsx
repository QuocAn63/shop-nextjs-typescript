import Currency from "@/components/currency";
import {
  Carousel,
  Col,
  Image,
  InputNumber,
  Row,
  Space,
  Typography,
} from "antd";
import { ButtonHTMLAttributes, useState } from "react";
import styles from "./product.module.scss";
import Head from "next/head";
import { ProductProps } from "@/lib/api/product";
import { GetServerSideProps } from "next";
import clientPromise from "@/lib/mongodb";
import { getProduct } from "@/lib/api/product";
const buttonStatus = {
  active:
    "border border-black bg-black text-white hover:text-white h-10 rounded text-center min-w-[200px] font-semibold",
  disable:
    "border border-gray-400 bg-gray-400 text-gray-600 h-10 rounded text-center min-w-[200px] font-semibold select-none opacity-70 cursor-default",
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    await clientPromise;
  } catch (err) {}

  const slug = context.query.id;
  const product = await getProduct(slug as string);

  if (!product)
    return {
      notFound: true,
    };

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
};

export interface ProductPageProps {
  product: ProductProps;
}

const Product = ({ product }: ProductPageProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  let buttonProps: ButtonHTMLAttributes<HTMLButtonElement> = {
    className: buttonStatus["active"],
  };

  const sizeButtonClassName = (size: string): string => {
    return selectedSize === size
      ? "border border-gray-500 px-2 py-2 cursor-pointer hover:bg-black hover:text-white " +
          styles["selectedSize"]
      : "border border-gray-500 px-2 py-2 cursor-pointer hover:bg-black hover:text-white";
  };

  const handleClickSizeButton = (size: string): void => {
    setSelectedSize(size);
  };

  const handleBuyButton = () => {
    alert("You hit buy button");
  };

  if (!selectedSize) {
    buttonProps.onClick = () => {};
    buttonProps.className = buttonStatus["disable"];
  } else {
    buttonProps.onClick = handleBuyButton;
  }

  return (
    <>
      <Head>
        <title>Sneaker Store - Product</title>
      </Head>
      <Row gutter={40}>
        <Col span={12}>
          <div className="px-10">
            <Image src={`/${product.theme}`} alt={product.name} />
          </div>
          <Carousel
            autoplay
            dots={false}
            slidesToShow={
              product.images.length >= 4 ? 4 : product.images.length
            }
          >
            {product.images.map((image, index) => (
              <div key={index} className="block cursor-pointer">
                <Image src={`/${image}`} alt={image} />
              </div>
            ))}
          </Carousel>
        </Col>
        <Col span={12}>
          <p className="uppercase text-xl font-semibold mb-1">
            {product.brand.name}
          </p>
          <p className="uppercase text-3xl font-semibold mb-3">
            {product.name}
          </p>
          <Currency
            promotion={product.promotion}
            className="text-xl font-medium"
            space={12}
          >
            {product.price}
          </Currency>
          <div className="w-full h-[1px] bg-black my-5"></div>
          <p className="mb-4">
            <span className="font-medium uppercase mr-1">Model:</span>
            <span>{product.modelId}</span>
          </p>
          <div className="mb-6">
            <p className="font-medium uppercase mr-1 mb-2">Sizes:</p>
            <Space size={12}>
              {product.sizes.map((size) => (
                <div
                  key={size}
                  onClick={() => handleClickSizeButton(size)}
                  className={sizeButtonClassName(size)}
                >
                  {size}
                </div>
              ))}
            </Space>
          </div>
          <div className="flex items-center gap-5">
            <InputNumber min={1} defaultValue={1} size="large" />
            <button {...buttonProps}>Buy Now</button>
          </div>
          <div className="w-full h-[1px] bg-black my-5"></div>
          <div>
            <p className="font-medium uppercase mr-1 mb-2">Description:</p>
            <Typography.Text>{product.description}</Typography.Text>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Product;
