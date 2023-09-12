import { getAllBrands } from "@/lib/api/brand";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const brands = await getAllBrands();
    return res.status(200).json(brands);
  }
};

export default handler;
