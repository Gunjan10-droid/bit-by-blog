'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      console.log("Signup response:", data);
      if (!res.ok) {
        alert(`Signup failed: ${data.error || 'Unknown error'}`);
        return;
      }
      alert("Signup successful!");
    } catch (err) {
      console.error("Signup failed", err);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white max-w-md mx-auto mt-10 rounded-xl shadow">
      <h2 className="text-2xl text-purple-700 items-center flex justify-center font-bold mb-4">Sign Up</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full text-black p-2 border rounded mb-4"
        placeholder="Username"
        required
      />
      <input
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 text-black border rounded mb-4"
        placeholder="Password"
        required
      />
      <button className="bg-purple-700 text-white px-4 py-2 rounded-full w-full">Sign Up</button>
    </form>
  );
}
