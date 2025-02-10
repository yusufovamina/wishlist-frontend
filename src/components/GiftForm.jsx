import React, { useState } from "react";
import { Input, Button, VStack, useToast, Spinner } from "@chakra-ui/react";
import api from "../services/api";

const GiftForm = ({ onGiftAdded, setIsLoading, isLoading }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const toast = useToast();

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Начинаем анимацию загрузки
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast({
          title: "Unauthorized",
          description: "Please log in to add a gift.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false); // Завершаем загрузку в случае ошибки
        return;
      }

      // Создаем FormData для отправки изображения
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("price", parseFloat(price));
      formData.append("category", category);
      if (image) {
        formData.append("imageFile", image);
      }

      console.log("📤 Sending FormData:", formData);

      const giftResponse = await api.post("/api/Gift", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Уведомление об успешном добавлении
      toast({
        title: "Gift Added",
        description: "Gift has been successfully added!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Очистка формы и обновление списка подарков
      setName("");
      setPrice("");
      setCategory("");
      setImage(null);
      onGiftAdded(); // Обновляем список подарков
    } catch (error) {
      console.error("❌ Error adding gift:", error.response?.data || error.message);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to add gift.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false); // Завершаем загрузку в любом случае
    }
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} spacing={4} mt={4}>
      <Input
        placeholder="Gift Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <Input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <Input type="file" accept="image/*" onChange={handleImageChange} />
      <Button type="submit" colorScheme="blue" isLoading={isLoading}>
        {isLoading ? <Spinner size="sm" /> : "Add Gift"} {/* Показываем спиннер */}
      </Button>
    </VStack>
  );
};

export default GiftForm;
