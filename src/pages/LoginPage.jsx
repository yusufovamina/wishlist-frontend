import React, { useState } from "react";
import { Container, Heading, Input, Button, VStack, useToast } from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/api/Auth/login", {
        username,
        passwordHash: password, // Backend expects "passwordHash"
        role: "user",
      });
      console.log("🔍 Login API Response:", response.data); 
      const token = response.data.Token || response.data.token;
      
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);  // ✅ Store userId
        localStorage.setItem("username", response.data.username);// ✅ Store userId
        console.log("✅ User ID stored:", response.data.userId);
     
      navigate("/wishlist");

      toast({
        title: "Logged in successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error("❌ Login failed:", err.response?.data || err.message);
      setError("Invalid username or password.");
    }
  };

  return (
    <Container 
    centerContent 
    p={8} 
    borderRadius="lg"
    bg="rgba(255, 255, 255, 0.7)"  // Прозрачный белый фон
    backdropFilter="blur(20px)"  // Размытие
    boxShadow="xl" 
    border="1px solid rgba(255, 255, 255, 0.3)" // Полупрозрачная обводка
    textAlign="center"
    maxW="md" // Ограничиваем ширину контейнера
    mt="10vh" 
   >
      <Heading size="2xl" color="purple.700" textShadow="1px 1px 8px rgba(0,0,0,0.2)">Login</Heading>
      <VStack as="form" onSubmit={handleLogin} spacing={4} mt={4}>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button type="submit" 
        color="white" 
        mt={5}
        fontSize="lg"
        px={6}
        py={3}
        bgGradient="linear(to-r, pink.300, purple.600)"
        _hover={{ bgGradient: "linear(to-r, pink.300, purple.700)", transform: "scale(1.05)" }}
        borderRadius="full"
        boxShadow="lg">
          Login
        </Button>
        <Button as={Link} to="/register" colorScheme="gray" variant="outline">
          Create Account
        </Button>
      </VStack>
    </Container>
  );
};

export default LoginPage;
