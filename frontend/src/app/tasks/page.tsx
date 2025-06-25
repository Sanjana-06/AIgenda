"use client";
import { useEffect, useState } from "react";
import { generateTasks, saveTask, getTasks, updateTask, deleteTask } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TaskList from "@/components/TaskList";
import { Brain, Zap, Plus, ArrowLeft } from "lucide-react";
import AuthGuard from "@/components/authGuard";
import Link from "next/link";

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

const USER_ID = 1;

const Tasks = () => {
  const [topic, setTopic] = useState("");
  const [generatedTasks, setGeneratedTasks] = useState<string[]>([]);
  const [savedTasks, setSavedTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTasks(USER_ID).then(setSavedTasks);
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const tasks = await generateTasks(topic);
      const existingTitles = savedTasks.map((task) => task.title);
      const uniqueTasks = tasks.filter((t: string) => !existingTitles.includes(t));
      setGeneratedTasks(uniqueTasks);
    } catch (err) {
      alert("Failed to generate tasks");
    }
    setLoading(false);
  };

  const handleSave = async (taskText: string) => {
    try {
      await saveTask({ title: taskText, userId: USER_ID });
      const updated = await getTasks(USER_ID);
      setSavedTasks(updated);
      setGeneratedTasks(generatedTasks.filter((t) => t !== taskText));
    } catch (err) {
      alert("Failed to save task");
    }
  };

  const handleComplete = async (id: number) => {
    await updateTask(id, { completed: true });
    const updated = await getTasks(USER_ID);
    setSavedTasks(updated);
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    const updated = await getTasks(USER_ID);
    setSavedTasks(updated);
  };

  const handleEdit = (id: number) => {
    const newTitle = prompt("Edit task title:");
    if (newTitle) {
      updateTask(id, { title: newTitle }).then(async () => {
        const updated = await getTasks(USER_ID);
        setSavedTasks(updated);
      });
    }
  };

  const totalTasks = savedTasks.length;
  const completedTasks = savedTasks.filter((task) => task.completed).length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
  <AuthGuard>
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">AI Task Generator</h1>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h2 className="text-xl font-semibold text-white">Generate Tasks</h2>
          </div>
          <div className="flex gap-3">
            <Input
              placeholder="Enter a topic (e.g. Learn TypeScript)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
            />
            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </div>
        {generatedTasks.length > 0 && (
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              Generated Tasks
            </h2>
            <div className="space-y-3">
              {generatedTasks.map((task, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 flex justify-between items-center hover:bg-white/15 transition-all duration-300"
                >
                  <span className="text-gray-200 flex-1">{task}</span>
                  <Button
                    size="sm"
                    onClick={() => handleSave(task)}
                    className="bg-green-600 hover:bg-green-700 text-white ml-3"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        {totalTasks > 0 && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-300 mb-1">
              <span>Progress</span>
              <span>{progress}% Complete</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-400 rounded"></div>
            Your Tasks ({savedTasks.length})
          </h2>
          <TaskList
            tasks={savedTasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onComplete={handleComplete}
          />
        </div>
      </div>
    </main>
   </AuthGuard> 
  );
};

export default Tasks;
