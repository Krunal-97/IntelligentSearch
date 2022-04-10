import React, { useMemo, useState } from "react";
import "./App.css";
import "./styles/home.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Search from "./components/pages/Search";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Logout from "./components/pages/Logout";
import Navbar from "./components/Navbar";
import AdminDashboard from "./components/pages/AdminDashboard";
import UserDashboard from "./components/pages/UserDashboard";
import Footer from "./components/Footer";
import { UserContext } from "./components/UserContext";

function App() {
  // const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState("");
  // const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <>
      <Router>
        <UserContext.Provider value={[userToken, setUserToken]}>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="/log-in" element={<Login />} />
            <Route path="/log-out" element={<Logout />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/userdashboard" element={<UserDashboard />} />
          </Routes>
        </UserContext.Provider>
      </Router>

      <Footer />
    </>
  );
}

export default App;
