import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from './routes/tasks.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
