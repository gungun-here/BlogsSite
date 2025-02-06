import { Link, useLocation } from "react-router-dom";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareFacebook, FaSquareXTwitter, FaSquarePinterest } from "react-icons/fa6";

export default function Navbar(){
  const location = useLocation(); // Get current route

  // Function to determine active link class
  const onLink = (path) =>
    location.pathname === path ? "font-bold" : "hover:font-bold";

    return(
      <div className="px-15 sticky top-0 bg-white z-50">
      <div className="px-10 border-b-2 flex justify-between items-center py-4 border-gray-200">
        <div><Link to="/" className="text-xl">Out & About</Link></div>
        <div className="flex gap-12">
          <Link to="/login" className={onLink("/signup")}>Login</Link>
          <Link to="/allposts" className={onLink("/allposts")}>All Posts</Link>
          <div className="flex gap-4 justify-between items-center">
            <Link to="/"><AiFillInstagram className="h-6 w-6 rounded-full" /></Link>
            <Link to="/"><FaSquareFacebook className="h-6 w-6 rounded-full" /></Link>
            <Link to="/"><FaSquareXTwitter className="h-6 w-6 rounded-full" /></Link>
            <Link to="/"><FaSquarePinterest className="h-6 w-6 rounded-full" /></Link>
          </div>
        </div>
      </div>
      </div>
    )
  }