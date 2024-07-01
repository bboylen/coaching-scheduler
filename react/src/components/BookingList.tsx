import React, { useState } from 'react';
import { Typography, Box, Grid, Button, Dialog, DialogContent } from '@mui/material';
import { Booking } from '../types';
import CallCompletionForm from './CallCompletionForm';

interface BookingListProps {
  bookings: Booking[];
  onBookingComplete: () => void;
}

const BookingList: React.FC<BookingListProps> = ({ bookings, onBookingComplete }) => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const handleOpenCompletionForm = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const handleCloseCompletionForm = () => {
    setSelectedBooking(null);
    onBookingComplete();
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Upcoming Bookings
      </Typography>
      <Grid container spacing={2}>
        {bookings.map((booking) => (
          <Grid item xs={12} sm={6} md={4} key={booking.id}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "primary.light",
                color: "text.primary",
              }}
            >
              <Typography variant="body2">
                {new Date(booking.slot.start_time).toLocaleString()} -
                {new Date(booking.slot.end_time).toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Booked by: {booking.student.name}
                <br />
                Phone number: {booking.student.phone_number}
              </Typography>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleOpenCompletionForm(booking)}
                sx={{ mt: 1 }}
              >
                Complete Call
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Dialog open={!!selectedBooking} onClose={handleCloseCompletionForm}>
        <DialogContent>
          {selectedBooking && (
            <CallCompletionForm
              booking={selectedBooking}
              onComplete={handleCloseCompletionForm}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default BookingList;
