import { Request, Response } from 'express';

export const sayHello = (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express!' });
};
const exampleTaskList: string[] = ["Task1", "Task2", "Task3", "Task4"];
export const getTasks = (req: Request, res: Response) => {
    res.json({ tasks: exampleTaskList });
  };