import { Router, Response } from "express";
import { TaskI } from "../types/TaskType";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import Task from "../models/Task";

const router = Router();


//* new task
router.post("/", authMiddleware, async(req:AuthRequest, res:Response)=> {
    console.log("REST: request to create new task");
    try{
        const {title, desc, deadLine, dateTime, importance} = req.body;

        if(!title || !deadLine || !dateTime) {
            return res.status(400).json({message: "Title, DateTime and DeadLine are required Fields..!"});
        }

        const task = Task.create({
            title,
            desc,
            dateTime,
            deadLine,
            importance,
            userId :req.userId
        });
        res.status(201).json({task: task})
    } catch(err) {
        res.status(500).json({message: "Server Error ", error:(err as Error).message})
    }
})

//* Get all Tasks
router.get("/", authMiddleware, async(req:AuthRequest, res:Response) => {
    console.log("REST: request to list all tasks")
    try {
        const tasks = await Task.find({userId: req.userId}).sort()
        if(!tasks) {
            return res.status(400).json({message: "No Tasks at the moment..!"})
        }
        res.json(tasks)
    } catch(err) {
        res.status(500).json({message:"Server Error, ", error:(err as Error).message});
    }
})

//* update a task
router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId }, // ensures users can only edit their own tasks
      req.body,
      { new: true } // return the updated document, not the old one
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: (err as Error).message });
  }
});

//* delete a task
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: (err as Error).message });
  }
});

export default router