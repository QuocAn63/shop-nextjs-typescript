import { Image, ImageProps, Typography } from "antd";
import { FC } from "react";
import Currency from "../currency";
import Link from "next/link";

type productStatus = {
  available: "Available";
  outOfStock: "Out of stock";
  commingSoon: "Comming soon";
};

export type productProps = {
  id: string;
  name: string;
  theme: string;
  images: string[] | undefined;
  price: number;
  promotion: number;
  category: string;
  brand: string;
  productSizes: string[];
  status: keyof productStatus;
  description: string;
};

const Product: FC<
  React.HTMLAttributes<HTMLElement & HTMLImageElement> &
    productProps &
    ImageProps
> = ({
  id,
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
    <Link href={`/product/${id}`}>
      <div className="shadow-sm mt-4">
        <Image
          src={theme}
          alt="91-7329"
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
