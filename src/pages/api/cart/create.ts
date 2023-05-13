import { createNewCart } from "@/lib/api/cart";
import { ResponseData } from "@/types/response";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
) => {
  if (request.method === "POST") {
    const newCart = await createNewCart();
    return response
      .status(200)
      .json({ status: 200, message: "", data: newCart });
  } else {
    return response
      .status(405)
      .json({ status: 405, message: "Invalid method" });
  }
};

export default handler;
