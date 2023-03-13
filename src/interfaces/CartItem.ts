import { Product } from "./Product";

export interface CartItem
  extends Pick<Product, "id" | "name" | "theme" | "price" | "promotion"> {
  quantity: number;
  size: string;
}
