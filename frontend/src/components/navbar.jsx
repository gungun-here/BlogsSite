import { Link, useLocation } from "react-router-dom";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareFacebook, FaSquareXTwitter, FaSquarePinterest } from "react-icons/fa6";
import { is_authenticated, logout } from "./authservice";

export default function Navbar() {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user")); // Get user data if logged in

    // Function to determine active link class
    const onLink = (path) => (location.pathname === path ? "text-[#bc8f8f]" : "hover:text-[#bc8f8f]");

    return (
        <div className="px-15"> 
            <div className="px-10 border-b-2 flex justify-between items-center py-4 border-gray-200">
                <div>
                    <Link to="/" className="text-xl">Out & About</Link>
                </div>

                <div className="flex gap-12 items-center">
                    {/* Conditional rendering based on authentication */}
                    {is_authenticated() ? (
                        <div className="flex gap-6 items-center">
                            <Link to="/dashboard" className={`${onLink("/dashboard")} cursor-pointer`}>Dashboard</Link>
                            <Link to="/addblogs" className={`${onLink("/addblogs")} cursor-pointer`}>Add Blogs</Link>
                            <Link to="/yourblogs" className={`${onLink("/yourblogs")} cursor-pointer`}>Your Blogs</Link>
                            <Link to="/allposts" className={onLink("/allposts")}>All posts</Link>
                        <button onClick={logout} className="hover:text-[#bc8f8f] cursor-pointer">Logout</button>
                        </div>
                    ) : (
                        <div className="flex gap-6">
                            <Link to="/login" className={onLink("/login")}>Login</Link>
                            <Link to="/allposts" className={onLink("/allposts")}>All posts</Link>
                        </div>
                    )}

                    {/* Social Icons */}
                    <div className="flex gap-4 items-center">
                        <Link to="https://instagram.com" target="_blank"><AiFillInstagram className="h-6 w-6 rounded-full" /></Link>
                        <Link to="https://facebook.com" target="_blank"><FaSquareFacebook className="h-6 w-6 rounded-full" /></Link>
                        <Link to="https://twitter.com" target="_blank"><FaSquareXTwitter className="h-6 w-6 rounded-full" /></Link>
                        <Link to="https://pinterest.com" target="_blank"><FaSquarePinterest className="h-6 w-6 rounded-full" /></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
