import { MongoClient } from "mongodb";
import { StaffProps } from "./staff";
import clientPromise from "../mongodb";

export interface BlogProps {
  id: string;
  slug: string;
  theme: string;
  title: string;
  author: StaffProps;
  content: string;
  createdAt: string;
}

export const getNewestBlogs = async (): Promise<BlogProps[]> => {
  const client: MongoClient = await clientPromise;
  const collection = client.db("sneaker-store").collection("blogs");

  return (await collection
    .aggregate([
      {
        $sort: {
          createAt: 1,
        },
      },
      {
        $limit: 3,
      },
    ])
    .toArray()) as BlogProps[];
};
