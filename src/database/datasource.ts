import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_DATABASE || "global_services_db",
  synchronize: !isProd,
  logging: !isProd,
  ssl: isProd
    ? {
        rejectUnauthorized: false,
      }
    : undefined,
  entities: [isProd ? "dist/entities/*.{js,ts}" : "src/entities/*.{ts,js}"],
  migrations: [
    isProd ? "dist/migrations/*.{js,ts}" : "src/migrations/*.{ts,js}",
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
