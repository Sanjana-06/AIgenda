import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as dotenv from "dotenv";
// Load environment variables from the .env file
dotenv.config();
// Create a new PostgreSQL connection pool using environment variables for configuration
const pool = new Pool({
  host: process.env.DB_HOST, // Database host 
  port: Number(process.env.DB_PORT), // Database port
  user: process.env.DB_USER, // Username to connect to the database
  password: process.env.DB_PASSWORD, // Password for the database user
  database: process.env.DB_NAME, // Name of the database to connect to
  ssl: false,
});

// Initialize the Drizzle ORM with the PostgreSQL pool for querying the database
export const db = drizzle(pool);