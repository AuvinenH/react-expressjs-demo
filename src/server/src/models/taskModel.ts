import mongoose, { Document, Schema } from "mongoose";

// Define an enum for task status
export enum TaskStatusEnum {
  NEW = "new",
  IN_PROGRESS = "inprogress",
  DONE = "done",
}

// TypeScript interface for Task data
export interface ITask extends Document {
  name: string;
  content: string;
  startDate: Date;
  endDate: Date;
  status: TaskStatusEnum; // Add the status field to the interface
}

// Mongoose schema for the Task model
const taskSchema: Schema = new Schema(
  {
    name: { type: String, required: true }, // Task name
    content: { type: String, required: true }, // Task content
    startDate: { type: Date, required: false }, // Task start date
    endDate: { type: Date, required: false }, // Task end date
    status: {
      type: String,
      enum: Object.values(TaskStatusEnum), // Use the enum values
      default: TaskStatusEnum.NEW, // Set a default status
    },
  },
  {
    timestamps: true, // Automatically create createdAt and updatedAt fields
    collection: "Tasks", // Specify the collection name
  }
);

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
