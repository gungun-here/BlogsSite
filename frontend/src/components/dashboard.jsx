import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "./render";

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const res = await axios.get(`${baseURL}/api/auth/google-login`, {  // Fixed API Endpoint
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("User Data:", res.data); // Debugging

                if (!res.data || !res.data.email) {
                    throw new Error("Invalid user data");
                }

                setUser(res.data);
            } catch (err) {
                console.error("Error fetching user:", err);
                setError("Session expired. Please log in again.");
                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        fetchUserData();
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center bg-[url('https://c4.wallpaperflare.com/wallpaper/971/1011/721/blue-pastel-wallpaper-preview.jpg')] bg-cover bg-center h-screen relative">
            {user ? <h2>Welcome, {user.email}!</h2> : <p>Loading...</p>}
            <div className="p-10 font-my">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl h-[40rem] w-[80rem] px-14 py-10 bg-white">
                <span className="text-5xl">My Profile</span>
                <form action="" className="grid grid-cols-2 gap-14 m-10 ml-[20rem]">
                    <div className="flex gap-16 items-center">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="border-2" />
                    </div>
                    <div className="flex gap-8 items-center">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="border-2" />
                    </div>
                    <div className="flex gap-10 items-center">
                        <label htmlFor="phnumber">Phone Number</label>
                        <input type="number" className="border-2" />
                    </div>
                    <div className="flex gap-16 items-center">
                        <label htmlFor="email">Email</label>
                        <p>{user?.email || ""}</p>
                    </div>
                    <button type="submit" className="bg-black text-white p-2 w-[15rem] mx-67">Save Changes</button>
                </form>
                <div>
                    <span className="text-xl ml-80">Your Blogs</span>
                </div>
            </div>
        </div>
        </div>
    );
}
