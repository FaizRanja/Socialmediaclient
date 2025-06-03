import React, { useEffect } from "react";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./pages/Navbar";
import ProtectedRoute from "./Components/Protectroutes/ProtectetRoute";
import Home from "./Components/Home/Home";
import {  useSelector } from "react-redux";
import Profile from "./Components/profile/Profile";
import AppLayout from "./Layout/AppLayout";


const AppContent = () => {
  const location = useLocation();


  const { isLoading } = useSelector((state) => state.authreducer);




if(isLoading){
  <div>
    loading ...
  </div>
}


  return (
    <>
      {/* Hide Navbar on /register */}
      {location.pathname !== "/register" && <Navbar />}

      <Routes>
        {/* Public Route */}
        <Route path="/register" element={<Register />} />


        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AppLayout />} />
           <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
