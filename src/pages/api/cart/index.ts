import { getCart } from "@/lib/api/cart";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === "GET") {
    const cartToken = request.cookies["cartToken"];
    console.log(cartToken);
    let cart = await getCart(cartToken);

    if (!cart) {
      return response.status(200).json({ message: "No cart found" });
    }
    return response.status(200).json(cart);
  }

  return response.status(300).json({ message: "Unknown method" });
};

export default handler;
