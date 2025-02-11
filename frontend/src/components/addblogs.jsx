import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import baseURL from "./render";

export default function Addblogs() {
    const navigate = useNavigate();

    // State for form fields
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [readingTime, setReadingTime] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [authorName, setAuthorName] = useState("Fetching...");
    const [userId, setUserId] = useState(""); // ✅ Store logged-in user's ID

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); // Runs only once when the component mounts

    // Set the current date in "Aug 14, 2024" format
    useEffect(() => {
        const today = new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
        setCurrentDate(today);
    }, []);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("User not authenticated");
                setAuthorName("Unknown");
                return;
            }

            try {
                const response = await fetch(`${baseURL}/api/auth/getUserData`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                console.log("Fetched user data:", data); // ✅ Debugging log

                if (response.ok && data.user) {
                    const fullName = `${data.user.firstName} ${data.user.lastName}`.trim();
                    setAuthorName(fullName);
                    setUserId(data.user._id); // ✅ Ensure userId is stored
                    console.log("User ID set:", data.user._id); // ✅ Debug log


                } else {
                    console.error("Error fetching user details:", data.message);
                    setAuthorName("Unknown");
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
                setAuthorName("Unknown");
            }
        };

        fetchUserDetails();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("token");

        if (!token) {
            alert("User is not authenticated. Please log in.");
            setLoading(false);
            return;
        }

        if (!title || !content || !image || !category || !readingTime) {
            alert("All fields are required.");
            setLoading(false);
            return;
        }

        // ✅ Ensure `userId` is set before sending request
        if (!userId) {
            alert("User ID is missing. Please refresh the page and try again.");
            setLoading(false);
            return;
        }

        const blogData = { title, content, image, category, readingTime };

        try {
            const response = await fetch(`${baseURL}/api/blogs/add`, {
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
                navigate("/yourblogs");
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
        <div className="min-h-screen flex flex-col justify-between">
            <div className="flex-grow flex items-center justify-center py-20">
                <div className="w-[60rem] h-[75rem] px-14 py-10">
                    <h1 className="text-4xl font-bold text-center">Add Your Blog Here</h1>
                </div>
                <div className="absolute top-80 left-90">
                    <form onSubmit={handleSubmit} className="grid gap-8">
                        
                            <div className="flex gap-14">
                                <label htmlFor="title" className="text-xl text-[#d25d5d]">Blog Title</label>
                                <input
                                    type="text"
                                    className="border-2"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>{/* ✅ Display Correct Author Name */}
                            <div className="flex gap-19">
                                <label htmlFor="author" className="text-xl text-[#d25d5d]">Author</label>
                                <input
                                    type="text"
                                    className="border-2 cursor-not-allowed"
                                    value={authorName}
                                    readOnly
                                />
                            </div>

                            <div className="flex gap-[2.5rem]">
                                <label htmlFor="image" className="text-xl text-[#d25d5d]">Blog Image</label>
                                <input
                                    type="text"
                                    placeholder="Enter URL..."
                                    className="border-2"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    required
                                />
                            </div>


                            <div className="flex gap-[0.9rem]">
                                <label htmlFor="category" className="text-xl text-[#d25d5d]">Blog Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    className="border-2 w-46"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <option value="">Select an option</option>
                                    <option value="Health & Wellness">Health & Wellness</option>
                                    <option value="Fashion & Beauty">Fashion & Beauty</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Home & Decor">Home & Decor</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Information Technology">Information Technology</option>
                                    <option value="Random">Random</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                        
                            {/* Display current date (Read-only) */}
                            <div className="flex gap-24">
                                <label htmlFor="date" className="text-xl text-[#d25d5d]">Date</label>
                                <input
                                    type="text"
                                    className="border-2 cursor-not-allowed"
                                    value={currentDate}
                                    readOnly
                                />
                            </div>

                            <div className="flex gap-5">
                                <label htmlFor="readingTime" className="text-xl text-[#d25d5d]">Reading Time</label>
                                <input
                                    type="number"
                                    className="border-2"
                                    placeholder="In minutes..."
                                    value={readingTime}
                                    onChange={(e) => setReadingTime(e.target.value)}
                                    required
                                />
                            </div>
                        
                        <div className="grid gap-8">
                            <label htmlFor="content" className="text-xl text-[#d25d5d]">Content</label>
                            <textarea
                                name="content"
                                placeholder="Start typing your blog content here..."
                                className="border-2 w-[50rem] h-[40rem]"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className={`bg-gray-200 hover:bg-black hover:cursor-pointer text-white p-2 w-[15rem] mx-67 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={loading}
                        >
                            {loading ? "Publishing..." : "Publish"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
