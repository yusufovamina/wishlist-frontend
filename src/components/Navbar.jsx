import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Text, HStack, IconButton, useMediaQuery } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaGift } from "react-icons/fa"; // Иконки дома и подарка

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery("(max-width: 768px)"); // Проверяем, мобильное ли устройство

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
      <Flex maxW="1200px" mx="auto" align="center" position="relative">
        {/* Левая часть - Home и My Gifts */}
        <HStack spacing={4} position="absolute" left="0">
          {/* Home Button (текст или иконка) */}
          <IconButton
            as={Link}
            to="/"
            icon={<FaHome />} // 🏠 Иконка дома
            aria-label="Home"
            bgGradient="linear(to-r, purple.500, blue.400)"
            color="white"
            _hover={{ bgGradient: "linear(to-r, purple.600, blue.500)" }}
            borderRadius="lg"
          />

          {/* My Gifts Button (иконка подарка 🎁) */}
          <IconButton
            as={Link}
            to="/reserved-gifts"
            icon={<FaGift />} // 🎁 Иконка подарка
            aria-label="My Gifts"
            bgGradient="linear(to-r, pink.500, purple.600)"
            color="white"
            _hover={{ bgGradient: "linear(to-r, pink.600, purple.700)", transform: "scale(1.05)" }}
            borderRadius="lg"
          />
        </HStack>

        {/* Центр - Заголовок */}
        <Box flex="1" textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" color="purple.700">
            Wishlist
          </Text>
        </Box>

        {/* Правая часть - Login / Logout */}
        <HStack position="absolute" right="0">
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
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
