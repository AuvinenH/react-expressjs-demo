import { Request, Response } from "express";
import Task from "../models/taskModel";

// Existing getTasks function
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error: unknown) {
    res.status(500).json({ message: "Could not get tasks from db" });
  }
};

// Existing createTask function
export const createTask = async (req: Request, res: Response) => {
  const { name, content, startDate, endDate } = req.body;

  try {
    const task = new Task({ name, content, startDate, endDate });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error: unknown) {
    res.status(500).json({ message: "Could not create a new task" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task successfully deleted", deletedTask });
  } catch (error: unknown) {
    res.status(500).json({ message: "Could not delete the task" });
  }
};
