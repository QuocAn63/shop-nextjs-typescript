import mongoose, { Document, model, Schema, Types } from "mongoose";

export interface IProductSchema extends Document {
    modelId: String
    name: String   
    sizes: String[]
    status: "available" | "outofstock"
    theme: String
    images: String[]
    description: String
    brand: Types.ObjectId,
    price: Number
    promotion: Number
    category:Types.ObjectId 
}

const ProductSchema = new Schema<IProductSchema>({
    modelId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sizes: [{
        type: String,
        required: true
    }],
    status: {
        type: String,
        enum: ["available", "outofstock"],
        default: "available"
    },
    theme: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    description: {
        type: String
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: "Brand"
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    promotion: {
        type: Number,
        default: 0
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Brand.Categories"
    }
})

const ProductModel = mongoose.models.Product || model("Product", ProductSchema)
export default ProductModel