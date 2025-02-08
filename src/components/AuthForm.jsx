import React, { useState } from "react";
import { Input, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/api/Auth/register", { username, password });
      navigate("/login"); // Redirect to login after registration
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      setError("Registration failed. Try a different username.");
    }
  };

  return (
    <VStack as="form" onSubmit={handleRegister} spacing={4} mt={4}>
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
      bgGradient="linear(to-r, purple.500, blue.400)"
      _hover={{ bgGradient: "linear(to-r, purple.600, blue.500)", transform: "scale(1.05)" }}
      borderRadius="full"
      boxShadow="lg"
      >
        Register
      </Button>
    </VStack>
  );
};

export default RegisterForm;
