import React, { useState, useEffect } from "react";
import { 
  Container, Heading, SimpleGrid, Box, Image, Text, VStack, 
  Button, useToast, HStack, IconButton, Modal, ModalOverlay, 
  ModalContent, ModalHeader, ModalBody, ModalFooter, Input 
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import api from "../services/api";
import GiftForm from "../components/GiftForm"; 

const WishlistPage = () => {
  const { sharedUserId } = useParams();
  const [gifts, setGifts] = useState([]);
  const [editingGift, setEditingGift] = useState(null);
  const [editedGift, setEditedGift] = useState({ name: "", price: "", category: "" });
  const toast = useToast();
  const userId = localStorage.getItem("userId"); 
  const isFriend = sharedUserId && sharedUserId !== userId;

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    try {
      const endpoint = sharedUserId ? `/api/Gift/shared/${sharedUserId}` : "/api/Gift/wishlist";
      const response = await api.get(endpoint);
      setGifts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not load wishlist gifts.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (giftId) => {
    try {
      await api.delete(`/api/Gift/${giftId}`);
      toast({ title: "Gift Deleted", status: "success", duration: 3000, isClosable: true });
      fetchGifts();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete the gift.", status: "error", duration: 3000, isClosable: true });
    }
  };

  const handleEdit = (gift) => {
    setEditingGift(gift);
    setEditedGift({ name: gift.name, price: gift.price, category: gift.category });
  };

  const handleSaveEdit = async () => {
    try {
      await api.put(`/api/Gift/${editingGift.id}`, editedGift);
      toast({ title: "Gift Updated", status: "success", duration: 3000, isClosable: true });
      setEditingGift(null);
      fetchGifts();
    } catch (error) {
      toast({ title: "Error updating gift", status: "error", duration: 3000, isClosable: true });
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/wishlist/shared/${userId}`;
    navigator.clipboard.writeText(shareUrl);
    toast({ title: "Link copied to clipboard!", status: "success", duration: 3000, isClosable: true });
  };

  const handleReserve = async (giftId) => {
    try {
      const response = await api.post(`/api/Gift/${giftId}/reserve`);
      toast({ 
        title: "Gift Reserved!", 
        description: `Reserved by ${response.data.reservedBy}`, 
        status: "success", 
        duration: 3000, 
        isClosable: true 
      });
      fetchGifts();
    } catch (error) {
      toast({ 
        title: "Error", 
        description: error.response?.data?.message || "Failed to reserve the gift.", 
        status: "error", 
        duration: 3000, 
        isClosable: true 
      });
    }
  };

  return (
    <Container 
      maxW="container.xl" 
      mt={5} 
      p={5} 
      bg="rgba(255, 255, 255, 0.7)"   
      backdropFilter="blur(20px)"  
      borderRadius="lg" 
      boxShadow="xl"
    >
      <Heading mb={5} textAlign="center" color="purple.700">
        {isFriend ? "Shared Wishlist 🎁" : "My Wishlist 🎁"}
      </Heading>

      {!sharedUserId && <GiftForm onGiftAdded={fetchGifts} />}

      {!sharedUserId && (
        <Button 
          mt={4} 
          onClick={handleShare}
          bgGradient="linear(to-r, purple.400, blue.400)"
          color="white"
          _hover={{ bgGradient: "linear(to-r, purple.500, blue.500)" }}
          borderRadius="lg"
        >
          Share Wishlist 📤
        </Button>
      )}

      {gifts.length === 0 ? (
        <Text textAlign="center" fontSize="lg" color="gray.600" mt={5}>
          No gifts in this wishlist yet.
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5} mt={5}>
          {gifts.map((gift) => (
            <Box 
              key={gift.id} 
              borderWidth="1px" 
              borderRadius="lg" 
              boxShadow="lg" 
              overflow="hidden"
              bg="rgba(255, 255, 255, 0.2)"  // ✅ Glass effect
              backdropFilter="blur(15px)"  
              border="1px solid rgba(255, 255, 255, 0.3)"  
              p={4}
              textAlign="center"
            >
              <Image src={gift.imageUrl || "https://via.placeholder.com/300"} alt={gift.name} objectFit="cover" w="100%" h="200px" borderRadius="lg" />
              <VStack spacing={3} align="stretch">
                <Text fontSize="xl" fontWeight="bold" color="purple.800">{gift.name}</Text>
                <Text fontSize="md" color="purple.600">{gift.category}</Text>
                <Text fontSize="lg" fontWeight="bold" color="blue.600">${gift.price}</Text>

                {gift.wishlistId !== userId && gift.reservedByUsername && (
                  <Text fontSize="sm" color="red.500">
                    Reserved by {gift.reservedByUsername === localStorage.getItem("username") ? "You" : gift.reservedByUsername}
                  </Text>
                )}

                {gift.wishlistId === userId ? (
                  <HStack>
                    <IconButton icon={<FaEdit />} colorScheme="yellow" onClick={() => handleEdit(gift)} />
                    <IconButton icon={<FaTrash />} colorScheme="red" onClick={() => handleDelete(gift.id)} />
                  </HStack>
                ) : (
                  <Button 
                    colorScheme="blue"  
                    onClick={() => handleReserve(gift.id)}
                    bgGradient="linear(to-r, blue.400, cyan.400)"
                    _hover={{ bgGradient: "linear(to-r, blue.500, cyan.500)" }}
                    borderRadius="lg"
                  >
                    Reserve Gift 🎁
                  </Button>
                )}
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      )} <Modal isOpen={!!editingGift} onClose={() => setEditingGift(null)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Gift</ModalHeader>
        <ModalBody>
          <Input 
            placeholder="Name" 
            value={editedGift.name} 
            onChange={(e) => setEditedGift({ ...editedGift, name: e.target.value })} 
            mb={3}
          />
          <Input 
            placeholder="Price" 
            type="number"
            value={editedGift.price} 
            onChange={(e) => setEditedGift({ ...editedGift, price: parseFloat(e.target.value) || 0 })} 
            mb={3}
          />
          <Input 
            placeholder="Category" 
            value={editedGift.category} 
            onChange={(e) => setEditedGift({ ...editedGift, category: e.target.value })} 
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSaveEdit} colorScheme="blue">Save</Button>
          <Button onClick={() => setEditingGift(null)} ml={3}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </Container>
);
};

export default WishlistPage;
