import axios from "axios";
import baseURL from "./render";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar2 from "./navbar2";
import { useBlog } from "./blogCategory";

export default function Filter() {
    const { category } = useBlog();


    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [blogCounts, setBlogCounts] = useState({});
    const [allBlogCount, setAllBlogCount] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                let url = `${baseURL}/api/blogs`;  
                
                if (category !== "allposts") {
                    url = `${baseURL}/api/blogs/category/${category}`;
                }

                const response = await axios.get(url);

                setBlogs(response?.data?.sortedBlogs);
                setBlogCounts(response?.data?.categoryCount);
                setAllBlogCount(response?.data?.blogCount);

            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [category]);



    return (
        <div>
            <Navbar2 blogCounts={blogCounts} allBlogCount={allBlogCount}/>

            <h1 className="text-4xl font-bold text-center my-10 capitalize">
                {category === "all posts" ? "All Blogs" : `${category.replace("-", " ")} Blogs`}
            </h1>
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : blogs.length > 0 ? (
                <div className="grid grid-cols-3 gap-10 container mx-auto py-4 px-10">
                    {blogs.slice().reverse().map((blog, idx) => (
                        <Link to={`/blogdetails/${blog._id}`} key={idx}>
                            <div className="border border-gray-200 h-full">
                                <img src={blog.image} alt={blog.title} className="w-full object-cover mb-4" />
                                <div className="px-4 py-8 grid gap-4">
                                    <div className="text-xs">{new Date(blog.date).toLocaleDateString()} • {blog.readingTime} min read</div>
                                    <div className="text-sm border-2 border-gray-200 m-auto ml-0 py-[0.2rem] px-[0.4rem] rounded text-center">
                                        {blog.category}
                                    </div>
                                    <h2 className="text-2xl font-my">{blog.title}</h2>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-center mt-4">No blogs found in this category.</p>
            )}
        </div>
    );
}
