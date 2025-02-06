import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
  {"Wishlist App"}
</Typography>

        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;