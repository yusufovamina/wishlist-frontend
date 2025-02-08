import React from "react";
import { List, ListItem, Button, Heading, Text } from "@chakra-ui/react";


const GiftList = ({ gifts, onReserve }) => {
  if (!Array.isArray(gifts) || gifts.length === 0) {
    return <Heading size="md">No gifts available.</Heading>;
  }

  return (
    <List spacing={3} width="100%">
      {gifts.map((gift) => (
        <ListItem key={gift.id || gift._id} display="flex" justifyContent="space-between">
        <Text fontWeight="bold">{gift.name || "Unnamed Gift"}</Text>
        <Text fontSize="sm">{`$${gift.price !== null ? gift.price : "N/A"} - ${gift.category || "No Category"}`}</Text>
        {onReserve && (
          <Button colorScheme="blue" onClick={() => onReserve(gift.id || gift._id)}>
            Reserve
          </Button>
        )}
      </ListItem>
      
      ))}
    </List>
  );
};

export default GiftList;
