import { Image, ImageProps, Typography } from "antd";
import { FC } from "react";
import Currency from "../currency";
import Link from "next/link";
import { ProductInterface } from "@/interfaces";

type productStatus = {
  available: "Available";
  outOfStock: "Out of stock";
  commingSoon: "Comming soon";
};


const Product: FC<
  React.HTMLAttributes<HTMLElement & HTMLImageElement> &
  ProductInterface &
    ImageProps
> = ({
  modelId,
  name,
  theme,
  images,
  price,
  promotion,
  category,
  brand,
  productSizes,
  status = "available",
  description = "",
}) => {
  return (
    <Link href={`/product/${modelId}`}>
      <div className="shadow-sm mt-4">
        <Image
          src={`/${theme}`}
          alt={theme}
          preview={false}
          className="hover:scale-110 transition-all"
        />
        <div className="mt-1 px-2">
          <Typography.Title level={4}>{brand}</Typography.Title>
          <Typography.Text className="text-sm">{name}</Typography.Text>
          <p>
            <Currency promotion={promotion} space={6}>{price}</Currency>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Product;
