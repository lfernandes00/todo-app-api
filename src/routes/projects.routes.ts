import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { create, listAll, update } from "../controllers/projects.controller";
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
    [body("typeId").notEmpty().escape(), body("name").notEmpty().escape()],
    function (req: Request, res: Response) {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        validateToken(req, res), create(req, res);
      } else {
        res.status(400).send(errors);
      }
    }
  );

router.route("/").get(function (req: Request, res: Response) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    validateToken(req, res), listAll(req, res);
  } else {
    res.status(400).send(errors);
  }
});

router.route("/:projectId").patch(function (req: Request, res: Response) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    validateToken(req, res), update(req, res);
  } else {
    res.status(400).send(errors);
  }
});

export default router;
