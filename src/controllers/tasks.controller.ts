import { Request, Response } from "express";

import db from "../models/db";

const Task = db.task;
const Project = db.project;
const Type = db.type;

interface Task {
  id?: number;
  projectId: number;
  typeId: number;
  description: string;
  status: number;
  milestone: string;
}

export const create = (req: Request, res: Response) => {
  const { projectId, typeId, description, milestone } = req.body;

  const newTask = {
    projectId,
    typeId,
    description,
    status: 1,
    milestone,
  };

  Task.create(newTask)
    .then(() =>
      res.status(201).json({ message: "New Task create with success" })
    )
    .catch(({ message }) => res.status(500).json({ message }));
};

export const listAll = (req: Request, res: Response) => {
  const { projectId } = req.params;

  Task.findAll({
    where: { projectId },
    include: [
      {
        model: Project,
        attributes: ["name"],
      },
      {
        model: Type,
        attributes: ["description"],
      },
    ],
  })
    .then((tasks: Task) => {
      if (!tasks) {
        res.status(404).json({ message: "0 tasks founded!" });
      } else {
        res.status(200).json(tasks);
      }
    })
    .catch(({ message }) => res.status(500).json({ message }));
};
