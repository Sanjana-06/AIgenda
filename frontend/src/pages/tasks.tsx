import { useEffect, useState } from "react";
import { generateTasks, saveTask, getTasks } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TaskList from "@/components/TaskList";

type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
};

const USER_ID = 1; // Replace with dynamic ID from auth later

export default function TasksPage() {
  const [topic, setTopic] = useState("");
  const [generatedTasks, setGeneratedTasks] = useState<string[]>([]);
  const [savedTasks, setSavedTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  // Load saved tasks from backend on mount
  useEffect(() => {
    getTasks(USER_ID).then(setSavedTasks);
  }, []);

  // Handle task generation via Gemini API
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const tasks = await generateTasks(topic);
      setGeneratedTasks(tasks);
    } catch (err) {
      alert("Failed to generate tasks");
    }
    setLoading(false);
  };

  // Save selected task to DB
  const handleSave = async (taskText: string) => {
    try {
      await saveTask({ title: taskText, userId: USER_ID });
      const updated = await getTasks(USER_ID);
      setSavedTasks(updated);
    } catch (err) {
      alert("Failed to save task");
    }
  };

  return (
    <main className="max-w-xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-2xl font-bold text-center">AI Task Generator</h1>

      <div className="flex gap-2">
        <Input
          placeholder="Enter a topic (e.g. Learn TypeScript)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </Button>
      </div>

      {generatedTasks.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Generated Tasks</h2>
          <ul className="space-y-2">
            {generatedTasks.map((task, index) => (
              <li
                key={index}
                className="bg-gray-100 p-3 rounded flex justify-between items-center"
              >
                <span>{task}</span>
                <Button size="sm" onClick={() => handleSave(task)}>
                  Save
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold mb-2">Saved Tasks</h2>
        <TaskList
          tasks={savedTasks}
          onEdit={(id) => alert("Edit feature coming soon")}
          onDelete={() => alert("Delete feature coming soon")}
        />
      </div>
    </main>
  );
}
