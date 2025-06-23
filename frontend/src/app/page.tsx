import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to AIgenda 🚀</h1>
      <p className="mb-6 text-gray-600">Your AI-powered task planner</p>
      <Link
        href="/tasks"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Go to Tasks
      </Link>
    </main>
  );
}
