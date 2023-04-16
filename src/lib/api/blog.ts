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

export interface BlogsWithMetadata {
  data: BlogProps[];
  metadata: [
    {
      page: number;
      total: number;
      pageSize: number;
    }
  ];
}

export const getBlog = async (slug: string): Promise<BlogProps | null> => {
  const client: MongoClient = await clientPromise;
  const collection = client.db("sneaker-store").collection("blogs");

  const result: any = await collection.findOne({ slug });

  if (!result) return null;
  return result;
};

export const getBlogs = async (pageNum = 1): Promise<BlogsWithMetadata> => {
  const client: MongoClient = await clientPromise;
  const collection = client.db("sneaker-store").collection("blogs");
  const pageSize = 10;

  let pipeline = [
    {
      $lookup: {
        from: "staffs",
        foreignField: "_id",
        localField: "author",
        as: "author",
        pipeline: [
          {
            $project: {
              _id: 0,
              password: 0,
            },
          },
        ],
      },
    },
    {
      $unwind: "$author",
    },
    {
      $sort: {
        createAt: 1,
      },
    },
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
          {
            $addFields: {
              page: pageNum,
              pageSize: pageSize,
            },
          },
        ],
        data: [
          {
            $skip: pageSize * (pageNum - 1),
          },
          {
            $limit: pageSize,
          },
        ],
      },
    },
  ];

  return collection.aggregate(pipeline).next() as any;
};

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
