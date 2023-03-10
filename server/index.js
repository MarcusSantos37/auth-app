import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { router } from "./router/route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.disable("x-powered-by");

const port = 1337;

// Connect to mongoDB database
mongoose.connect("mongodb://localhost:27017/auth-app");

/** Rotas API */
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
