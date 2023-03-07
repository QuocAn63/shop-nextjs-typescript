import { Typography } from "antd";
import { FC } from "react";

type priceValueProp =
  | { price: number; children?: never }
  | { price?: never; children: number };

type currencyProps = {
  wrap?: boolean;
  quantity?: number;
  promotion?: number;
};

const Currency: FC<
  React.HTMLAttributes<HTMLElement> & currencyProps & priceValueProp
> = ({ price, promotion, quantity = 1, wrap = false, children, ...props }) => {
  let currentPrice = price || children || 0;

  const AmountPromotion: FC<{
    promotion: number;
  }> = ({ promotion }) => {
    let Component: keyof JSX.IntrinsicElements = "span";
    let props = { className: "" };

    if (wrap) {
      Component = "p";
    }

    return (
      <>
        <Component className="font-semibold break-words">
          {(
            Math.round((currentPrice * (100 - promotion)) / 100) * quantity
          ).toLocaleString("vi")}{" "}
          VND
        </Component>
        <Component className="line-through text-gray-400">
          {(currentPrice * quantity).toLocaleString("vi")} VND
        </Component>
      </>
    );
  };

  return (
    <Typography.Text {...props}>
      {promotion ? (
        <AmountPromotion promotion={promotion} />
      ) : (
        <span className="font-semibold">
          {(currentPrice * quantity).toLocaleString("vi")} VND
        </span>
      )}
    </Typography.Text>
  );
};

export default Currency;
