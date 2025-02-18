import { Link, useLocation } from "react-router-dom";
import { useBlog } from "./blogCategory.jsx";

export default function Navbar2({ blogCounts, allBlogCount }) {
  const location = useLocation();
  const onLink = (path) =>
    location.pathname.includes(path)
      ? "text-[#bc8f8f]"
      : "hover:text-[#bc8f8f]";

  const { toggleCategory } = useBlog();
  
  const navLinks = [
    "All posts",
    "Health & Wellness",
    "Fashion & Beauty",
    "Travel",
    "Home & Decor",
    "Entertainment",
    "Information Technology",
    "Random",
    "Others",
  ];



  return (
    <div className="px-14">
      <div className="flex gap-8 justify-center items-center border-b-2 border-gray-200 py-4">
        {navLinks.map((link, index) => 
        
        (
          <Link
            key={index}
            to={`/category/${link}`}
            className={`${onLink(`/category/${link}`)}`}
            onClick={() => toggleCategory(link)}
          >
           
            {link} (
            {link === "All posts"
              ? allBlogCount
              : blogCounts?.[link] || 0}
            )
          </Link>
        ))}
      </div>
    </div>
  );
}
