import type { Request, Response } from "express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AppDataSource from "./database/datasource";
import routes from "./routes";
import { errorMiddleware } from "./middleware/error.middleware";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://globalsc-website-v2.vercel.app"],
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date() });
});

app.use("/api", routes);
app.use(errorMiddleware);

async function garantirConexaoBancoDeDados() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log("Conexão com o banco de dados estabelecida (inicialização sob demanda).");
  }
}

export default async function handler(req: Request, res: Response) {
  try {
    await garantirConexaoBancoDeDados();
    app(req, res);
  } catch (erro) {
    console.error("Erro ao inicializar a conexão com o banco de dados:", erro);
    res.status(500).json({ erro: "Falha ao conectar ao banco de dados" });
  }
}
