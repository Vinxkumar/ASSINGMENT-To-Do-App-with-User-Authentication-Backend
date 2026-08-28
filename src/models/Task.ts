import mongoose, {Schema} from "mongoose";
import {TaskI} from "../types/TaskType"

const TaskScheme = new Schema<TaskI>({
    title: {type: String, required: true},
    desc: {type: String, required:true, default:""},
    dateTime: {type: Date, required:true},
    deadLine: {type: Date, required:true},
    importance: {type: String, enum:["low", "medium", "high"], default:"medium"},
    status: {type: Boolean, default:false},
    userId:{type:Schema.Types.ObjectId, ref:"User", required:true}
});

export default mongoose.model<TaskI>("Tasks", TaskScheme);
