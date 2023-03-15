import { model, Schema } from "mongoose";

interface IStaffSchema {
    username: String
    password: String
    displayName: String
}

const staffSchema = new Schema<IStaffSchema>({
      username: {
        type: String,
        required: true
      }  ,
      password: {
        type: String,
        required: true
      },
      displayName: {
        type: String,
        required: true
      }
})

export default model("staff", staffSchema)