import React from 'react';
import { Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import { Booking } from '../types';

interface StudentBookingListProps {
  bookings: Booking[];
}

const StudentBookingList: React.FC<StudentBookingListProps> = ({ bookings }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Your Bookings
      </Typography>
      <List>
        {bookings.map(booking => (
          <ListItem key={booking.id} divider>
            <ListItemText
              primary={`${new Date(booking.slot.start_time).toLocaleString()} - ${new Date(booking.slot.end_time).toLocaleString()}`}
              secondary={`Coach: ${booking.slot.coach.name}, Phone: ${booking.slot.coach.phone_number}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default StudentBookingList;
