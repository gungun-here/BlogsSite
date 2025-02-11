import React from "react";
import {BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";

import Homepage from "./components/homepage";
import Navbar from "./components/navbar";
import Login from "./components/login";
import Signup from "./components/signup";
import Loginemail from "./components/loginemail";
import Email from "./components/email";
import Footer from "./components/footer";
import Addblogs from "./components/addblogs";
import YourBlogs from "./components/yourblogs";
import Dashboard from "./components/dashboard";
import Allposts from "./components/allposts";
import Blogdetails from "./components/blogdetails";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function Hidenav(){
  const location = useLocation();
  const hideNav = ["/login", "/signup", "/loginemail", "/email"];
  const hideFoot = ["/login", "/signup", "/loginemail", "/email"];

  return(
    <div className="bg-gradient-to-t from-[rgb(235,234,230)] via-transparent to-transparent">
      {!hideNav.includes(location.pathname) && <Navbar />} 
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/loginemail" element={<Loginemail />}></Route>
        <Route path="/email" element={<Email />}></Route>
        <Route path="/allposts" element={<Allposts />}></Route>
        <Route path="/blogdetails/:id" element={<Blogdetails />}></Route>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        <Route path="/addblogs" element={<ProtectedRoute><Addblogs /></ProtectedRoute>}/>
        <Route path="/yourblogs" element={<ProtectedRoute><YourBlogs /></ProtectedRoute>}/>
      </Routes>
      {!hideFoot.includes(location.pathname) && <Footer />}
    </div>
  )
}

export default function App() {

  return(
    <Router>
      <Hidenav />
    </Router>
  )
}