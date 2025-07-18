'use client'
import Link from 'next/link';
import { useEffect, useState } from "react";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/blogs')
        const data = await res.json()
        console.log("Fetched data:", data);
        setBlogs(data);
      }
      catch (err) {
        console.error('Failed to fetch blogs:', err);
      }
    }
    fetchBlogs();
  }, [])
  return (
    <main className="bg-black min-h-screen p-6">
      <div className="max-w-auto mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">Welcome to Bit by Blog!</h1>
        <div className="flex justify-end mb-4">
          <Link href="/new" className="bg-purple-700 text-white px-4 py-2 rounded-full">+ New Post</Link>
        </div>
        <div className="flex gap-6 flex-col">
          {Array.isArray(blogs) && blogs.length === 0 ? (
            <p>No posts found</p>
          ) : (
            blogs.map((blog) => (
              <Link key={blog._id} href={`/${blog._id}`} className="block bg-white p-4 rounded-xl shadow mb-4 hover:bg-purple-50">
                <h2 className="font-bold text-xl text-purple-700">{blog.title}</h2>
                <p className="text-black">{blog.content.slice(0, 80)}...</p>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
