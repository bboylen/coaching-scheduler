import React from 'react';
import { Typography, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import { Slot } from '../types';

interface AvailableSlotsProps {
  slots: Slot[];
  onBookSlot: (slotId: number) => Promise<void>;
}

const AvailableSlots: React.FC<AvailableSlotsProps> = ({ slots, onBookSlot }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Coach Availability
      </Typography>
      <List>
        {slots.map(slot => (
          <ListItem key={slot.id} divider>
            <ListItemText
              primary={`${new Date(slot.start_time).toLocaleString()} - ${new Date(slot.end_time).toLocaleString()}`}
              secondary={`Coach: ${slot.coach.name}`}
            />
            <Button variant="contained" onClick={() => onBookSlot(slot.id)}>Book</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default AvailableSlots;
