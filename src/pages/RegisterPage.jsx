import React from "react";
import { Container, Heading, Box } from "@chakra-ui/react";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <Container 
      centerContent 
      p={8} 
      borderRadius="lg"
      bg="rgba(255, 255, 255, 0.6)"  // Прозрачный белый фон
      backdropFilter="blur(20px)"  // Размытие
      boxShadow="xl" 
      border="1px solid rgba(255, 255, 255, 0.3)" // Полупрозрачная обводка
      textAlign="center"
      maxW="md" // Ограничиваем ширину контейнера
      mt="10vh" // Смещение вниз для центрирования
    >
      <Heading size="2xl" color="purple.700" textShadow="1px 1px 8px rgba(0,0,0,0.2)">
        Create Your Account 
      </Heading>
      <RegisterForm />
    </Container>
  );
};

export default RegisterPage;
