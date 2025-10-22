import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import "./database/datasource";
import routes from "./routes";
import { errorMiddleware } from "./middleware/error.middleware";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://globalsc-website-v2.vercel.app",
    ],
    credentials: true,
  })
);

app.use("/api", routes);

app.use(errorMiddleware);

export default app;
