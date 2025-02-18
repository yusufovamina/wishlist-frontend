import React, { useState } from "react";
import { Input, Button, VStack, useToast, Text, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  // Проверки для пароля
  const isLengthValid = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  // Все ли условия выполнены
  const isPasswordValid = isLengthValid && hasUppercase && hasLowercase && hasNumber;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (!isPasswordValid) {
      setError("Password does not meet the requirements.");
      setIsLoading(false);
      return;
    }

    try {
      await api.post("/api/Auth/register", {
        username,
        passwordHash: password,
        role: "user",
      });

      toast({
        title: "Account Created",
        description: "Registration successful! You can now log in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      setError("Registration failed. Try a different username.");

      toast({
        title: "Registration Failed",
        description: err.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack as="form" onSubmit={handleRegister} spacing={4} mt={4} align="stretch">
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
      
       <Input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Box fontSize="sm" color="gray.600">
        <Text color={isLengthValid ? "green.500" : "red.500"}>
          {isLengthValid ? "✔" : "✖"} At least 8 characters
        </Text>
        <Text color={hasUppercase ? "green.500" : "red.500"}>
          {hasUppercase ? "✔" : "✖"} At least one uppercase letter
        </Text>
        <Text color={hasLowercase ? "green.500" : "red.500"}>
          {hasLowercase ? "✔" : "✖"} At least one lowercase letter
        </Text>
        <Text color={hasNumber ? "green.500" : "red.500"}>
          {hasNumber ? "✔" : "✖"} At least one number
        </Text>
      </Box>

    

      {/* Ошибка, если пароли не совпадают */}
      {error && <Text color="red.500">{error}</Text>}

      <Button 
        type="submit" 
        color="white" 
        mt={5}
        fontSize="lg"
        px={6}
        py={3}
        bgGradient="linear(to-r, purple.500, blue.400)"
        _hover={{ bgGradient: "linear(to-r, purple.600, blue.500)", transform: "scale(1.05)" }}
        borderRadius="full"
        boxShadow="lg"
        isLoading={isLoading}
        isDisabled={!isPasswordValid} 
      >
        Register
      </Button>
    </VStack>
  );
};

export default RegisterForm;
