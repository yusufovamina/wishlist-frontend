import React from "react";
import { Container, Heading, Button, Text, Box } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate(); // Хук для перенаправления

  const handleWishlistClick = () => {
    const token = localStorage.getItem("token"); // Проверяем, есть ли токен
    if (token) {
      navigate("/wishlist"); // Если пользователь авторизован → в вишлист
    } else {
      navigate("/register"); // Если нет → на регистрацию
    }
  };

  return (
    <Container 
      centerContent 
      p={8} 
      borderRadius="lg"
      bg="rgba(255, 255, 255, 0.8)"  // Прозрачный белый фон
      backdropFilter="blur(20px)"  // Размытие
      boxShadow="xl" 
      border="1px solid rgba(255, 255, 255, 0.3)" // Полупрозрачная обводка
      textAlign="center"
      maxW="md" // Умеренная ширина контейнера
      mt="10vh" // Смещение вниз, чтобы был по центру
    >
      <Heading size="2xl" color="purple.700" textShadow="1px 1px 8px rgba(0,0,0,0.2)">
        Welcome to Wishlist App! 
      </Heading>
      <Text fontSize="lg" color="gray.800" opacity={0.9} mt={3}>
        Create and share your dream wishlist with friends and family!
      </Text>
      <Button 
        onClick={handleWishlistClick} // ⬅ Проверяем, куда перенаправлять
        color="white" 
        mt={5}
        fontSize="lg"
        px={6}
        py={3}
        bgGradient="linear(to-r, purple.500, blue.400)"
        _hover={{ bgGradient: "linear(to-r, purple.600, blue.500)", transform: "scale(1.05)" }}
        borderRadius="full"
        boxShadow="lg"
      >
        Your Wishlist
      </Button>
    </Container>
  );
};

export default HomePage;
