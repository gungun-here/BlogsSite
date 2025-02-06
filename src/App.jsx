import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage";
import Signup from "./components/signup";
import Email from "./components/email";

export default function App(){

  return(
    <div>
      <Router>  
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/email" element={<Email />}></Route>
        </Routes>
      </Router>
    </div>
  )
}