import { pgTable, serial, text, boolean, timestamp, integer } from "drizzle-orm/pg-core";

// User table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  authId: text("auth_id").notNull().unique(), 
  createdAt: timestamp("created_at").defaultNow(),
});

// Main tasks table
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  description: text("description"), // optional field
  completed: boolean("completed").default(false),
  category: text("category"), // for organizing tasks
  createdAt: timestamp("created_at").defaultNow(),
});
