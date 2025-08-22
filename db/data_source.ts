import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "./env.ts";
import { User } from "./entities/User.ts";

export const AppDataSource = new DataSource({
  url: env.DB_CONNECTION_STRING,
  type: "postgres",
  logging: true,
  synchronize: false,
  entities: [User],
  migrations: ["./migrations/*.ts"],
});

export async function getDataSource() {
  try {
    if (!AppDataSource.isInitialized) return await AppDataSource.initialize();
  } catch (error) {
    console.log(error);
  }
}
