import { MongoClient, ObjectId, PushOperator } from "mongodb";
import clientPromise from "../mongodb";
import { ProductProps } from "./product";
import { middleware } from "@/pages/api/cart";

interface FetchCartProps {
  _id: ObjectId;
  data: FetchCartProductItem[];
}

interface FetchCartProductItem {
  id: ObjectId;
  size: string;
  quantity: number;
}

export type CartProductItem = ProductProps & { size: string; quantity: number };

export type CartProps = { _id: ObjectId; data: CartProductItem[] };

export const createNewCart = async (): Promise<string> => {
  const client: MongoClient = await clientPromise;
  const collection = client.db("sneaker-store").collection("carts");

  return (await collection.insertOne({ data: [] })).insertedId.toString();
};

export const updateCart = async (
  cartToken: string,
  cartProducts: FetchCartProductItem[]
): Promise<CartProps | null> => {
  try {
    const client: MongoClient = await clientPromise;
    const collection = client.db("snaker-store").collection("carts");

    if (!cartToken) {
      cartToken = await createNewCart();
    }

    const cart: any = await collection.findOneAndUpdate(
      { _id: new ObjectId(cartToken) },
      {
        $set: {
          data: cartProducts,
        },
      }
    );

    return cart;
  } catch (err) {
    return null;
  }
};

export const createCartAndAddProduct = async (
  productId: string,
  size: string,
  quantity = 1
): Promise<string> => {
  try {
    if (!productId) {
      throw { message: "No product id provided", status: 400 };
    }

    if (!size) {
      throw { message: "No size provided", status: 400 };
    }

    const client: MongoClient = await clientPromise;
    const cartCollection = client.db("sneaker-store").collection("carts");
    const productCollection = client.db("sneaker-store").collection("products");

    // Check the existing of product with the provided id
    const isInvalidProductId = await productCollection.findOne({
      _id: new ObjectId(productId),
    });
    if (!isInvalidProductId) {
      throw {
        message: "Can not find product with the provided id",
        status: 404,
      };
    }

    let cartItemData: FetchCartProductItem = {
      id: new ObjectId(productId),
      size,
      quantity,
    };

    const result = await cartCollection.insertOne({
      data: [cartItemData],
    });

    return result.insertedId.toString();
  } catch (err) {
    throw err;
  }
};

export const addProductToCart = async (
  cartToken?: string,
  size?: string,
  productId?: string,
  quantity = 1
): Promise<string | null> => {
  try {
    if (!cartToken) {
      throw { message: "No cart token provided", status: 400 };
    }
    if (!productId) {
      throw { message: "No product id provided", status: 400 };
    }

    const client: MongoClient = await clientPromise;
    const cartCollection = client.db("sneaker-store").collection("carts");
    const productCollection = client.db("sneaker-store").collection("products");
    let cartItemData: FetchCartProductItem;

    // check product already existed
    const isExist = await cartCollection.findOne({
      _id: new ObjectId(cartToken),
      "data.id": { $in: [new ObjectId(productId)] },
    });
    if (isExist) {
      throw { message: "Product already in cart", status: 400 };
    }

    // Check the existing of product with the provided id
    const isInvalidProductId = await productCollection.findOne({
      _id: new ObjectId(productId),
    });
    if (!isInvalidProductId) {
      throw {
        message: "Can not find product with the provided id",
        status: 404,
      };
    }

    if (!size) {
      throw { message: "No product size provided", status: 400 };
    }

    cartItemData = {
      id: new ObjectId(productId),
      size,
      quantity,
    };

    const result = await cartCollection.findOneAndUpdate(
      { _id: new ObjectId(cartToken) },
      {
        $push: {
          data: cartItemData,
        } as PushOperator<Document>,
      }
    );

    if (result.value === null) {
      return null;
    }
    return result.value._id.toString();
  } catch (err) {
    throw err;
  }
};

export const getCart = async (
  cartToken?: string
): Promise<CartProps | null> => {
  try {
    if (!cartToken) {
      throw new Error("No token provided");
    }

    const client: MongoClient = await clientPromise;
    const collection = client.db("sneaker-store").collection("carts");

    const cart: any = await collection
      .aggregate([
        {
          $match: {
            _id: new ObjectId(cartToken),
          },
        },
        {
          $unwind: "$data",
        },
        {
          $lookup: {
            from: "products",
            localField: "data.id",
            foreignField: "_id",
            as: "data_lookup",
            pipeline: [
              {
                $project: {
                  sizes: 0,
                  images: 0,
                  description: 0,
                  category: 0,
                },
              },
            ],
          },
        },
        {
          $unwind: "$data_lookup",
        },
        {
          $group: {
            _id: "$_id",
            data: {
              $push: {
                $mergeObjects: ["$data_lookup", "$data"],
              },
            },
          },
        },
      ])
      .next();

    return cart;
  } catch (err) {
    throw err;
  }
};

export const removeProductFromCart = async (
  cartToken: string,
  productId: string
): Promise<string | null> => {
  try {
    const client: MongoClient = await clientPromise;
    const collection = client.db("sneaker-store").collection("carts");

    const result = await collection.findOneAndUpdate(
      {
        _id: new ObjectId(cartToken),
        "data.id": new ObjectId(productId),
      },
      {
        $pull: {
          data: {
            id: new ObjectId(productId),
          },
        } as any,
      }
    );

    if (result.ok && result.value !== null) {
      return result.value._id.toString();
    } else {
      throw { message: "Error occurred while updating cart", status: 400 };
    }
  } catch (err) {
    throw err;
  }
};
