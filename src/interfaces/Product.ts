export interface Product {
  id: string;
  name: string;
  theme: string;
  images: string[];
  price: number;
  promotion: number;
  category: string;
  brand: string;
  productSizes: string[];
  status: "available" | "outofstock";
  description: string;
}
