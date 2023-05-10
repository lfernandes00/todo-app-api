require("dotenv").config();
import express from "express";

import userRouter from "./routes/users.routes";
import projectRouter from "./routes/projects.routes";
import taskRouter from "./routes/tasks.routes";

declare global {
  namespace Express {
    export interface Request {
      loggedUserId: number;
    }
  }
}

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use("/users", userRouter);
app.use("/projects", projectRouter);
app.use("/tasks", taskRouter);

app.listen(port, () => console.log(`Server running on Port: ${port}`));
