import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Text, HStack, IconButton, useMediaQuery } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaGift } from "react-icons/fa"; 

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery("(max-width: 768px)"); 

  
  useEffect(() => {
    const updateAuthStatus = () => setIsLoggedIn(!!localStorage.getItem("token"));

    window.addEventListener("storage", updateAuthStatus);

    return () => {
      window.removeEventListener("storage", updateAuthStatus);
    };
  }, []);

  
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [localStorage.getItem("token")]); // Отслеживаем изменение токена

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <Box
      bgGradient="linear(to-r, rgba(180, 160, 255, 0.8), rgba(140, 210, 255, 0.8))"
      backdropFilter="blur(10px)"
      p={4}
      boxShadow="md"
    >
      <Flex maxW="1200px" mx="auto" align="center" position="relative">
        {/* Левая часть - Home и My Gifts */}
        <HStack spacing={4} position="absolute" left="0">
          <IconButton
            as={Link}
            to="/"
            icon={<FaHome />}
            aria-label="Home"
            bgGradient="linear(to-r, purple.500, blue.400)"
            color="white"
            _hover={{ bgGradient: "linear(to-r, purple.600, blue.500)" }}
            borderRadius="lg"
          />

          <IconButton
            as={Link}
            to="/reserved-gifts"
            icon={<FaGift />}
            aria-label="My Gifts"
            bgGradient="linear(to-r, pink.500, purple.600)"
            color="white"
            _hover={{ bgGradient: "linear(to-r, pink.600, purple.700)", transform: "scale(1.05)" }}
            borderRadius="lg"
          />
        </HStack>

        {/* Центр - Заголовок */}
        <Box flex="1" textAlign="center">
          <Text fontSize="4xl" fontWeight="bold" color="purple.700">
            Wishlist
          </Text>
        </Box>

        <HStack spacing={4}>
          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              bgGradient="linear(to-r, red.400, pink.400)"
              color="white"
              _hover={{ bgGradient: "linear(to-r, red.500, pink.500)", transform: "scale(1.1)" }}
              borderRadius="lg"
              px={6}
              transition="all 0.2s ease-in-out"
            >
              Logout
            </Button>
          ) : (
            <Button
              as={Link}
              to="/login"
              bgGradient="linear(to-r, blue.400, cyan.400)"
              color="white"
              _hover={{ bgGradient: "linear(to-r, blue.500, cyan.500)", transform: "scale(1.1)" }}
              borderRadius="lg"
              px={6}
              transition="all 0.2s ease-in-out"
            >
              Login
            </Button>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
