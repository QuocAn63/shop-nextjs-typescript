import { Blog } from "./Blog"
import { Product } from "./Product"

export type HomeInterface =  {
    category_slider: Array<{title: string, theme: string}>
    newest_products_slider: Product[]
    top_products_slider: Product[]
    blogs: Blog[]
}