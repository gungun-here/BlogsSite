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
    window.scrollTo(0, 0);
  }, []); // Runs only once when the component mounts

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
        headers: { Authorization: `bearer ${token}` },
      });

      setUser(response.data);
      setIsEditing({ firstName: false, lastName: false, phnumber: false }); // Set all fields to read-only
    } catch (err) {
      console.error("Profile Update Error:", err);
    }
  };

  console.log(user)

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <div className="p-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[80rem] px-14 py-10">
          <span className="text-4xl font-bold">My Profile</span>
          <form className="grid grid-cols-2 gap-14 m-10 ml-[20rem]">
            
            {/* First Name */}
            <div className="flex gap-17 items-center text-lg">
              <label htmlFor="firstName" className="text-[#d25d5d]">First Name</label>
              {isEditing.firstName ? (
                <input
                  type="text"
                  name="firstName"
                  className="border-2 relative"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              ) : (
                <p>{user?.firstName || "Not Set"}</p>
              )}
              <button type="button" onClick={() => setIsEditing({ ...isEditing, firstName: true })} className="text-black cursor-pointer absolute left-[44.5rem]">
              <FiEdit2 />
              </button>
            </div>

            {/* Last Name */}
            <div className="flex gap-6 items-center text-lg">
              <label htmlFor="lastName" className="text-[#d25d5d]">Last Name</label>
              {isEditing.lastName ? (
                <input
                  type="text"
                  name="lastName"
                  className="border-2 relative"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              ) : (
                <p>{user?.lastName || "Not Set"}</p>
              )}
              <button type="button" onClick={() => setIsEditing({ ...isEditing, lastName: true })} className="text-black cursor-pointer absolute left-[68.5rem]">
              <FiEdit2 />
              </button>
            </div>

            {/* Phone Number */}
            <div className="flex gap-8 items-center text-lg">
              <label htmlFor="phnumber" className="text-[#d25d5d]">Phone Number</label>
              {isEditing.phnumber ? (
                <input
                  type="number"
                  name="phnumber"
                  className="border-2 relative"
                  value={formData.phnumber}
                  onChange={handleChange}
                />
              ) : (
                <p>{user?.phnumber || "Not Set"}</p>
              )}
              <button type="button" onClick={() => setIsEditing({ ...isEditing, phnumber: true })} className="text-black cursor-pointer absolute left-[44.5rem]">
              <FiEdit2 />
              </button>
            </div>

            {/* Email (Read-Only) */}
            <div className="flex gap-16 items-center text-lg">
              <label htmlFor="email" className="text-[#d25d5d]">Email</label>
              <p>{user?.email || "Not Set"}</p>
            </div>

            {/* Save Changes Button */}
            {(isEditing.firstName || isEditing.lastName || isEditing.phnumber) && (
              <button
                type="button"
                onClick={handleSave}
                className="bg-gray-200 hover:bg-black hover:cursor-pointer text-white p-2 w-[15rem] mx-67"
              >
                Save Changes
              </button>
            )}
          </form>

          {/* Your Blogs Section */}
          <div className="mt-20">
            <span className="text-2xl ml-80">Your Blogs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
