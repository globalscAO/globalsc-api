import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import path from "path";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: +(process.env.DB_PORT || 3306),
  username: process.env.DB_USERNAME || "admin",
  password: process.env.DB_PASSWORD || "admin",
  database: process.env.DB_DATABASE || "global_services_db",
  synchronize: !isProd,
  logging: !isProd,
  ssl: isProd
    ? {
        rejectUnauthorized: false,
      }
    : undefined,
  entities: [
    path.join(
      __dirname,
      isProd ? "../entities/*.{js,ts}" : "./entities/*.{ts,js}"
    ),
  ],
  migrations: [
    path.join(
      __dirname,
      isProd ? "../migrations/*.{js,ts}" : "./migrations/*.{ts,js}"
    ),
  ],
});

AppDataSource.initialize()
  .then(() => {
    console.log(
      `Banco de dados conectado com sucesso (${isProd ? "PRODUÇÃO" : "DEV"})`
    );
  })
  .catch((err) => {
    console.error("Erro durante a conexão:", err);
  });

export default AppDataSource;
