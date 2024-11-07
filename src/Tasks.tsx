import { useState } from "react";
import { useEffect } from "react";
import { getTasks } from "./server/src/services/apiServices";

export type Task = {}

// Lataus muuttuja, jonka avulla voidaan piillottaa tehtävälista tarvittaessa
const [loading, setLoading] = useState<boolean>(true);

// Virhe muuttuja jonka avulla voidaan ilmaista, mikäli api-kutsu ei onnistunut
const [error, setError] = useState<string | null>(null);

const Tasks = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    // Kutsutaan erillistä API-kutsufunktiota
    getTasks()
      .then((data) => {
        setTaskList(data.message); // Asetetaan viesti newTask:lle
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message); // Asetetaan virheviesti
        setLoading(false);
      });
  }, []);

  // Käsittele uuden tehtävän luonti, lisäämällä se listaan
function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (!newTask) return;
  setTaskList([...taskList, newTask]);
  setNewTask("");
}

// Käsittele tehtävän poisto
const handleDeleteTask = (task: string) => {
  return;
  // setTaskList(taskList.filter((listItem: string) => listItem !== task));
};

};




