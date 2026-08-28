import mongoose, {Schema} from "mongoose";
import { UserI } from "../types/UserType";

const UserSchema = new Schema<UserI>({
    email: {type:String, required:true, unique:true },
    password: {type: String, required: true}
})

export default mongoose.model<UserI>("User", UserSchema);