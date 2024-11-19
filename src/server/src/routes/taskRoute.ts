import { Router } from "express";
import { createTask, deleteTask, getTasks } from "../controllers/taskController";

const router = Router();

// Route to get all tasks
router.get("/tasks", getTasks);

// Route to create a new task
router.post("/tasks", createTask);

// Route to delete a task by ID
//router.delete("/tasks/:id", deleteTask); // Correctly specify the HTTP method and the `:id` parameter

export default router;
