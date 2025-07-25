'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
export default function EditBlog() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [token, setToken] = useState('');
  useEffect(() => {
    const savedToken = localStorage.getItem('token');

    if (!savedToken) {
      router.push('/login');
      return;
    }

    setToken(savedToken);

    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/blogs/${id}`);
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        console.error('Failed to load blog:', err);
      }
    };

    fetchBlog();
  }, [id, router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/api/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, content })
    });

    if (res.ok) {
      router.push(`/${id}`);
    } else {
      console.error('Failed to update blog');
    }
  };

  return (
    <main className="min-h-screen bg-black p-6">
      <div className="max-w-2xl bg-white mx-auto p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">✏️ Edit Blog</h2>
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="p-2 border border-purple-300 rounded text-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Content"
            className="p-2 border border-purple-300 rounded min-h-[150px] text-black"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button className="bg-purple-700 text-white px-4 py-2 rounded-full">Update</button>
        </form>
      </div>
    </main>
  );
}
