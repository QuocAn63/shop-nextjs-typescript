import mongoose, { Document, model, Schema } from "mongoose";

export interface IBrandSchema extends Document {
    name: String
    slug: String
    categories: Array<{name: String, slug: String}>
}

const BrandSchema = new Schema<IBrandSchema>({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    categories: [
        {
            name: {
                type: String,
                required: true
            },
            slug: {
                type: String,
                required: true
            }
        }
    ]
})

const BrandModel = mongoose.models.Brand || model("Brand", BrandSchema)
export default BrandModel