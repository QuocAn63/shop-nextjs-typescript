import { Col, Image, Row, Typography } from "antd";
import { FC } from "react";
import Currency from "../currency";
import Link from "next/link";

type CartItemProps = {
  name: string;
  image: string;
  category: string;
  quantity: number;
  price: number;
} & React.HTMLAttributes<HTMLElement>;

const CartItem: FC<React.HTMLAttributes<HTMLElement> & CartItemProps> = ({
  name,
  image,
  category,
  quantity,
  price,
  ...props
}) => {
  return (
    <Link
      href="/"
      title={name}
      className="block hover:text-inherit hover:opacity-80 py-1"
    >
      <Row gutter={8}>
        <Col span={6}>
          <Image src={image} alt={name} preview={false} />
        </Col>
        <Col span={18}>
          <div className="mt-2 flex flex-col justify-between">
            <Typography.Text ellipsis={true}>{name}</Typography.Text>
            <p className="flex justify-between items-end">
              <span className="text-sm">{category}</span>
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
