import { useEffect, useState } from "react";

export default function Yourblogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:4000/api/blogs/blogs")
            .then((res) => res.json())
            .then((data) => {
                setBlogs(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
        {blogs.map((blog, index) => (
    <div key={index}>
        <img src={blog.image} alt={blog.title} className="w-full object-cover h-[21rem]" />
        <div className="p-4">
            <span className="text-sm text-gray-500">{new Date(blog.date).toDateString()}</span><br />
            <button className="mt-3 px-3 py-1 bg-blue-100 rounded-md text-sm">
                {blog.category || "Uncategorized"}
            </button>
            <h2 className="text-lg font-semibold mt-2">{blog.title}</h2>
            <p className="text-gray-600">{blog.content.substring(0, 100)}...</p>
            <p className="text-sm text-gray-500">⏳ {blog.readingTime} min read</p>
        </div>
    </div>
))}

        </div>
    );
}
