'use client'
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
export default function BlogDetails() {
    const { id } = useParams();
    const router = useRouter();
    const [blog, setBlog] = useState(null)
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

    useEffect(() => {
        const fetchBlog = async () => {
            const res = await fetch(`http://localhost:5000/api/blogs/${id}`);
            const data = await res.json();
            setBlog(data);
        };
        fetchBlog();
    }, [id])
    const handleDelete = async () => {
        const confirm = window.confirm('Are you sure you want to delete this blog?');
        if (!confirm) return;
        const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (res.ok) {
            router.push('/');
        }
        else {
            console.error('Failed to delete');
        }
    }
    if (!blog) return <div className="p-6">Loading...</div>
    return (
        <main className="min-h-screen bg-black p-6">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
                <h1 className="text-3xl font-bold text-purple-700 mb-4">{blog.title}</h1>
                <p className="text-black whitespace-pre-wrap">{blog.content}</p>
                <div className="flex gap-4 mt-4">
                    {blog.user === userId && (
                        <>
                            <button
                                onClick={() => router.push(`/${id}/edit`)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-full"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white px-4 py-2 rounded-full"
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>

            </div>
        </main>
    )
}