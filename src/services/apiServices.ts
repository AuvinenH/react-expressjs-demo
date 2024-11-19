import axios, { AxiosError, AxiosResponse } from "axios";
import { Task } from "../models/TaskModels";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend URL
  timeout: 5000, // Timeout set to 5 seconds
});

// Function to fetch tasks
export async function getTasks(): Promise<Task[]> {
  try {
    const response: AxiosResponse = await apiClient.get("/tasks");
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(`Error fetching tasks: ${err.response?.data}`);
  }
}

// Function to create a new task
export async function createTask(newTask: Task) {
  try {
    const response: AxiosResponse = await apiClient.post("/tasks", newTask);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(`Error creating task: ${err.response?.data}`);
  }
}

// Function to delete a task
export async function deleteTask(taskId: string) {
  try {
    await apiClient.delete(`/tasks/${taskId}`);
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(`Error deleting task: ${err.response?.data}`);
  }
}
