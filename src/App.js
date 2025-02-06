import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import WishlistPage from './pages/WishlistPage';
import SharePage from './pages/SharePage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme(); 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Router>
      <Navbar onLogout={handleLogout} />
      <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<LoginPage />} />
  {isLoggedIn ? <Route path="/wishlist" element={<WishlistPage />} /> : null}
  <Route path="/share/:wishlistId" element={<SharePage />} />
</Routes>

    </Router>
    </ThemeProvider>
  );
};

export default App;