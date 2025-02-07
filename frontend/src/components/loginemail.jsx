import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"; 

export default function Loginemail() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // ✅ Auto-redirect if already logged in
    useEffect(() => {
        const token = localStorage.getItem("token"); 
        if (token) {
            navigate("/dashboard"); // Redirect to dashboard if already logged in
        }
    }, [navigate]);

    // ✅ Handles Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:4000/api/auth/login", { email, password });

            console.log("Response Data:", res.data);

            const authToken = res?.data?.token; // ✅ Fixed token key
            if (authToken) {
                console.log("Token is available:", authToken);
                localStorage.setItem("token", authToken);
            } else {
                console.error("No token received from server!");
                setError("Failed to authenticate. Please try again.");
                return;
            }

            localStorage.setItem("user", JSON.stringify(res?.data?.user));

            console.log("Stored Token:", localStorage.getItem("token"));
            console.log("Stored User:", localStorage.getItem("user"));

            navigate("/dashboard"); // ✅ Redirect on success

        } catch (err) {
            console.error("Login Error:", err.response?.data);
            setError(err.response?.data?.message || "An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {/* Close Button */}
            <button onClick={() => navigate("/")} className="fixed top-[4rem] right-[5rem] cursor-pointer">❌</button>
            
            <div className="text-center grid gap-4 p-8">
                <div className="text-4xl">Log In</div>
                <div className="text-lg">
                    New to this site? 
                    <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigate("/signup")}> Sign Up</span>
                </div>

                {/* Login Form */}
                <form className="grid gap-4 text-left w-[20rem]" onSubmit={handleSubmit}>
                    {error && <p className="text-red-500">{error}</p>}
                    
                    <label htmlFor="email">Email</label>
                    <input 
                        className="border-b-2 border-gray-400 focus:outline-none" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input 
                        className="border-b-2 border-gray-400 focus:outline-none" 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />

                    <button className="relative cursor-pointer border text-lg h-[3rem] w-[20rem]" type="submit">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}
