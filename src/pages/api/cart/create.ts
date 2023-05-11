import { createNewCart } from "@/lib/api/cart";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === "POST") {
    const newCart = await createNewCart();
    return response.status(200).json(newCart);
  } else {
    return response.status(404);
  }
};

export default handler;
