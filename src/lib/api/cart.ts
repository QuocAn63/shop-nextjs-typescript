import { MongoClient, ObjectId, PushOperator } from "mongodb";
import clientPromise from "../mongodb";
import { ProductProps } from "./product";
import { middleware } from "@/pages/api/cart";

export interface CartProps {
  _id: ObjectId;
  data: CartProductItem[];
}

export interface CartProductItem {
  id: ObjectId;
  size: string;
  quantity: number;
}

export const createNewCart = async (): Promise<string> => {
  const client: MongoClient = await clientPromise;
  const collection = client.db("sneaker-store").collection("carts");

  return (await collection.insertOne({ data: [] })).insertedId.toString();
};

export const updateCart = async (
  cartToken: string,
  cartProducts: CartProductItem[]
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

export const addProductToCart = async (
  cartToken?: string,
  size?: string,
  productId?: string,
  quantity = 1
): Promise<number> => {
  try {
    if (!cartToken) {
      throw { message: "No cart token given", status: 400 };
    }
    if (!productId) {
      throw { message: "No product id given", status: 400 };
    }

    const client: MongoClient = await clientPromise;
    const cartCollection = client.db("sneaker-store").collection("carts");
    const productCollection = client.db("sneaker-store").collection("products");
    let cartItemData: CartProductItem;

    // check product already existed
    const isExist = await cartCollection.findOne({
      _id: new ObjectId(cartToken),
      "data.id": { $in: [new ObjectId(productId)] },
    });
    if (isExist) {
      throw { message: "Product already in cart", status: 400 };
    }

    // Check the existing of product with the given id
    const isInvalidProductId = await productCollection.findOne({
      _id: new ObjectId(productId),
    });
    if (!isInvalidProductId) {
      throw { message: "Can not find product with the given id", status: 404 };
    }

    if (!size) {
      throw { message: "No product size given", status: 400 };
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

    return result.ok;
  } catch (err) {
    throw err;
  }
};

export const getCart = async (
  cartToken?: string
): Promise<CartProps | null> => {
  try {
    if (!cartToken) {
      throw new Error("No token given");
    }

    const client: MongoClient = await clientPromise;
    const collection = client.db("sneaker-store").collection("carts");

    const cart: any = await collection.findOne({
      _id: new ObjectId(cartToken),
    });

    return cart;
  } catch (err) {
    throw err;
  }
};
