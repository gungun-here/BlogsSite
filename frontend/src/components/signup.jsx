import { FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../firebase";
import axios from "axios";
import baseURL from "./render";

export default function Signup() {
    const navigate = useNavigate()

    const handleGoogleSignIn = async () => {
        try {
            const googleUser = await signInWithGoogle();
            console.log("Google User Data:", googleUser); // Debugging
    
            if (googleUser) {
                
                const response = await axios.post(`${baseURL}/api/auth/google-login`, {
                    email: googleUser.email,
                    displayName: googleUser.displayName,
                });
    
                console.log("Server Response:", response.data); // Debugging
    
                // Save token in localStorage
                localStorage.setItem("token", response.data.token);
    
                navigate("/dashboard"); // Redirect to dashboard after login
            }
        } catch (error) {
            console.error("Google Login Error:", error.response?.data || error);
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <button onClick={() => navigate("/")} className="fixed top-[4rem] right-[5rem] cursor-pointer">❌</button>
            <div className="text-center grid gap-4 p-8">
                <div className="text-4xl">Sign Up</div>
                <div className="text-lg">
                    Already a Member? <span className="text-blue-600 cursor-pointer hover:underline" onClick={()=>navigate("/login")}>Log In</span>
                </div>
                <div className="grid gap-4">
                    <button className="relative cursor-pointer border border-gray-300 text-lg h-[3rem] w-[20rem] hover:bg-gray-50" onClick={handleGoogleSignIn}>
                        <img src="gmail.png" className="absolute h-8 w-8 left-3" alt="gmail" />
                        Sign up with Google
                    </button>
                    <button className="relative cursor-pointer border text-lg h-[3rem] w-[20rem] bg-blue-600 text-white hover:bg-blue-700">
                        <FaFacebook className="absolute h-6 w-6 left-4 top-3" />
                        Sign up with Facebook
                    </button>
                    <div className="flex items-center justify-center">
                        <img src="img2.png" alt="divider" className="h-[2rem] w-[20rem]" />
                    </div>
                    <button className="border cursor-pointer border-gray-300 text-lg h-[3rem] w-[20rem] hover:bg-gray-50" onClick={()=>navigate("/email")}>
                        Sign up with email
                    </button>
                
                </div>
            </div>
        </div>
    );
}