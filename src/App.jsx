import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WishlistPage from "./pages/WishlistPage";
import ReservedGiftsPage from "./pages/ReservedGiftsPage";
import SharePage from "./pages/SharePage";
import { ChakraProvider, Box } from "@chakra-ui/react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <ChakraProvider>
      {/* ✅ Soft Purple-Blue Gradient Background */}
      <Box
        minH="100vh"
        bgGradient="linear(to-br, rgba(240, 230, 255, 0.8), rgba(200, 230, 255, 0.8))"
        backdropFilter="blur(10px)"
      >
        <Router>
          <Navbar onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            { <Route path="/wishlist" element={<WishlistPage />} />}
            <Route path="/wishlist/shared/:sharedUserId" element={<WishlistPage />} />

  <Route path="/reserved-gifts" element={<ReservedGiftsPage />} />
          </Routes>
        </Router>
      </Box>
    </ChakraProvider>
  );
};

export default App;
