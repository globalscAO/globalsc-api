import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: !isProd,
  logging: !isProd,
  ssl: isProd ? { rejectUnauthorized: false } : undefined,
  entities: [path.join(__dirname, "../entities/*.{js,ts}")],
  migrations: [path.join(__dirname, "../migrations/*.{js,ts}")],
});

export default AppDataSource;