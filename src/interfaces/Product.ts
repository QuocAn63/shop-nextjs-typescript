export interface ProductInterface {
  modelId: string;
  name: string;
  theme: string;
  images: string[];
  price: number;
  promotion: number;
  category: string;
  brand: {name: string, slug: string};
  productSizes: string[];
  status: "available" | "outofstock";
  description: string;
}
