import mongoose, { model, Schema } from "mongoose";

interface IBrandSchema {
    name: String
    slug: String
    categories: Array<{name: String, slug: String}>
}

const brandSchema = new Schema<IBrandSchema>({
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

const brandModel = mongoose.models.brand || model("brand", brandSchema)
export default brandModel