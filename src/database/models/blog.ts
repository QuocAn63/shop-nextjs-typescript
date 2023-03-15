import mongoose, { model, Schema, Types } from "mongoose";

export interface IBlogSchema {
    title: String
    slug: String
    theme: String
    content: String
    author: Types.ObjectId
}

const blogSchema = new Schema<IBlogSchema>({
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
        ref: "staff"
      }
})

const blogModel = mongoose.models.blog || model("blog", blogSchema)
export default blogModel