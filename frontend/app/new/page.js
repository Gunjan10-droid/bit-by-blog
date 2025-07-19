'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
export default function NewBlog() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!storedToken) {
      router.push('/login');
    } else {
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      if (res.ok) {
        router.push('/');
      } else {
        const error = await res.text();
        console.error('Error creating post:', error);
      }
    } catch (err) {
      console.error('Network error:', err);
    }
  };

  return (
    <main className="min-h-screen bg-black p-6">
      <div className="max-w-2xl bg-white mx-auto p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">📝 Create New Post</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            className="p-2 border text-black border-purple-300 rounded"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Content"
            className="p-2 border border-purple-300 text-black rounded min-h-[150px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button className="bg-purple-700 text-white px-4 py-2 rounded-full">Post</button>
        </form>
      </div>
    </main>
  );
}
