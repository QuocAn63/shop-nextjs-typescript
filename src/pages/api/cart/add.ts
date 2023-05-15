import { addProductToCart, createCartAndAddProduct } from "@/lib/api/cart";
import { NextApiRequest, NextApiResponse } from "next";
import { middleware } from ".";
import { ResponseData } from "@/types/response";
import { serialize } from "cookie";

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
      let cartInfo;

      if (!cartToken) {
        cartInfo = await createCartAndAddProduct(productId, size, quantity);
      } else {
        cartInfo = await addProductToCart(cartToken, size, productId, quantity);
      }

      if (!cartInfo) {
        return response.status(400).json({
          status: 400,
          message: "Something went wrong when adding product to cart",
        });
      }

      const cookie = serialize("cartToken", cartInfo, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "strict",
        path: "/",
      });

      response.setHeader("Set-Cookie", cookie);

      return response
        .status(200)
        .json({ status: 200, message: "Added", data: cartInfo });
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
