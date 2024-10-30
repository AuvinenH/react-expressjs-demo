import { useState } from "react";
import { useEffect } from "react";
import { getTasks } from "./server/src/services/apiServices";

// Lataus muuttuja, jonka avulla voidaan piillottaa tehtävälista tarvittaessa
const [loading, setLoading] = useState<boolean>(true);

// Virhe muuttuja jonka avulla voidaan ilmaista, mikäli api-kutsu ei onnistunut
const [error, setError] = useState<string | null>(null);

const [taskList, setTaskList] = useState<boolean>(true);

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