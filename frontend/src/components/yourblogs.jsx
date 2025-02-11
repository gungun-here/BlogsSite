import { useState, useEffect } from "react";
import baseURL from "./render";
import { Link } from "react-router-dom";

export default function YourBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []); // Runs only once when the component mounts

    useEffect(() => {
        const fetchBlogs = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await fetch(`${baseURL}/api/blogs/getBlogs`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
               
                if (response.ok) {
                    setBlogs(data.blogs);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="min-h-screen p-10">
            <h1 className="text-4xl font-bold text-center mb-10 text-[#d25d5d]">Your Blogs</h1>
            
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : blogs?.length === 0 ? (
                <p className="text-center">No blogs found. Start Writing!</p>
            ) : (
                <div className="grid grid-cols-3 gap-10 container mx-auto py-4 px-10">
                    {blogs?.slice().reverse().map((blog, idx) => (
                        <Link to={`/blogdetails/${blog._id}`} key={idx}>
                        <div key={blog?._id} className="border border-gray-200 h-full">
                            <img src={blog?.image} alt={blog?.title} className="w-full object-cover mb-4"/>
                            <div className="px-4 py-8 grid gap-4">
                                <div className="text-xs">{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {blog.readingTime} min read </div>
                                <div className="text-sm border-2 border-gray-200 m-auto ml-0 py-[0.2rem] px-[0.4rem] rounded text-center">
                                    {blog.category}
                                </div>
                                <h2 className="text-2xl font-my">{blog.title}</h2>
                                </div>
                        </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
} 
