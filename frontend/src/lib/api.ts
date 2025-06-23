import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Fetches AI-generated tasks based on a topic using the Gemini API
export const generateTasks = async (topic: string) => {
  const response = await axios.post(`${BASE_URL}/tasks/generate`, { topic });
  return response.data.tasks;
};

// Saves a new task to the backend database
export const saveTask = async (task: {
  title: string;
  description?: string;
  category?: string;
  userId: number;
}) => {
  const response = await axios.post(`${BASE_URL}/tasks/save`, task);
  return response.data;
};

// Fetches all tasks for a specific user
export const getTasks = async (userId: number) => {
  const response = await axios.get(`${BASE_URL}/tasks/${userId}`);
  return response.data;
};

// Updates an existing task by ID with the provided fields
export const updateTask = async (
  taskId: number,
  updatedFields: Partial<{
    title: string;
    description: string;
    completed: boolean;
    category: string;
  }>
) => {
  const response = await axios.put(`${BASE_URL}/tasks/${taskId}`, updatedFields);
  return response.data;
};

// Deletes a task from the database by ID
export const deleteTask = async (taskId: number) => {
  const response = await axios.delete(`${BASE_URL}/tasks/${taskId}`);
  return response.data;
};
