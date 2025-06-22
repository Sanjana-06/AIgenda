import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function generateTasks(topic: string) {
  const prompt = `Generate a list of 5 concise, actionable tasks to learn about ${topic}. Return only the tasks, no numbering or formatting.`;

  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const output = res.data.candidates[0]?.content?.parts[0]?.text || "";
    return output
      .split("\n")
      .filter((line: string) => line.trim().length > 0)
      .map((line: string) => line.trim());
  } catch (error: any) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    throw new Error("Failed to fetch tasks from Gemini API.");
  }
}