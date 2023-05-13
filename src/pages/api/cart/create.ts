import { createNewCart } from "@/lib/api/cart";
import { ResponseData } from "@/types/response";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
) => {
  if (request.method === "POST") {
    const newCartId = await createNewCart();
    const cookie = serialize("cartToken", newCartId);

    response.setHeader("Set-Cookie", cookie);

    return response
      .status(200)
      .json({ status: 200, message: "", data: newCartId });
  } else {
    return response
      .status(405)
      .json({ status: 405, message: "Invalid method" });
  }
};

export default handler;
