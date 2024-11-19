import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import { getTasks, deleteTask } from "../services/apiServices";
import { Task } from "../models/TaskModels";
import CreateTask from "../components/CreateTask";
import { AxiosError } from "axios";

const Tasks = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);

  // Lataus muuttuja, jonka avulla voidaan piillottaa tehtävälista tarvittaessa
  const [loading, setLoading] = useState<boolean>(true);

  // Virhe muuttuja jonka avulla voidaan ilmaista, mikäli api-kutsu ei onnistunut
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Kutsutaan erillistä API-kutsufunktiota
    getTasks()
      .then((data) => {
        setTaskList(data); // Asetetaan uusi arvo taskList:lle
      })
      .catch((error) => {
        setError(error.message); // Asetetaan virheviesti
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

// Updated handleDeleteTask with better error handling
const handleDeleteTask = async (taskId: string) => {
  try {
    // Call API to delete the task from the backend
    await deleteTask(taskId);
    
    // Update the local state after successful deletion
    setTaskList(taskList.filter((listItem) => listItem.id !== taskId));
  } catch (error) {
    const err = error as AxiosError;
    
    // Check if there is a response and if it has data
    const errorMessage = err.response?.data || err.message || "Unknown error occurred";
    console.error("Failed to delete task:", errorMessage);
    
    setError(`Failed to delete task: ${errorMessage}`);
  }
};


  return (
    <>
      <div className="card shadow-lg rounded-lg p-4 max-w-lg">
        <h2 className="text-4xl font-bold mb-4">Tasks</h2>
        <div className="flex mb-4">
          <CreateTask />
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <TaskList taskList={taskList} onDeleteTask={handleDeleteTask} />
        )}
        {error && (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Tasks;
