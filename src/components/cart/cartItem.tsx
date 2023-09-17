import { Col, Image, Row, Typography } from "antd";
import { FC } from "react";
import Currency from "../currency";
import Link from "next/link";
import { CartProductItem } from "@/lib/api/cart";

const CartItem: FC<React.HTMLAttributes<HTMLElement> & CartProductItem> = ({
  name,
  theme,
  quantity,
  price,
  size,
  ...props
}) => {
  return (
    <Link
      href="/"
      title={name}
      className="block hover:text-inherit hover:opacity-80 py-1"
      {...props}
    >
      <Row gutter={8}>
        <Col span={6}>
          <Image src={`/${theme}`} alt={name} preview={false} />
        </Col>
        <Col span={18}>
          <div className="mt-2 flex flex-col justify-between">
            <Typography.Text ellipsis={true} className="font-semibold">
              {name}
            </Typography.Text>
            <p className="flex justify-between items-end">
              <span className="text-sm">{size}</span>
              <span>
                {<Currency price={price} />} x {quantity}
              </span>
            </p>
          </div>
        </Col>
      </Row>
    </Link>
  );
};

export default CartItem;
