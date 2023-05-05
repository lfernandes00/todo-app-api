import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import config from "../config/auth.config";
import db from "../models/db";

const User = db.user;

interface User {
  id?: number;
  email: string;
  name: string;
  password: string;
}

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;

    let user: User = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ message: "Email is already in use!" });
    }

    user = await User.create({
      email,
      password: bcrypt.hashSync(password, 8),
      name,
    });

    return res.status(201).json({ message: "User created with success!" });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    let user: User = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = bcrypt.compareSync(req.body.password, user.password);

    if (!isValid) {
      return res
        .status(401)
        .json({ accessToken: null, message: "Invalid Password" });
    }

    const token = jwt.sign({ user }, config.secret, { expiresIn: 21600 }); // 6 hours

    const { id, email, name } = user;

    return res.status(200).json({ id, email, name, accessToken: token });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
};
