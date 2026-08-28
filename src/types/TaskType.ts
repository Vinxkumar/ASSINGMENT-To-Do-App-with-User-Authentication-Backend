import mongoose, {Document} from "mongoose";

export interface TaskI extends Document {
    title: string;
    desc: string;
    dateTime: Date;
    deadLine: Date;
    importance: "high" | "medium" | "low"
    status: boolean;
    userId: mongoose.Types.ObjectId;
}

export interface TaskResponse {
    title: string;
    desc: string;
    dateTime: Date;
    deadLine: Date;
    importance: "high" | "medium" | "low"
    status: boolean;
}

