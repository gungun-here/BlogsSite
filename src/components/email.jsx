import { useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";

export default function Email() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <button onClick={() => navigate("/signup")} className="fixed top-[4rem] right-[5rem] cursor-pointer">❌</button>
            <div className="text-center grid gap-4 p-8">
                <div className="text-4xl">Sign Up</div>
                <div className="text-lg">
                    Already a Member? <span className="text-blue-600 cursor-pointer hover:underline">Log In</span>
                </div>

                <form className="grid gap-4 text-left w-[20rem]" action="">
                    <label htmlFor="email">Email</label>
                    <input className="border-b-2 border-gray-400 focus:outline-none" type="email" />
                    <label htmlFor="password">Password</label>
                    <input className="border-b-2 border-gray-400 focus:outline-none" type="password" />

                    <button className="relative cursor-pointer border text-lg h-[3rem] w-[20rem]">Sign up
                    </button>
                    <div className="flex items-center justify-center">
                        <img src="img2.png" alt="divider" className="h-[2.1rem] w-[20rem]" />
                    </div>
                    <div className="flex gap-4 items-center justify-center cursor-pointer">
                        <FaFacebook className="h-6 w-6 left-4 text-blue-600" />
                        <img src="gmail.png" className="h-8 w-8" alt="gmail" />
                    </div>
                </form>
            </div>
        </div>
    );
}