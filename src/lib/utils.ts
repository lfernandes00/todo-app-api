import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";

import config from "../config/auth.config";
import db from "../models/db";

const User = db.user;

export const validateToken = (req: Request, res: Response) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(
    token.replace("Bearer ", ""),
    config.secret,
    (error, decoded: JwtPayload) => {
      if (error) {
        return res.status(401).json({ message: "Invalid token!" });
      }

      User.findOne({ where: { id: decoded.user.id } })
        .then((user) => {
          if (!user) {
            res.status(404).json({ message: "User not found!" });
          }
        })
        .catch(({ message }) => res.status(500).json({ message }));

      // req.loggedUserId = decoded.user.id;
      // req.loggedUserRole = decoded.user.roleId;
    }
  );
};
