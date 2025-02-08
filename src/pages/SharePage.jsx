import React, { useState, useEffect } from "react";
import { Container, Heading, useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import GiftList from "../components/GiftList";
import api from "../services/api";

const SharePage = () => {
  const { wishlistId } = useParams(); // Get wishlist ID from URL
  const [gifts, setGifts] = useState([]);
  const toast = useToast(); // For showing notifications

  useEffect(() => {
    if (wishlistId) {
      fetchGifts(wishlistId);
      updateUserRole(); // Change role to "friend"
    }
  }, [wishlistId]);

  const fetchGifts = async (wishlistId) => {
    try {
      const response = await api.get(`/api/Gift?wishlistId=${wishlistId}`);
      console.log("Shared Wishlist Response:", response.data);
      setGifts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to fetch gifts:", error);
      toast({
        title: "Error",
        description: "Failed to load wishlist.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleReserve = async (giftId) => {
    try {
      await api.post(`/api/Gift/${giftId}/reserve`);
      fetchGifts(wishlistId); // Refresh the list after reserving
      toast({
        title: "Gift Reserved",
        description: "You have successfully reserved this gift.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to reserve gift:", error);
      toast({
        title: "Error",
        description: "Failed to reserve gift.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const updateUserRole = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        await api.post("/api/Auth/set-friend-role", { userId });
        console.log("User role updated to friend.");
      } catch (error) {
        console.error("Failed to update role:", error);
      }
    }
  };

  return (
    <Container centerContent mt={10}>
      <Heading>Shared Wishlist</Heading>
      <GiftList gifts={gifts} onReserve={handleReserve} />
    </Container>
  );
};

export default SharePage;
