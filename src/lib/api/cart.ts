import { MongoClient } from "mongodb";
import clientPromise from "../mongodb";
import { ProductProps } from "./product";

export interface CartProps {
  token: string;
  data: CartProductItem[];
}

export type CartProductItem = Pick<
  ProductProps,
  "name" | "slug" | "theme" | "price" | "promotion"
> & { size: number; quantity: number };

export const createNewCart = async (): Promise<CartProps> => {
  const client: MongoClient = await clientPromise;
  const collection = client.db("sneaker-store").collection("carts");

  return (await collection.insertOne({})) as any;
};

export const updateCart = async (
  cartToken: string,
  cartProducts: CartProductItem[]
): Promise<CartProps | null> => {
  try {
    const client: MongoClient = await clientPromise;
    const collection = client.db("snaker-store").collection("carts");

    if (!cartToken) {
      cartToken = (await createNewCart()).token;
    }

    const cart: any = await collection.findOneAndUpdate(
      { token: cartToken },
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
