import { MongoClient } from "mongodb";
import clientPromise from "../mongodb";

export interface BrandCategoryProps {
  name: string;
  slug: string;
}

export interface BrandProps {
  name: string;
  slug: string;
  categories: BrandCategoryProps[];
}

export const getAllBrands = async (): Promise<BrandProps[]> => {
  const client: MongoClient = await clientPromise;
  const collection = client.db("sneaker-store").collection("brands");

  const result: any = await collection
    .aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "categories",
          pipeline: [
            {
              $project: {
                _id: 0,
              },
            },
          ],
        },
      },
    ])
    .toArray();
  return result;
};
