import clientPromise from "@/lib/mongodb";
import { AggregateOptions, MongoClient } from "mongodb";

export interface ProductProps {
  modelId: string;
  name: string;
  theme: string;
  images: string[];
  price: number;
  promotion: number;
  category: string;
  brand: { name: string; slug: string };
  productSizes: string[];
  status: "available" | "outofstock";
  description: string;
}

export interface ProductQueryKeysProps {
  page?: string;
  brands?: string;
  range?: string;
  size?: string;
  category?: string;
}

export const getProduct = async (
  slug: string
): Promise<ProductProps | null> => {
  const client: MongoClient = await clientPromise;
  const collection = client.db("sneaker-store").collection("products");

  const result: any = await collection.findOne(
    { slug },
    { projection: { _id: 0 } }
  );

  if (result)
    return {
      ...result,
    };
  else return null;
};

const searchKeys: ProductQueryKeysProps = {
  page: "page",
  brands: "brand.slug",
  category: "category.slug",
  size: "size",
};

export const getProducts = async (
  queryKeys?: ProductQueryKeysProps
): Promise<ProductProps[]> => {
  const client: MongoClient = await clientPromise;
  const collection = client.db("sneaker-store").collection("products");
  const pipeline: any = [
    {
      $limit: 20,
    },
    {
      $lookup: {
        from: "brands",
        localField: "brand",
        foreignField: "slug",
        as: "brand",
        pipeline: [
          {
            $project: {
              _id: 0,
              name: 1,
              slug: 1,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
        pipeline: [
          {
            $project: {
              _id: 0,
            },
          },
        ],
      },
    },
    {
      $unwind: "$brand",
    },
    {
      $unwind: "$category",
    },
    {
      $project: {
        _id: 0,
        sizes: 0,
        description: 0,
        images: 0,
      },
    },
  ];

  if (queryKeys)
    pipeline.push({
      $match: Object.keys(queryKeys).reduce((prev, cur: string) => {
        console.log(cur);
        return {
          ...prev,
          [searchKeys[cur as keyof ProductQueryKeysProps] as string]: {
            $in: queryKeys[cur as keyof ProductQueryKeysProps],
          },
        };
      }, {}),
    });
  console.log(pipeline);
  return (await collection.aggregate(pipeline).toArray()) as ProductProps[];
};

export const getNewestProducts = async (): Promise<ProductProps[]> => {
  const client: MongoClient = await clientPromise;
  const collection = client.db("sneaker-store").collection("products");

  return (await collection
    .aggregate([
      {
        $sort: {
          createAt: 1,
        },
      },
      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "slug",
          as: "brand",
          pipeline: [
            {
              $project: {
                _id: 0,
                name: 1,
                slug: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
          pipeline: [
            {
              $project: {
                _id: 0,
              },
            },
          ],
        },
      },
      {
        $unwind: "$brand",
      },
      {
        $unwind: "$category",
      },
      {
        $project: {
          _id: 0,
          sizes: 0,
          description: 0,
          images: 0,
        },
      },
      {
        $limit: 10,
      },
    ])
    .toArray()) as ProductProps[];
};

export const getTopProducts = async (): Promise<ProductProps[]> => {
  const client: MongoClient = await clientPromise;
  const collection = client.db("sneaker-store").collection("products");

  return (await collection
    .aggregate([
      {
        $sort: {
          createAt: 1,
        },
      },
      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "slug",
          as: "brand",
          pipeline: [
            {
              $project: {
                _id: 0,
                name: 1,
                slug: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
          pipeline: [
            {
              $project: {
                _id: 0,
              },
            },
          ],
        },
      },
      {
        $unwind: "$brand",
      },
      {
        $unwind: "$category",
      },
      {
        $project: {
          _id: 0,
          sizes: 0,
          description: 0,
          images: 0,
        },
      },
      {
        $limit: 10,
      },
    ])
    .toArray()) as ProductProps[];
};
