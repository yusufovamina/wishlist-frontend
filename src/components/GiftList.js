import React from 'react';
import { List, ListItem, ListItemText, Button, Typography } from '@mui/material';

const GiftList = ({ gifts, onReserve }) => {
  return (
    <List>
      {gifts.map((gift) => (
        <ListItem key={gift.id}>
          <ListItemText
            primary={gift.name}
            secondary={`$${gift.price} - ${gift.category}`}
          />
          {onReserve && (
            <Button onClick={() => onReserve(gift.id)}>Reserve</Button>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default GiftList;