import React from "react";
import { Container, Heading, Button, Text, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate(); 

  const handleWishlistClick = () => {
    const token = localStorage.getItem("token"); 
    navigate(token ? "/wishlist" : "/register");
  };

  return (
    <Container 
      centerContent 
      p={10}
      borderRadius="xl"
      bg="rgba(255, 255, 255, 0.6)"  // Глассморфизм
      backdropFilter="blur(20px)"  
      boxShadow="2xl"
      border="1px solid rgba(255, 255, 255, 0.4)"
      textAlign="center"
      maxW="lg"
      mt="15vh"
      transition="all 0.3s ease-in-out"
      _hover={{ boxShadow: "3xl", transform: "scale(1.02)" }}
    >
      <Heading 
        size="2xl" 
        color="purple.700"
        textShadow="2px 2px 10px rgba(0,0,0,0.15)"
      >
        Welcome to Wishlist App!
      </Heading>
      <Text fontSize="lg" color="gray.700" opacity={0.9} mt={3}>
        Create and share your dream wishlist with friends and family!
      </Text>
      <Button 
        onClick={handleWishlistClick}
        mt={6}
        fontSize="lg"
        px={8}
        py={4}
        bgGradient="linear(to-r, purple.500, blue.400)"
        _hover={{ bgGradient: "linear(to-r, purple.600, blue.500)", transform: "scale(1.07)" }}
        borderRadius="full"
        boxShadow="lg"
        color="white"
        transition="all 0.3s ease-in-out"
      >
        Your Wishlist
      </Button>
      </Container>
  );
};

export default HomePage;
