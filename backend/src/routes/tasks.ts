import { Router } from "express";
import { z } from "zod";
import {generateTasks} from '../utils/gemini.js';
import {db} from '../db/db.js';
import { users, tasks } from "../db/schema";
import { eq } from "drizzle-orm";

const router = Router();

// Generate tasks using AI
router.post("/generate", async (req, res) => {
  const schema = z.object({ topic: z.string().min(1) });
  const { topic } = schema.parse(req.body);
  console.log(process.env.GEMINI_API_KEY)
  try {
    const tasks = await generateTasks(topic);
    res.json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Task generation failed" });
  }
});

// Save a new task to database
router.post("/save", async (req, res) => {
  const schema = z.object({
    title: z.string(),
    description: z.string().optional(),
    category: z.string().optional(),
    userId: z.number(),
  });

  try {
    const { title, description, category, userId } = schema.parse(req.body);

    // Manually check if user exists using Drizzle ORM's select
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    // If user doesn't exist, insert a dummy user
    if (existingUser.length === 0) {
      await db.insert(users).values({
        id: userId,
        name: `User ${userId}`,
        email: `user${userId}@example.com`,
      });
    }

    // Now insert task
    const newTask = await db.insert(tasks).values({
      title,
      description,
      category,
      userId,
    });

    res.status(201).json({ message: "Task saved", newTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Saving task failed" });
  }
});


// Get all tasks for a user
router.get("/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const allTasks = await db.select().from(tasks).where(eq(tasks.userId, userId));
  res.json(allTasks);
});

// Update an existing task
router.put("/:id", async (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, completed, category } = req.body;

  await db.update(tasks)
    .set({ title, description, completed, category })
    .where(eq(tasks.id, taskId));
    
  res.json({ message: "Task updated" });
});

// Delete a task
router.delete("/:id", async (req, res) => {
  const taskId = parseInt(req.params.id);
  await db.delete(tasks).where(eq(tasks.id, taskId));
  res.json({ message: "Task deleted" });
});

router.patch("/:id/toggle", async (req, res) => {
  const taskId = parseInt(req.params.id);
  const [task] = await db.select().from(tasks).where(eq(tasks.id, taskId));
  await db.update(tasks).set({ completed: !task.completed }).where(eq(tasks.id, taskId));
  res.json({ message: "Task toggled" });
});
export default router;
