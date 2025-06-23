import { pgTable, serial, text, boolean, timestamp, integer, varchar } from "drizzle-orm/pg-core";

// User table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
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
