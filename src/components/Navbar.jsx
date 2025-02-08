import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Text, Spacer, HStack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
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
      <Flex maxW="1200px" mx="auto" align="center">
        {/* Home Button */}
        <HStack spacing={4}> {/* ✅ Добавлен горизонтальный стек с отступом */}
  <Button
    as={Link}
    to="/"
    variant="solid"
    bgGradient="linear(to-r, purple.500, blue.400)"
    color="white"
    _hover={{ bgGradient: "linear(to-r, purple.600, blue.500)" }}
    borderRadius="lg"
  >
    Home
  </Button>

  <Button 
    as={Link} 
    to="/reserved-gifts" 
    bgGradient="linear(to-r, pink.500, purple.600)"
    color="white"
    _hover={{ bgGradient: "linear(to-r, pink.600, purple.700)", transform: "scale(1.05)" }}
    borderRadius="lg"
  >
    My gifts 
  </Button>
</HStack>

        <Spacer />

{/* Centered Wishlist Title */}
<Text fontSize="2xl" fontWeight="bold" color="purple.700" textAlign="center">
  Wishlist
</Text>

        <Spacer />

        {isLoggedIn ? (
          <Button
            onClick={handleLogout}
            bgGradient="linear(to-r, red.400, pink.400)"
            color="white"
            _hover={{ bgGradient: "linear(to-r, red.500, pink.500)" }}
            borderRadius="lg"
          >
            Logout
          </Button>
        ) : (
          <Button
            as={Link}
            to="/login"
            bgGradient="linear(to-r, blue.400, cyan.400)"
            color="white"
            _hover={{ bgGradient: "linear(to-r, blue.500, cyan.500)" }}
            borderRadius="lg"
          >
            Login
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
