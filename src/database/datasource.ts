import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
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
  entities: [isProd ? "dist/entities/*.{js,ts}" : "src/entities/*.{ts,js}"],
  migrations: [
    isProd ? "dist/migrations/*.{js,ts}" : "src/migrations/*.{ts,js}",
  ],
});

export async function initializeDatabase() {
  try {
    await AppDataSource.initialize();
    console.log(`Banco conectado (${isProd ? "PRODUÇÃO" : "DEV"})`);

    const pendingMigrations = await AppDataSource.showMigrations();
    if (pendingMigrations) {
      await AppDataSource.runMigrations();
      console.log("Migrations executadas com sucesso.");
    }
  } catch (err) {
    console.error("Erro ao inicializar o banco:", err);
    process.exit(1);
  }
}
