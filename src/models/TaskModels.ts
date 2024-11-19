export type TaskListModel = {
  tasks: Task[] | null;
};

export type Task = {
  id: string;
  name: string;
  content: string;
  startDate?: Date | null;
  endDate?: Date | null;
};
