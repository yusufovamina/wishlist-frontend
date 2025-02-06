import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import GiftForm from '../components/GiftForm';
import GiftList from '../components/GiftList';
import api from '../services/api';

const WishlistPage = () => {
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    try {
      const response = await api.get('/gift');

    console.log("Gifts API response:", response.data);
      setGifts(Array.isArray(response.data) ? response.data : []);

    } catch (error) {
      console.error('Failed to fetch gifts:', error);
    }
  };

  const handleAddGift = async (gift) => {
    try {
      await api.post('/gift', gift);
      fetchGifts();
    } catch (error) {
      console.error('Failed to add gift:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>
        My Wishlist
      </Typography>
      <GiftForm onSubmit={handleAddGift} />
      <GiftList gifts={gifts} />
    </Container>
  );
};

export default WishlistPage;