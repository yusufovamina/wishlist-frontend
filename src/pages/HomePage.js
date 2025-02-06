import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>
        Welcome to Wishlist App
      </Typography>
      <Button variant="contained" component={Link} to="/wishlist" sx={{ mt: 2 }}>
        Create Wishlist
      </Button>
    </Container>
  );
};

export default HomePage;