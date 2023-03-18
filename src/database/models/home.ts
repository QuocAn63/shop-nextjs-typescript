import { Document, model, models, Schema } from "mongoose";

export interface IHomeSchema extends Document {
  category_slider: Array<{ theme: String; title: String }>;
  newest_products_slider: Array<Schema.Types.ObjectId>;
  top_products_slider: Array<Schema.Types.ObjectId>;
  blogs: Array<Schema.Types.ObjectId>;
}

const HomeSchema = new Schema<IHomeSchema>({
  category_slider: [
    {
      theme: String,
      title: String,
    },
  ],
  newest_products_slider: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  top_products_slider: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

const HomeModel = models.Home || model("Home", HomeSchema);
export default HomeModel;
