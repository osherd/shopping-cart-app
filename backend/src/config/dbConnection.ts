import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

let client: Pool;

export const pgClient = (): Pool => {
  if (!client) {
    client = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    })
  }
  return client;
};
