import { NextApiRequest, NextApiResponse } from "next";
import { CartMiddlewareResponseData, middleware } from ".";
import { removeProductFromCart } from "@/lib/api/cart";
import { ResponseData } from "@/types/response";

const checkCartExists = async (
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
) => {
  let result = await middleware(request, response);
  if (!result) {
    throw {
      status: 404,
      message: "Cart not found",
    };
  }

  return result;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
): Promise<void> {
  try {
    let cartMiddleware: CartMiddlewareResponseData;
    let productId = request.body.id;

    switch (request.method) {
      case "PUT":
        cartMiddleware = await checkCartExists(request, response);

        break;
      case "DELETE":
        cartMiddleware = await checkCartExists(request, response);
        if (!productId) {
          throw { status: 400, message: "No product id provided" };
        }
        const result = await removeProductFromCart(
          cartMiddleware.cart?._id.toString() as string,
          productId
        );

        return response
          .status(200)
          .json({
            status: 200,
            message: "Product removed from cart",
            data: result,
          });
      default:
        throw { status: 405, message: "Unkown method" };
    }
  } catch (err: any) {
    let status = err.status | 400;
    let message = err.message;
    let data = err.data;

    return response.status(status).json({ status, message, data });
  }
}
