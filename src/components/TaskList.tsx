import { Task, TaskStatusEnum } from "../models/TaskModels";

interface TaskListProps {
  taskList: Task[];
  onDeleteTask: (task: string) => void;
}

// Function to get badge color based on status
const getBadgeColor = (status: TaskStatusEnum) => {
  switch (status) {
    case TaskStatusEnum.NEW:
      return "badge-primary"; // Blue for 'New'
    case TaskStatusEnum.IN_PROGRESS:
      return "badge-warning"; // Yellow for 'In Progress'
    case TaskStatusEnum.DONE:
      return "badge-success"; // Green for 'Done'
    default:
      return "badge-secondary"; // Default color
  }
};

const TasksList = ({ taskList, onDeleteTask }: TaskListProps) => {
  return (
    <ul>
      {taskList.map((task: Task, index: number) => (
        <li
          key={index}
          className="flex justify-between items-center bg-base-200 p-4 mb-2 rounded"
        >
          <div className="flex flex-col">
            <span className="font-semibold">{task.name}</span>
            <span className="text-gray-600">{task.content}</span>
          </div>
          <div className="flex items-center space-x-4">
            {/* Status badge */}
            <span className={`badge ${getBadgeColor(task.status)}`}>
              {task.status}
            </span>
            {/* Delete button */}
            <button
              className="btn btn-error"
              onClick={() => onDeleteTask(task.name)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TasksList;

