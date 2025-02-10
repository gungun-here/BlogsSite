import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEdit2 } from "react-icons/fi";
import baseURL from "./render";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phnumber: "",
  });
  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    phnumber: false,
  });

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

        setUser(response.data);
        setFormData({
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          phnumber: response.data.phnumber || "",
        });
      } catch (err) {
        console.error("Profile Fetch Error:", err);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile update
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${baseURL}/api/auth/update-profile`, formData, {
        headers: { Authorization: token },
      });

      setUser(response.data);
      setIsEditing({ firstName: false, lastName: false, phnumber: false }); // Set all fields to read-only
    } catch (err) {
      console.error("Profile Update Error:", err);
    }
  };

  console.log(user)
  console.log(formData)

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <div className="p-10 font-my">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl h-[40rem] w-[80rem] px-14 py-10 bg-white">
          <span className="text-5xl">My Profile</span>
          <form className="grid grid-cols-2 gap-14 m-10 ml-[20rem]">
            
            {/* First Name */}
            <div className="flex gap-16 items-center">
              <label htmlFor="firstName">First Name:</label>
              {isEditing.firstName ? (
                <input
                  type="text"
                  name="firstName"
                  className="border-2 rounded-md border-gray-200"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              ) : (
                <p>{user?.firstName || "Not Set"}</p>
              )}
              <button type="button" onClick={() => setIsEditing({ ...isEditing, firstName: true })} className="text-black">
              <FiEdit2 />
              </button>
            </div>

            {/* Last Name */}
            <div className="flex gap-8 items-center">
              <label htmlFor="lastName">Last Name:</label>
              {isEditing.lastName ? (
                <input
                  type="text"
                  name="lastName"
                  className="border-2 rounded-md border-gray-200"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              ) : (
                <p>{user?.lastName || "Not Set"}</p>
              )}
              <button type="button" onClick={() => setIsEditing({ ...isEditing, lastName: true })} className="text-black">
              <FiEdit2 />
              </button>
            </div>

            {/* Phone Number */}
            <div className="flex gap-10 items-center">
              <label htmlFor="phnumber">Phone Number:</label>
              {isEditing.phnumber ? (
                <input
                  type="number"
                  name="phnumber"
                  className="border-2 rounded-md border-gray-200"
                  value={formData.phnumber}
                  onChange={handleChange}
                />
              ) : (
                <p>{user?.phnumber || "Not Set"}</p>
              )}
              <button type="button" onClick={() => setIsEditing({ ...isEditing, phnumber: true })} className="text-black">
              <FiEdit2 />
              </button>
            </div>

            {/* Email (Read-Only) */}
            <div className="flex gap-16 items-center">
              <label htmlFor="email">Email:</label>
              <p>{user?.email || "Not Set"}</p>
            </div>

            {/* Save Changes Button */}
            {(isEditing.firstName || isEditing.lastName || isEditing.phnumber) && (
              <button
                type="button"
                onClick={handleSave}
                className="bg-gray-200 rounded-md hover:bg-black hover:cursor-pointer text-white p-2 w-[15rem] mx-67"
              >
                Save Changes
              </button>
            )}
          </form>

          {/* Your Blogs Section */}
          <div className="mt-20">
            <span className="text-xl ml-80">Your Blogs</span>
          </div>
          <div className="group" onClick={() => navigate("/addblogs")}>
            <div className="ml-80 mt-10 border-2 rounded-md border-dashed border-gray-300 h-[10rem] w-[20rem] text-center flex items-center justify-center group-hover:border-black group-hover:text-black group-hover:cursor-pointer">
              <button className="text-gray-400 group-hover:text-black cursor-pointer">+ Add Blogs</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
