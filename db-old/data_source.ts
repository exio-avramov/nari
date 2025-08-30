import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "./env.ts";
import { UserProfile } from "./entities/user_profile.ts";
import { User } from "./entities/user.ts";

export const AppDataSource = new DataSource({
  url: env.DB_CONNECTION_STRING,
  type: "postgres",
  logging: true,
  synchronize: false,
  entities: [User, UserProfile],
  migrations: ["./migrations/*.ts", "./db/migrations/*.ts"],
});

export async function getDataSource() {
  try {
    if (!AppDataSource.isInitialized) return await AppDataSource.initialize();
  } catch (error) {
    console.log(error);
  }
}
