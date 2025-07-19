'use client'
import Link from 'next/link';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/blogs');
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      }
    };

    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    fetchBlogs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <main className="bg-black min-h-screen p-6">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Welcome to Bit by Blog</h1>
        <div className="flex gap-4">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-full">
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="bg-purple-700 text-white px-4 py-2 rounded-full">Login</Link>
              <Link href="/signup" className="bg-purple-700 text-white px-4 py-2 rounded-full">Signup</Link>
            </>
          )}
        </div>
      </div>

      {/* + New Post button */}
      {isLoggedIn && (
        <div className="flex justify-end mb-4">
          <Link href="/new" className="bg-purple-700 text-white px-4 py-2 rounded-full">+ New Post</Link>
        </div>
      )}

      {/* Blog Posts */}
      <div className="flex gap-6 flex-col">
        {Array.isArray(blogs) && blogs.length === 0 ? (
          <p className="text-white">No posts found</p>
        ) : (
          blogs.map((blog) => (
            <Link key={blog._id} href={`/${blog._id}`} className="block bg-white p-4 rounded-xl shadow mb-4 hover:bg-purple-50">
              <h2 className="font-bold text-xl text-purple-700">{blog.title}</h2>
              <p className="text-black">{blog.content.slice(0, 80)}...</p>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}


