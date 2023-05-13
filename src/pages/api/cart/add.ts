import { addProductToCart } from "@/lib/api/cart";
import { NextApiRequest, NextApiResponse } from "next";
import { middleware } from ".";
import { ResponseData } from "@/types/response";

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
) => {
  try {
    const cartMiddleware = await middleware(request, response);

    if (request.method === "POST") {
      const cartToken = cartMiddleware?.cart?._id.toString();
      const productId = request.body["id"];
      const quantity = request.body["quantity"];
      const size = request.body["size"];

      const newCart = await addProductToCart(
        cartToken,
        size,
        productId,
        quantity
      );

      if (!newCart) {
        return response.status(400).json({
          status: 400,
          message: "Something went wrong when adding product to cart",
        });
      }

      return response
        .status(200)
        .json({ status: 200, message: "Added", data: newCart });
    } else {
      return response
        .status(404)
        .json({ status: 405, message: "Unknown method", data: null });
    }
  } catch (err: any) {
    let status = err.status | 400;
    let message = err.message;
    let data = err.data;

    return response.status(status).json({ status, message, data });
  }
};

export default handler;
