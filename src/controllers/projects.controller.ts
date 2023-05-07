import { Request, Response } from "express";

import db from "../models/db";

const Project = db.project;

interface Project {
  id?: number;
  userId: number;
  name: string;
  isFavourite: boolean;
}

export const create = (req: Request, res: Response) => {
  const { userId, name } = req.body;

  const newProject = {
    userId, // change to logged user id
    name,
    isFavourite: false,
  };

  Project.create(newProject)
    .then(() => {
      res.status(201).json({
        message: "New project with created with success",
      });
    })
    .catch(({ message }) => res.status(500).json({ message }));
};

export const listAll = (req: Request, res: Response) => {
  Project.findAll()
    .then((projects: Project) => {
      if (!projects) {
        res.status(404).json({ message: "0 projects founded!" });
      } else {
        res.status(200).json(projects);
      }
    })
    .catch(({ message }) => res.status(500).json({ message }));
};

export const update = (req: Request, res: Response) => {
  const { projectId } = req.params;

  Project.findOne({ where: { id: projectId } }).then((project: Project) => {
    if (!project) {
      res
        .status(404)
        .json({ message: `Project with id ${projectId} not found` });
    } else {
      // Add verification to check if the logged user is the owner of the project
      Project.update(req.body, { where: { id: projectId } })
        .then((num: number) => {
          if (num == 1) {
            res.status(200).json({
              message: `Project with id ${projectId} updated with success`,
            });
          } else {
            res.status(404).json({ message: "Error while updating user" });
          }
        })
        .catch(({ message }) => res.status(500).json({ message }));
    }
  });
};
