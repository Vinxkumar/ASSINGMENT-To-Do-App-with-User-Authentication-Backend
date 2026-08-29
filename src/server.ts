import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import route from "./routes/auth";
import router from "./routes/tasks"


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", route)
app.use("/api/task", router)


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

mongoose
    .connect(MONGO_URI)
    .then(()=> console.log("Mongese Connected", MONGO_URI))
    .catch((err)=> console.log("MongoDB Connection Error: ", err))

app.get("/", (req, res) => {
    res.send("Todo API is running")
})

app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
});
