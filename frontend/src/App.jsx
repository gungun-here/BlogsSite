import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./components/homepage";
import Signup from "./components/signup";
import Email from "./components/email";
import Login from "./components/login";
import Loginemail from "./components/loginemail";
import Dashboard from "./components/dashboard";
import Navbar from "./components/navbar";
import Allposts from "./components/blogs";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    console.log("Checking Token in ProtectedRoute:", token); // Debugging
    return token ? children : <Navigate to="/login" />;
};

export default function App() {
    return (
        <Router>
            <div><Navbar /></div>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/email" element={<Email />} />
                <Route path="/login" element={<Login />} />
                <Route path="/loginemail" element={<Loginemail />} />
                <Route path="/allposts" element={<Allposts />} />
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>                        
                    } 
                />
            </Routes>
        </Router>
    );
}
