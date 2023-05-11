import { MongoClient, ObjectId } from "mongodb";
import clientPromise from "../mongodb";
import { ProductProps } from "./product";

export interface CartProps {
  _id: ObjectId;
  data: CartProductItem[];
}

export type CartProductItem = Pick<
  ProductProps,
  "name" | "slug" | "theme" | "price" | "promotion"
> & { size: number; quantity: number };

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
    console.log(err);
    return null;
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
    console.log(err);

    return null;
  }
};
