import axios from "axios"
import baseURL from "./render"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Navbar2 from "./navbar2"

export default function Allposts() {
    const [blogs, setblogs] = useState([])
    useEffect(() => {
        async function fetchdata() {
            const response = await axios.get(`${baseURL}/api/blogs`)
            setblogs(response.data.blogs)
        }
        fetchdata()
    }, [])

    return (
        <div>
            <div><Navbar2 /></div>
            <h1 className="text-4xl font-bold text-center py-8">All Blogs</h1>
            <div className="grid grid-cols-3 gap-10 container mx-auto py-4 px-10">
                {
                    blogs.slice().reverse().map((blog, idx) => (
                        <Link to={`/blogdetails/${blog._id}`} key={idx}>
                            <div key={blog._id} className="border border-gray-200 h-full">
                                <img src={blog.image} alt={blog.title} className="w-full object-cover mb-4" />
                                <div className="px-4 py-8 grid gap-4">
                                <div className="text-xs">{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {blog.readingTime} min read </div>
                                <div className="text-sm border-2 border-gray-200 m-auto ml-0 py-[0.2rem] px-[0.4rem] rounded text-center">
                                    {blog.category}
                                </div>
                                <h2 className="text-2xl font-my">{blog.title}</h2>
                                </div>
                            </div>

                        </Link>
                    ))
                }</div>
        </div>
    )
}