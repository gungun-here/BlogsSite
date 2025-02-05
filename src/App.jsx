import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Homepage from "./components/homepage";

export default function App(){

  return(
    <div>
      <Router>  
        <div>{<Navbar />}</div>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
        </Routes>
      </Router>
    </div>
  )
}