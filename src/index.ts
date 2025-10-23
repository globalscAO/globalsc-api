
import type { Request, Response } from "express";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import "./database/datasource";
import routes from "./routes";
import { errorMiddleware } from "./middleware/error.middleware";

dotenv.config();

const PORT = process.env.PORT || 3000;

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

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date() });
});

app.use("/api", routes);

app.use(errorMiddleware);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default function handler(req: Request, res: Response) {
  app(req, res);
}
