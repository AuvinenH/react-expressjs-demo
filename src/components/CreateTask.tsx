import React, { useState } from "react";
import { createTask } from "../server/src/services/apiServices"; // Tuodaan createTask API-kutsu
import { Task } from '../models/TaskModels'; // Määrittele Task-tyyppi client-puolella

const CreateTask = () => {
  // Määritellään lomakkeen kentille state-muuttujat
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // handleSubmit-metodi, joka käsittelee lomakkeen lähetyksen
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Estetään sivun uudelleenlataus lomakkeen lähetyksessä

    // Uuden tehtävän objekti
    const newTask: Task = {
      name,
      content,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    };

    try {
      // Kutsutaan createTask APIa uuden tehtävän luomiseksi
      const createdTask = await createTask(newTask);
      console.log("Tehtävä luotu onnistuneesti:", createdTask);

      // Tyhjennetään lomakkeen kentät lähetyksen jälkeen
      setName("");
      setContent("");
      setStartDate("");
      setEndDate("");
    } catch (error) {
      console.error("Tehtävän luonti epäonnistui:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
      <h2 className="text-2xl font-semibold">Luo uusi tehtävä</h2>
      
      <label>
        Tehtävän nimi:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 p-2 rounded"
        />
      </label>
      
      <label>
        Tehtävän sisältö:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="border border-gray-300 p-2 rounded"
        />
      </label>
      
      <label>
        Aloituspäivämäärä:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
      </label>
      
      <label>
        Lopetuspäivämäärä:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
      </label>
      
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Luo tehtävä
      </button>
    </form>
  );
};

export default CreateTask;
