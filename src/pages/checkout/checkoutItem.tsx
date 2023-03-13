import Currency from "@/components/currency";
import { CartItem } from "@/interfaces";
import { Image } from "antd";
import Link from "next/link";

const CheckoutItem = ({
  id,
  name,
  price,
  promotion,
  quantity,
  size,
  theme,
  ...props
}: CartItem) => {
  return (
    <Link href={`/product/${id}`} className="block w-full" {...props}>
      <div className="flex items-start w-full gap-3">
        <Image src={theme} alt={name} preview={false} width={"20%"} />
        <div className="flex-1">
          <p className="font-medium">{name}</p>
          <div className="flex items-start justify-between mt-2">
            <span className="font-medium">{size}</span>
            <div className="flex">
              <Currency promotion={promotion} quantity={quantity} wrap>
                {price}
              </Currency>
              <span className="ml-2"> x {quantity}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CheckoutItem;
