import { FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <button onClick={() => navigate("/")} className="fixed top-[4rem] right-[5rem] cursor-pointer">❌</button>
            <div className="text-center grid gap-4 p-8">
                <div className="text-4xl">Sign Up</div>
                <div className="text-lg">
                    Already a Member? <span className="text-blue-600 cursor-pointer hover:underline">Log In</span>
                </div>
                <div className="grid gap-4">
                    <button className="relative cursor-pointer border border-gray-300 text-lg h-[3rem] w-[20rem] hover:bg-gray-50">
                        <img src="gmail.png" className="absolute h-8 w-8 left-3" alt="gmail" />
                        Sign up with Google
                    </button>
                    <button className="relative cursor-pointer border text-lg h-[3rem] w-[20rem] bg-blue-600 text-white hover:bg-blue-700">
                        <FaFacebook className="absolute h-6 w-6 left-4 top-3" />
                        Sign up with Facebook
                    </button>
                    <div className="flex items-center justify-center">
                        <img src="img.png" alt="divider" className="h-[2rem] w-[20rem]" />
                    </div>
                    <button className="border cursor-pointer border-gray-300 text-lg h-[3rem] w-[20rem] hover:bg-gray-50" onClick={()=>navigate("/email")}>
                        Sign up with email
                    </button>
                
                </div>
            </div>
            <div className="mt-8 text-sm font-semibold text-center">
                        Your profile will be set to public automatically when you sign up. You can change <br />this later in your profile settings.
            </div>
        </div>
    );
}