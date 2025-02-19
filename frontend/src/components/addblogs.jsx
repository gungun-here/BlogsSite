import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import baseURL from "./render";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoMdSettings } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import AOS from "aos";
import "aos/dist/aos.css";
import TextEditor from "./TextEditor";

AOS.init(); // Initialize AOS

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
  const [open, setOpen] = useState(true);

  const quillModules = {
    toolbar: {
      container: [
        [{ font: [] }, { size: [] }], // Font and Size
        [{ header: [1, 2, 3, 4, 5, 6, true] }], // Headings
        ["bold", "italic", "underline", "strike"], // Text styles
        [{ color: [] }, { background: [] }], // Text color and background color
        [{ script: "sub" }, { script: "super" }], // Subscript/Superscript
        [{ list: "ordered" }, { list: "bullet" }], // Lists
        [{ indent: "-1" }, { indent: "+1" }], // Indentation
        [{ align: [] }], // Text alignment
        ["blockquote", "code-block"], // Blockquote and Code Block
        ["video"], // Media Embeds
        ["clean"], // Remove Formatting
      ],
    },
  };

  const quillFormats = [
    "font",
    "size",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "list",
    "indent",
    "align",
    "blockquote",
    "code-block",
    "video",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Runs only once when the component mounts

  // Set the current date in "Aug 14, 2024" format
  useEffect(() => {
    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
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
          const fullName =
            `${data.user.firstName} ${data.user.lastName}`.trim();
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

  const handleQuillContent = (value) => {
    setContent(value);
  };

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
      <div className="flex-grow flex items-center justify-center py-8">
        <div className="w-[60rem] h-[75rem] px-14 py-4">
          <h1 className="text-4xl font-bold text-center">Add Your Blog Here</h1>
        </div>
        <div className="absolute top-53 left-0">
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <div
                className="text-[#d25d5d] text-5xl pt-26 px-4 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <IoMdSettings className={open? "hidden" : ""} />
              </div>
              <div
                className={`transition-all duration-300 ease-in-out fiexd w-[20rem] h-[39.6rem] mt-[6.5rem] border-1 border-gray-300 px-13 pt-4 relative ml-[3rem] ${
                  open ? "" : "hidden"
                }`}
              >
                <div
                  className="absolute text-3xl left-[17rem] text-[#d25d5d] cursor-pointer"
                  onClick={() => setOpen(!open)}
                >
                  <IoCloseSharp />
                </div>
                <div className="grid gap-4 h-[30rem] w-[20rem] my-[4rem]">
                  <div className="grid items-center">
                    <label htmlFor="title" className="text-lg font-semibold">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Title..."
                      className=" h-[2.5rem] w-[14rem] bg-white border-b-1 border-b-gray-300 pl-2 focus:outline-none focus:ring-0"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  {/* ✅ Display Correct Author Name */}
                  <div className="grid items-center">
                    <label htmlFor="author" className="text-lg font-semibold">
                      Author
                    </label>
                    <input
                      type="text"
                      className="cursor-not-allowed h-[2.5rem] w-[14rem] bg-white border-b-1 border-b-gray-300 pl-2 focus:outline-none focus:ring-0"
                      value={authorName}
                      readOnly
                    />
                  </div>

                  <div className="grid items-center">
                    <label htmlFor="image" className="text-lg font-semibold">
                      Banner
                    </label>
                    <input
                      type="text"
                      placeholder="Paste URL..."
                      className="h-[2.5rem] w-[14rem] bg-white pl-2 border-b-1 border-b-gray-300 focus:outline-none focus:ring-0"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid items-center">
                    <label htmlFor="category" className="text-lg font-semibold">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="h-[2.5rem] w-[14rem] bg-white border-b-1 border-b-gray-300 focus:outline-none focus:ring-0 pl-2"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      <option value="">Select an option</option>
                      <option value="Health & Wellness">
                        Health & Wellness
                      </option>
                      <option value="Fashion & Beauty">Fashion & Beauty</option>
                      <option value="Travel">Travel</option>
                      <option value="Home & Decor">Home & Decor</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Information Technology">
                        Information Technology
                      </option>
                      <option value="Random">Random</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  {/* Display current date (Read-only) */}
                  <div className="grid items-center">
                    <label htmlFor="date" className="text-lg font-semibold">
                      Date
                    </label>
                    <input
                      type="text"
                      className="cursor-not-allowed h-[2.5rem] w-[14rem] bg-white border-b-1 border-b-gray-300 focus:outline-none focus:ring-0 pl-2"
                      value={currentDate}
                      readOnly
                    />
                  </div>

                  <div className="grid items-center">
                    <label
                      htmlFor="readingTime"
                      className="text-lg font-semibold"
                    >
                      Reading Time
                    </label>
                    <input
                      type="number"
                      className="h-[2.5rem] w-[14rem] bg-white border-b-1 border-b-gray-300 focus:outline-none focus:ring-0 pl-2"
                      placeholder="In minutes..."
                      value={readingTime}
                      onChange={(e) => setReadingTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                {/* data-aos="fade-down" */}
                <div className="grid gap-8">
                  <label
                    htmlFor="content"
                    className={`text-7xl font-bold text-[#d25d5d] ${open? "pl-[14rem]" : "pl-[34rem]"}`} 
                  >
                    Content
                  </label>
                  {/* <ReactQuill 
                                           value={content} 
                                           onChange={handleQuillContent} 
                                           modules={quillModules}
                                           formats={quillFormats}
                                           className={`transition-all duration-300 ease-in-out h-[35rem] ${open ? "w-[55rem]" : "w-[85rem]"}`}
                                       /> */}
                  <TextEditor
                    placeholder={"text editor"}
                    width={open ? 1040 : 1356}
                    value={content}
                    onChangeHandler={handleQuillContent}
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`bg-gray-200 mt-20 hover:bg-black hover:cursor-pointer text-white p-2 w-[15rem] mx-[39.9rem] rounded-lg ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Publishing..." : "Publish"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
