import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import GiftList from '../components/GiftList';
import api from '../services/api';

const SharePage = () => {
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    try {
      const response = await api.get('/gift');
      setGifts(Array.isArray(response.data) ? response.data : []);

    } catch (error) {
      console.error('Failed to fetch gifts:', error);
    }
  };

  const handleReserve = async (giftId) => {
    try {
      await api.post(`/gift/${giftId}/reserve`);
      fetchGifts();
    } catch (error) {
      console.error('Failed to reserve gift:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>
        Wishlist
      </Typography>
      <GiftList gifts={gifts} onReserve={handleReserve} />
    </Container>
  );
};

export default SharePage;