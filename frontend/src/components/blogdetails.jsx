import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import baseURL from "./render";
import Navbar2 from "./navbar2";

export default function Blogdetails() {
    const { id } = useParams()
    const [blog, setblog] = useState()
    const [loading, setloading] = useState(true)
    useEffect(() => {
        async function fetchdata() {
            const token = localStorage.getItem("token")
            const response = await axios.get(`${baseURL}/api/blogs/${id}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response)
            setblog(response.data.blog)
            setloading(false)
        }
        fetchdata()
    }, [id])
    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>
            <Navbar2 />
            <div className="grid px-[25rem] py-20 gap-8">
                <span className="text-sm">
                    {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="text-6xl font-my leading-snug">
                    {blog.title}
                </span>
                <span className="text-lg">By {blog.author}</span>
                <img src={blog.image} alt="blog image" className="h-[493px] w-[740px]" />
                <div className="w-full overflow-hidden break-words">
                    <pre className="whitespace-pre-wrap break-words font-sans text-lg">
                        {blog.content}
                    </pre>
                </div>
            </div>
        </div>
    );
};