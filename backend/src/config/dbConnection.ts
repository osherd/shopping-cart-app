import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();


// This DBURL should import from .env. but but this is for only demo
const DBURL = 'postgresql://shopping-cart_owner:HwFRQq26nLMa@ep-raspy-smoke-a58plnfo.us-east-2.aws.neon.tech/shopping-cart?sslmode=require'

let client: Pool;

export const pgClient = (): Pool => {
  if (!client) {
    client = new Pool({
      connectionString: process.env.DATABASE_URL || DBURL,
      ssl: {
        rejectUnauthorized: false,
      },
    })
  }
  return client;
};
