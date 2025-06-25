"use client";
import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/tasks");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-slate-900 text-white px-4">
      <form onSubmit={handleLogin} className="w-full max-w-sm bg-slate-800 p-6 rounded-xl space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-slate-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-slate-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded text-white font-semibold"
        >
          Sign In
        </button>
        <p className="text-center text-sm mt-2">
          Don&apos;t have an account? <a href="/signup" className="text-purple-400 hover:underline">Sign up</a>
        </p>
      </form>
    </main>
  );
}