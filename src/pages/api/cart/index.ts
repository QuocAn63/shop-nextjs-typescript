import { CartProps, getCart } from "@/lib/api/cart";
import { ResponseData } from "@/types/response";
import { NextApiRequest, NextApiResponse } from "next";

export type CartMiddlewareResponseData = {
  cart: CartProps | null;
};

export const middleware = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<CartMiddlewareResponseData | undefined> => {
  const cartToken = request.cookies["cartToken"];

  if (cartToken) {
    const isValidCart = await getCart(cartToken);

    if (!isValidCart) {
      throw {
        status: 404,
        message: "No cart found",
        data: null,
      };
    } else
      return {
        cart: isValidCart,
      };
  }

  return undefined;
};

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
) => {
  try {
    const cartMiddleware = await middleware(request, response);
    if (request.method === "GET") {
      let cart = cartMiddleware?.cart;

      if (!cart) {
        return response
          .status(404)
          .json({ message: "No cart found", status: 404, data: null });
      }
      return response
        .status(200)
        .json({ message: "", status: 200, data: cart });
    }

    return response
      .status(300)
      .json({ message: "Unknown method", status: 405, data: null });
  } catch (err: any) {
    let status = err.status | 400;
    let message = err.message;
    let data = err.data;

    return response.status(status).json({ status, message, data });
  }
};

export default handler;
