import { Request, Response } from "express";

import db from "../models/db";

const Project = db.project;
const Type = db.type;

interface Project {
  id?: number;
  userId: number;
  name: string;
  isFavourite: boolean;
}

export const create = (req: Request, res: Response) => {
  const { name, typeId } = req.body;

  const newProject = {
    userId: req.loggedUserId,
    typeId: typeId,
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
  Project.findAll({
    include: [
      {
        model: Type,
        attributes: ["description"],
      },
    ],
  })
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

  Project.findOne({ where: { id: projectId } })
    .then((project: Project) => {
      if (!project) {
        res
          .status(404)
          .json({ message: `Project with id ${projectId} not found!` });
      } else {
        if (req.loggedUserId === project.id) {
          Project.update(req.body, {
            where: { id: projectId },
          }).then((num: number) => {
            if (num == 1) {
              res.status(200).json({
                message: `Project with id ${projectId} updated with success!`,
              });
            } else {
              res.status(400).json({ message: "Error while updating project" });
            }
          });
        } else {
          res
            .status(400)
            .json({ message: "Cannot update other users projects" });
        }
      }
    })
    .catch(({ message }) => res.status(500).json({ message }));
};
