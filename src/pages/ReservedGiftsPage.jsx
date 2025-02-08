import React, { useEffect, useState } from "react";
import { Container, Heading, SimpleGrid, Box, Image, Text, VStack, Button, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import api from "../services/api";

const ReservedGiftsPage = () => {
  const [reservedGifts, setReservedGifts] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchReservedGifts();
  }, []);

  const fetchReservedGifts = async () => {
    try {
      const response = await api.get("/api/Gift/reserved");
      setReservedGifts(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not load reserved gifts.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const cancelReservation = async (giftId) => {
    try {
      await api.post(`/api/Gift/${giftId}/cancel-reserve`);
      toast({
        title: "Reservation Cancelled",
        description: "You have unreserved the gift.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchReservedGifts(); // Обновляем список после отмены резерва
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel reservation.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.xl" mt={5} p={5}>
      <Heading mb={5} textAlign="center" color="purple.700">
        Gifts I Will Give 🎁
      </Heading>

      {reservedGifts.length === 0 ? (
        <Text textAlign="center" fontSize="lg" color="gray.600" mt={5}>
          You haven't reserved any gifts yet.
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5} mt={5}>
          {reservedGifts.map((gift) => (
            <Box 
              key={gift.id} 
              borderWidth="1px" 
              borderRadius="lg" 
              boxShadow="lg" 
              p={4} 
              textAlign="center"
              bg="rgba(255, 255, 255, 0.15)"
              backdropFilter="blur(20px)"
              border="1px solid rgba(255, 255, 255, 0.3)"
            >
              <Image src={gift.imageUrl || "https://via.placeholder.com/300"} alt={gift.name} w="100%" h="200px" />
              <VStack spacing={3} align="stretch">
                <Text fontSize="xl" fontWeight="bold">{gift.name}</Text>
                <Text fontSize="md">{gift.category}</Text>
                <Text fontSize="lg" fontWeight="bold">${gift.price}</Text>
                <Button 
                  as={Link} 
                  to={`/wishlist/shared/${gift.wishlistId}`} // Ссылка на shared wishlist
                  colorScheme="blue"
                  variant="outline"
                >
                  View Wishlist
                </Button>
                <Button 
                  colorScheme="red" 
                  onClick={() => cancelReservation(gift.id)}
                >
                  Cancel Reservation
                </Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default ReservedGiftsPage;
