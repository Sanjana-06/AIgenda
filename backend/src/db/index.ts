import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as dotenv from "dotenv";
// Load environment variables from the .env file
dotenv.config();

// Create a new PostgreSQL connection pool using the DATABASE_URL from the environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  //PostgreSQL connection URL
});

// Initialize and export the drizzle ORM instance using the created pool
export const db = drizzle(pool);

