import { model, models, Schema } from "mongoose";

export interface IHomeSchema {
    category_slider: Array<{theme: String, title: String}>
    newest_products_slider: Array<Schema.Types.ObjectId>
    top_products_slider: Array<Schema.Types.ObjectId>
    blogs: Array<Schema.Types.ObjectId>
}

const homeSchema = new Schema<IHomeSchema>({
    category_slider: [{
        theme: String,
        title: String
    }],
    newest_products_slider: [
        {
            type: Schema.Types.ObjectId,
            ref: "product"
        }
    ],
    top_products_slider: [
        {
            type: Schema.Types.ObjectId,
            ref: "product"
        }
    ],
    blogs: [
        {
            type: Schema.Types.ObjectId,
            ref: "blog"
        }
    ]
})

const homeModel = models.home || model("home", homeSchema)
export default homeModel