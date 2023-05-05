import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { signup, signin } from "../controllers/users.controller";

const router = Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router
  .route("/signup")
  .post(
    [
      body("email").notEmpty().isEmail(),
      body("password").notEmpty().escape(),
      body("name").notEmpty().escape(),
    ],
    function (req: Request, res: Response) {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        signup(req, res);
      } else {
        res.status(400).send(errors);
      }
    }
  );

router
  .route("/signin")
  .post(
    [body("email").notEmpty().isEmail(), body("password").notEmpty().escape()],
    function (req: Request, res: Response) {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        signin(req, res);
      } else {
        res.status(400).send(errors);
      }
    }
  );

export default router;
