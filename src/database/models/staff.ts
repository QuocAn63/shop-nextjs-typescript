import mongoose, { model, Schema } from "mongoose";

interface IStaffSchema {
    username: String
    password: String
    displayName: String
}

const StaffSchema = new Schema<IStaffSchema>({
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

const Model = model("Staff", StaffSchema)
export default mongoose.models.Staff || Model