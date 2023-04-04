import { MongoClient } from "mongodb";
import clientPromise from "../mongodb";
import { ProductProps } from "./product";
import { BlogProps } from "./blog";

export interface HomeProps {
  homeCategories: HomeCategoryProps[];
  newestProducts: ProductProps[];
  topProducts: ProductProps[];
  newestBlogs: BlogProps[];
}

export interface HomeCategoryProps {
  theme: string;
  title: string;
}

export const getHomeCategories = async () => {
  const client: MongoClient = await clientPromise;
  const collection = client.db("sneaker-store").collection("homes");

  const result: any = await collection
    .aggregate([
      {
        $limit: 4,
      },
      {
        $project: {
          _id: 0,
          category_slider: 1,
        },
      },
    ])
    .toArray();

  return result[0].category_slider;
};
