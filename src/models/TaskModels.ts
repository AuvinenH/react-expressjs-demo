// Define an enum for task status
export enum TaskStatusEnum {
  NEW = "new",
  IN_PROGRESS = "inprogress",
  DONE = "done",
}

// Update the Task type to include the status field
export type Task = {
  id: string;
  name: string;
  content: string;
  startDate?: Date | null;
  endDate?: Date | null;
  status: TaskStatusEnum; // Add the status field with the TaskStatusEnum type
};

// TaskListModel to represent a list of tasks
export type TaskListModel = {
  tasks: Task[] | null;
};
