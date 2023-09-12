import clientPromise from "@/lib/mongodb";
import { MongoClient, ObjectId } from "mongodb";

export interface ProductProps {
  _id: ObjectId;
  modelId: string;
  name: string;
  slug: string;
  theme: string;
  images: string[];
  price: number;
  promotion: number;
  category: string;
  brand: { name: string; slug: string };
  sizes: string[];
  status: "available" | "outofstock";
  description: string;
}

export interface ProductQueryKeysProps {
  page?: any;
  brands?: any;
  range?: any;
  sizes?: any;
  category?: any;
}

export interface ProductsWithMetadata {
  metadata: [
    {
      total: number;
      page: number;
      pageSize: number;
    }
  ];
  data: ProductProps[];
}

const ProductQueryFuncWithKeys = {
  brands: (value: string[]) => ({
    "brand.slug": {
      $in: value,
    },
  }),
  range: (value: string[]) => ({
    price: ProductPriceRanges[value[0] as keyof typeof ProductPriceRanges],
  }),
  sizes: (value: string[]) => ({
    sizes: value[0],
  }),
  category: (value: string[]) => ({
    "category.slug": value[0],
  }),
};

const ProductPriceRanges = {
  "1": { $lt: 1000000 },
  "2": { $gt: 1000000, $lt: 3000000 },
  "3": { $gt: 3000000, $lt: 7000000 },
  "4": { $gt: 7000000, $lt: 15000000 },
  "5": { $gt: 15000000 },
};

export const getProduct = async (
  slug: string
): Promise<ProductProps | null> => {
  const client: MongoClient = await clientPromise;
  const collection = client.db("sneaker-store").collection("products");

  const result: any = await collection.findOne({ slug });

  if (result)
    return {
      ...result,
    };
  else return null;
};

export const getProducts = async (
  queryKeys: ProductQueryKeysProps
): Promise<ProductsWithMetadata> => {
  const client: MongoClient = await clientPromise;
  const collection = client.db("sneaker-store").collection("products");
  const pageNum = queryKeys.page ? Number.parseInt(queryKeys.page[0]) : 1;

  let pipeline: any = [
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
        description: 0,
        images: 0,
      },
    },
  ];

  // If have the query keys, loop to get the query for each query found
  if (queryKeys) {
    pipeline = [
      ...pipeline,
      {
        $match: Object.keys(queryKeys).reduce((prev, cur: string) => {
          if (
            ProductQueryFuncWithKeys[
              cur as keyof Omit<ProductQueryKeysProps, "page">
            ] !== undefined
          ) {
            return {
              ...prev,
              ...ProductQueryFuncWithKeys[
                cur as keyof Omit<ProductQueryKeysProps, "page">
              ](queryKeys[cur as keyof Omit<ProductQueryKeysProps, "page">]),
            };
          } else return prev;
        }, {}),
      },
    ];
  }

  pipeline = [
    ...pipeline,
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
          {
            $addFields: {
              page: pageNum,
              pageSize: 20,
            },
          },
        ],
        data: [
          {
            $skip: 20 * (pageNum - 1),
          },
          {
            $limit: 20,
          },
        ],
      },
    },
    {
      $project: {
        data: 1,
        metadata: {
          $cond: {
            if: {
              $gt: [{ $size: "$data" }, 0],
            },
            then: [
              {
                total: { $arrayElemAt: ["$metadata.total", 0] },
                page: pageNum,
                pageSize: 20,
              },
            ],
            else: [
              {
                total: 0,
                page: pageNum,
                pageSize: 20,
              },
            ],
          },
        },
      },
    },
  ];

  return (await collection.aggregate(pipeline).next()) as any;
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
