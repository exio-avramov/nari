import { config } from "dotenv";
import z from "zod";

config();

export const env = {
  DB_CONNECTION_STRING: z
    .string()
    .min(1, "DB_CONNECTION_STRING is missing")
    .parse(process.env.DB_CONNECTION_STRING),
};
