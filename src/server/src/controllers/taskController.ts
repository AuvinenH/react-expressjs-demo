import { Request, Response } from 'express';
import Task from '../models/taskModel';

export const sayHello = (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express!' });
};
const exampleTaskList: string[] = ["Task1", "Task2", "Task3", "Task4"];

//määritellään getTasks-funktio joka hakee kaikki tehtävät tietokannasta
export const getTasks = async (req: Request, res: Response) => {
  try {
    //haetaan kaikki tehtävät Task-mallin avulla
    const tasks = await Task.find();
    //jos haku onnistuu, palautetaan tehtävät JSON-muodossa ja statuskoodilla 200 (OK)
    res.status(200).json(tasks);
  } catch (error: unknown) {
    //virheen sattuessa palautetaan virheilmoitus ja statuskoodi 500 (Internal Server Error)
    res.status(500).json({ message: "Could not get tasks from db" });
  }
};

//createTask-controller joka luo ja tallentaa uuden tehtävän tietokantaan
export const createTask = async (req: Request, res: Response) => {
  try {
    //luodaan uusi newTask-muuttuja käyttäen Task-mallia ja req.body:n tietoja
    const newTask = new Task({
      name: req.body.name,
      content: req.body.content,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    });

    //tallennetaan newTask MongoDB:hen
    const savedTask = await newTask.save();

    //palautetaan save-metodin palauttama response eli tallennettu tehtävä
    res.status(201).json(savedTask);
  } catch (error: unknown) {
    //käsitellään mahdollinen virhe ja palautetaan virheviesti
    res.status(500).json({ message: "Could not create task", error });
  }
};
