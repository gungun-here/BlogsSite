import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "./render";

export default function Authorprofile() {
  const { userId } = useParams(); // Get user ID from the URL
  const [author, setAuthor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!userId) return;

        const response = await axios.get(`${baseURL}/api/auth/user/${userId}`);

        setAuthor(response.data.user);
      } catch (err) {
        console.error("Profile Fetch Error:", err);
        navigate("/"); // Redirect if profile not found
      }
    };

    fetchProfile();
  }, [userId, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-10 text-center">
        {author ? (
          <>
            <img
              src={author.profilepic || "default-image.jpg"}
              alt="Author Profile"
              className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover"
            />
            <h2 className="text-2xl font-semibold mt-4">
              {author.firstName} {author.lastName}
            </h2>
            <p className="text-gray-500">{author.about || "No bio available"}</p>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
}
