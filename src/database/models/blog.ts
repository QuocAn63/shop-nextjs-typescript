import mongoose, { Document, model, Schema, Types } from "mongoose";

export interface IBlogSchema extends Document {
    title: String
    slug: String
    theme: String
    content: String
    author: Types.ObjectId
}

const BlogSchema = new Schema<IBlogSchema>({
      title: {
        type: String,
        required: true
      },
      slug: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      theme: {
        type: String,
        required: true
      },
      author:{
        type: Schema.Types.ObjectId,
        ref: "Staff"
      }
})

const BlogModel = mongoose.models.Blog || model("Blog", BlogSchema)
export default BlogModel