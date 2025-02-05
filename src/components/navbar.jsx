import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation(); // Get current route

  // Function to determine active link class
  const onLink = (path) => 
    location.pathname === path ? "font-bold" : "hover:font-bold";

  return (
    <div className="bg-blue-600 flex justify-between items-center p-4 px-40 font-my text-xl">
      <div><Link to="/">Logo</Link></div>
      <div className="flex gap-12">
        <Link to="/" className={onLink("/")}>Home</Link>
        <Link to="/about" className={onLink("/about")}>About</Link>
        <Link to="/blogs" className={onLink("/blogs")}>Blogs</Link>
        <Link to="/signup" className={onLink("/signup")}>Sign Up</Link>
        <Link to="/login" className={onLink("/login")}>Login</Link>
      </div>
    </div>
  );
}
