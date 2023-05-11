import { addProductToCart } from "@/lib/api/cart";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === "POST") {
    const cartToken = request.cookies["cartToken"];
    const productId = request.body["id"];
    const quantity = request.body["quantity"];

    const newCart = await addProductToCart(cartToken, productId, quantity);
    return response.status(200).json(newCart);
  } else {
    return response.status(404);
  }
};

export default handler;
