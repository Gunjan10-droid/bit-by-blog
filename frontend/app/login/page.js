'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) router.push('/');
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      router.push('/');
    } else {
      setError(data.error); 
    }};
  return (
    <form onSubmit={handleLogin} className="p-6 bg-white max-w-md mx-auto mt-10 rounded-xl shadow">
      <h2 className="text-2xl text-purple-700 items-center flex justify-center font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}

      <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full text-black p-2 border rounded mb-4" placeholder="Username" required />
      <input
  type="password"
  autoComplete="current-password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full p-2 text-black border rounded mb-4"
  placeholder="Password"
  required
/>
      <button className="bg-purple-700 text-white px-4 py-2 rounded-full w-full">Login</button>
    </form>
  );
}
