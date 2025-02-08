import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Email() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${baseURL}/api/auth/register`, {
                email,
                password,
            });
            alert(res.data.message);
            navigate("/login"); // Redirect to login page after successful signup
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <button onClick={() => navigate("/")} className="fixed top-[4rem] right-[5rem] cursor-pointer">❌</button>
            <div className="text-center grid gap-4 p-8">
                <div className="text-4xl">Sign Up</div>
                <div className="text-lg">
                    Already a Member? <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigate("/login")}>Log In</span>
                </div>

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
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    );
}
