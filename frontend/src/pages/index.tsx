import Link from "next/link";

export default function HomePage() {
  return (
    <main className="h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to AIgenda</h1>
      <p className="mb-6 text-gray-600">
        Your AI-powered personal task manager.
      </p>
      <Link href="/tasks">
        <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
          Go to Tasks
        </button>
      </Link>
    </main>
  );
}
