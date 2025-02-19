import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import baseURL from "./render";

export default function Authorprofile() {
  const { userId } = useParams(); 
  const [author, setAuthor] = useState(null);
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!userId) return;

        const response = await axios.get(`${baseURL}/api/auth/user/${userId}`);

        setAuthor(response.data.user);
      } catch (err) {
        console.error("Profile Fetch Error:", err);
        navigate("/"); 
      }
    };

    fetchProfile();
  }, [userId, navigate]);

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
    <div className="px-[15rem] min-h-screen">
      <div className="p-10">
        {author ? (
          <>
          <div className="flex gap-[10rem]"><div className="border-r-2 px-[4rem] border-[#d25d5d]">
            <img
              src={author.profilepic || "No image"}
              
              className="w-[13rem] h-[13rem] rounded-full border-2 border-gray-300 object-cover"
            /></div><div className="pl-0">
            <h2 className="text-2xl font-semibold mt-4">
              {author.firstName} {author.lastName}
            </h2>
            <p className="text-gray-500 mt-4">{author.about || "No bio available"}</p></div></div>

            <div className="mt-20">
              <span className="text-xl font-semibold">All Blogs By {author.firstName} {author.lastName}</span>
              <div className="grid grid-cols-3 gap-10 container py-8">
                    {blogs?.slice().reverse().map((blog, idx) => (
                        <Link to={`/blogdetails/${blog._id}`} key={idx}>
                        <div key={blog?._id} className="border border-gray-200 h-full" onMouseEnter={() => setHoverBlog(blog._id)}
                                onMouseLeave={() => setHoverBlog(null)}>
                            <img src={blog?.image} alt={blog?.title} className="w-full object-cover mb-4"/>
                            <div className="px-4 py-8 grid gap-4 relative">
                                <div className="text-xs">{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {blog.readingTime} min read </div>
                                <div className="text-sm border-2 border-gray-200 m-auto ml-0 py-[0.2rem] px-[0.4rem] rounded text-center">
                                    {blog.category}
                                </div>
                                <h2 className="text-2xl font-my relative">{blog.title}</h2>
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
}
