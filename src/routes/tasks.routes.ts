import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { create, listAll } from "../controllers/tasks.controller";
import { validateToken } from "../lib/utils";

const router = Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router
  .route("/")
  .post(
    [
      body("projectId").isNumeric().notEmpty().escape(),
      body("typeId").isNumeric().notEmpty().escape(),
      body("description").notEmpty().escape(),
      body("milestone").notEmpty().escape(),
    ],
    function (req: Request, res: Response) {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        validateToken(req, res), create(req, res);
      } else {
        res.status(400).send(errors);
      }
    }
  );

router.route("/:projectId").get(function (req: Request, res: Response) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    validateToken(req, res), listAll(req, res);
  } else {
    res.status(400).send(errors);
  }
});

export default router;
