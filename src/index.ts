require("dotenv").config();
import express from "express";

import userRouter from "./routes/users.routes";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use("/users", userRouter);

app.listen(port, () => console.log(`Server running on Port: ${port}`));
