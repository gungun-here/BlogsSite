import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEdit2 } from "react-icons/fi";
import { GoArrowRight } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import baseURL from "./render";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init(); // Initialize AOS

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [hoverBlog, setHoverBlog] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phnumber: "",
    profilepic: "",
    about: "",
  });
  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    phnumber: false,
    profilepic: false,
    about: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(`${baseURL}/api/auth/getUserData`, {
          headers: { Authorization: `bearer ${token}` },
        });

        setUser(response.data.user);
        setFormData({
          firstName: response.data.user.firstName || "",
          lastName: response.data.user.lastName || "",
          phnumber: response.data.user.phnumber || "",
          profilepic: response.data.user.profilepic || "",
          about: response.data.user.about || "",
        });
      } catch (err) {
        console.error("Profile Fetch Error:", err);
        navigate("/login");
      }
    };

    const fetchLatestBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(`${baseURL}/api/blogs/getBlogs`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setLatestBlogs(response.data.blogs.slice().reverse().slice(0, 3)); // Get the latest 3 blogs
        }
      } catch (error) {
        console.error("Error fetching latest blogs:", error);
      }
    };

    fetchProfile();
    fetchLatestBlogs();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${baseURL}/api/auth/update-profile`,
        formData,
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );

      setUser(response.data);
      setIsEditing({
        firstName: false,
        lastName: false,
        phnumber: false,
        profilepic: false,
        about: false,
      });
    } catch (err) {
      console.error("Profile Update Error:", err);
    }
  };

  const handleDelete = async (event, blogId) => {
    event.preventDefault(); // Prevent Link navigation

    const token = localStorage.getItem("token");
    if (!token) return;

    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const response = await fetch(`${baseURL}/api/blogs/delete/${blogId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setBlogs(blogs.filter((blog) => blog._id !== blogId));
      } else {
        console.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <div className="p-10">
        <div className="w-full max-w-7xl mx-auto px-14 py-10">
          <span className="text-4xl font-bold">My Profile</span>
          <div data-aos="fade-right">
            <form>
              <div className="flex px-[3rem]">
                <div className="border-r-2">

                  <div className="text-lg ml-6 mt-[2rem] mr-[9.5rem] grid gap-3">
                  {/* Display Profile Picture */}
                  {formData.profilepic ? (
                    <img
                      src={formData.profilepic}
                      alt="Profile"
                      className="w-[13.5rem] h-[100%] rounded-full border-2 border-gray-300 object-cover"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      <p className="text-gray-500">No Image</p>
                    </div>
                  )}

                    <label htmlFor="profilepic" className="text-[#d25d5d] text-center">
                      Profile Picture
                    </label>
                    {isEditing.profilepic ? (
                      <input
                        type="text"
                        name="profilepic"
                        className="border-2 pl-1 relative w-[13rem]"
                        value={formData.profilepic}
                        onChange={handleChange}
                        placeholder="Enter URL..."
                      />
                    ) : (
                      <div className="border-2 w-[13rem] pl-1 overflow-hidden">
                        <p>{user?.profilepic || "Not Set"}</p>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        setIsEditing({
                          ...isEditing,
                          firstName: true,
                          lastName: true,
                          phnumber: true,
                          profilepic: true,
                          about: true,
                        })
                      }
                      className="text-black cursor-pointer absolute left-[18.3rem] top-[18.5rem]"
                    >
                      <FiEdit2 />
                    </button>
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-2 gap-14 m-10 ml-[rem]">
                    <div className="flex gap-8 items-center text-lg">
                      <label htmlFor="firstName" className="text-[#d25d5d]">
                        First Name
                      </label>
                      {isEditing.firstName ? (
                        <input
                          type="text"
                          name="firstName"
                          className="border-2 pl-1 relative w-[11rem]"
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      ) : (
                        <div className="border-2 w-[13rem] pl-1">
                          <p>{user?.firstName || "Not Set"}</p>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setIsEditing({
                            ...isEditing,
                            firstName: true,
                            lastName: true,
                            phnumber: true,
                            profilepic: true,
                            about: true,
                          })
                        }
                        className="text-black cursor-pointer absolute left-[47.5rem]"
                      >
                        <FiEdit2 />
                      </button>
                    </div>

                    <div className="flex gap-6 items-center text-lg">
                      <label htmlFor="lastName" className="text-[#d25d5d]">
                        Last Name
                      </label>
                      {isEditing.lastName ? (
                        <input
                          type="text"
                          name="lastName"
                          className="border-2 pl-1 relative w-[11rem]"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      ) : (
                        <div className="border-2 w-[13rem] pl-1">
                          <p>{user?.lastName || "Not Set"}</p>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setIsEditing({
                            ...isEditing,
                            firstName: true,
                            lastName: true,
                            phnumber: true,
                            profilepic: true,
                            about: true,
                          })
                        }
                        className="text-black cursor-pointer absolute left-[68.4rem]"
                      >
                        <FiEdit2 />
                      </button>
                    </div>

                    <div className="flex gap-5.5 items-center text-lg">
                      <label htmlFor="phnumber" className="text-[#d25d5d]">
                        Ph. Number
                      </label>
                      {isEditing.phnumber ? (
                        <input
                          type="number"
                          name="phnumber"
                          className="border-2 pl-1 relative w-[11rem]"
                          value={formData.phnumber}
                          onChange={handleChange}
                        />
                      ) : (
                        <div className="border-2 w-[13rem] pl-1">
                          <p>{user?.phnumber || "Not Set"}</p>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setIsEditing({
                            ...isEditing,
                            firstName: true,
                            lastName: true,
                            phnumber: true,
                            profilepic: true,
                            about: true,
                          })
                        }
                        className="text-black cursor-pointer absolute left-[47.5rem]"
                      >
                        <FiEdit2 />
                      </button>
                    </div>

                    <div className="flex gap-13 items-center text-lg">
                      <label htmlFor="email" className="text-[#d25d5d]">
                        Email
                      </label>
                      <div className="border-2 w-[13rem] pl-1 cursor-not-allowed">
                        <p>{user?.email || "Not Set"}</p>
                      </div>
                    </div>
                  </div>

                  
                  <div className="ml-[2.5rem] flex gap-12.5 items-center text-lg">
                    <label htmlFor="about" className="text-[#d25d5d]">
                      About
                    </label>
                    {isEditing.about ? (
                      <textarea
                        name="about"
                        className="border-2 pl-1 relative w-[31.8rem] h-[6rem]"
                        value={formData.about}
                        onChange={handleChange}
                      />
                    ) : (
                      <div className="border-2 w-[31.8rem] h-[6rem] pl-1">
                        <p>{user?.about || "Not Set"}</p>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        setIsEditing({
                          ...isEditing,
                          firstName: true,
                          lastName: true,
                          phnumber: true,
                          profilepic: true,
                          about: true,
                        })
                      }
                      className="text-black cursor-pointer absolute left-[68.4rem]"
                    >
                      <FiEdit2 />
                    </button>
                  </div>
                </div>
              </div>

              {(isEditing.firstName ||
                isEditing.lastName ||
                isEditing.phnumber ||
                isEditing.profilepic ||
                isEditing.about) && (
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-gray-200 rounded-lg hover:bg-black hover:cursor-pointer text-white p-2 w-[15rem] ml-[43rem] mt-8"
                >
                  Save Changes
                </button>
              )}
            </form>

            {/* Latest Blogs Section */}
            <div className="mt-20">
              <span
                className="text-2xl pl-[57rem] font-semibold hover:underline cursor-pointer flex gap-2 items-center"
                onClick={() => navigate("/yourblogs")}
              >
                View All Your Blogs <GoArrowRight />
              </span>

              <div className="grid grid-cols-3 gap-6 mt-4">
                {latestBlogs.length > 0 ? (
                  latestBlogs.map((blog, idx) => (
                    <Link to={`/blogdetails/${blog._id}`} key={idx}>
                      <div
                        key={blog?._id}
                        className="border border-gray-200 h-full"
                        onMouseEnter={() => setHoverBlog(blog._id)}
                        onMouseLeave={() => setHoverBlog(null)}
                      >
                        <img
                          src={blog?.image}
                          alt={blog?.title}
                          className="w-full object-cover mb-4"
                        />
                        <div className="px-4 py-8 grid gap-4 relative">
                          {hoverBlog === blog._id && (
                            <MdDelete
                              className="text-2xl absolute top-[1.5rem] left-[20.5rem]"
                              onClick={(event) => handleDelete(event, blog._id)}
                            />
                          )}
                          <div className="text-xs">
                            {new Date(blog.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}{" "}
                            • {blog.readingTime} min read{" "}
                          </div>
                          <div className="text-sm border-2 border-gray-200 m-auto ml-0 py-[0.2rem] px-[0.4rem] rounded text-center">
                            {blog.category}
                          </div>
                          <h2 className="text-2xl font-my relative">
                            {blog.title}
                          </h2>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-center col-span-3">
                    No blogs found. Start writing!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
