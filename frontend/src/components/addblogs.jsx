import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";

export default function Addblogs() {
    const navigate = useNavigate();

    // State for form fields
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [readingTime, setReadingTime] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true);

        // Get JWT token from local storage
        const token = localStorage.getItem("token");
        if (!token) {
            alert("User is not authenticated. Please log in.");
            setLoading(false);
            return;
        }

        // Validate input fields
        if (!title || !content || !image || !category || !readingTime) {
            alert("All fields are required.");
            setLoading(false);
            return;
        }

        // Create blog data object
        const blogData = { title, content, image, category, readingTime };

        try {
            const response = await fetch("http://localhost:4000/api/blogs/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(blogData),
            });

            const responseData = await response.json();
            console.log("Server Response:", responseData);

            if (response.ok) {
                alert("Blog added successfully!");
                navigate("/yourblogs"); // Redirect after success
            } else {
                alert("Error adding blog: " + responseData.message);
            }
        } catch (error) {
            console.error("Error submitting blog:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-t from-[rgb(235,234,230)] via-transparent to-transparent min-h-screen flex flex-col justify-between">
            {/* Main Content */}
            <div className="flex-grow flex items-center justify-center py-20">
                <div className="shadow-2xl w-[60rem] h-[90rem] px-14 py-10 bg-white">
                    <h1 className="text-4xl font-bold text-center">Add Your Blog Here</h1>
                </div>
                <div className="absolute top-80 left-90"> 
                    <form onSubmit={handleSubmit} className="grid gap-8">
                        <div className="flex gap-14">
                            <label htmlFor="title" className="text-xl">Blog Title</label>
                            <input 
                                type="text" 
                                className="border-2 rounded-lg border-gray-200"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="absolute top-80 left-90"> 
                        <div className="flex gap-14">
                            <label htmlFor="title" className="text-xl">Blog Title</label>
                             
                        </div>
                        </div>

                        <div className="flex gap-[2.5rem]">
                            <label htmlFor="image" className="text-xl">Blog Image</label>
                            <input 
                                type="text" 
                                placeholder="Enter URL..." 
                                className="border-2 rounded-lg border-gray-200" 
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex gap-[0.9rem]">
                            <label htmlFor="category" className="text-xl">Blog Category</label>
                            <select 
                                id="category" 
                                name="category" 
                                className="border-2 rounded-lg border-gray-200 w-46"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="">Select an option</option>
                                <option value="health">Health & Lifestyle</option>
                                <option value="fashion">Fashion & Beauty</option>
                                <option value="travel">Travel</option>
                                <option value="it">IT</option>
                            </select>
                        </div>

                        <div className="flex gap-4">
                            <label htmlFor="readingTime" className="text-xl">Reading Time</label>
                            <input 
                                type="number" 
                                className="border-2 rounded-lg border-gray-200" 
                                placeholder="In minutes..." 
                                value={readingTime}
                                onChange={(e) => setReadingTime(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid gap-8">
                            <label htmlFor="content" className="text-xl">Content</label>
                            <textarea 
                                name="content" 
                                placeholder="Start typing your blog content here..." 
                                className="border-2 rounded-lg border-gray-200 w-[50rem] h-[40rem]"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <button 
                            type="submit" 
                            className={`bg-gray-200 rounded-md hover:bg-black hover:cursor-pointer text-white p-2 w-[15rem] mx-67 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={loading}
                        >
                            {loading ? "Publishing..." : "Publish"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer Stays at Bottom */}
            <Footer />
        </div>
    );
}
