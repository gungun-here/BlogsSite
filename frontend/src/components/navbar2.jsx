import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

export default function Navbar2(){
    const location = useLocation()

    const onLink = (path) => (location.pathname === path ? "text-[#bc8f8f]" : "hover:text-[#bc8f8f]");

    return(
        <div className="px-14">
            <div className="flex gap-8 justify-center items-center border-b-2 border-gray-200 py-4">
            <Link to="/allposts" className={`${onLink("/allposts")}`}>All</Link>
            <Link to="/health" className={`${onLink("/health")}`}>Health & Wellness</Link>
            <Link to="/fashion" className={`${onLink("/fashion")}`}>Fashion & Beauty</Link>
            <Link to="/travel" className={`${onLink("/travel")}`}>Travel</Link>
            <Link to="/home" className={`${onLink("/home")}`}>Home & Decor</Link>
            <Link to="/ent" className={`${onLink("/ent")}`}>Entertainment</Link>
            <Link to="/it" className={`${onLink("/it")}`}>Information Technology</Link>
            <Link to="/random" className={`${onLink("/random")}`}>Random</Link>
            <Link to="/others" className={`${onLink("/others")}`}>Others</Link>
            </div>
        </div>
    )
}