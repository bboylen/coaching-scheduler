import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { Slot } from '../types';

interface SlotListProps {
  slots: Slot[];
}

const SlotList: React.FC<SlotListProps> = ({ slots }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Your Availability
      </Typography>
      <Grid container spacing={2}>
        {slots.map(slot => (
          <Grid item xs={12} sm={6} md={4} key={slot.id}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'primary.light',
                color: 'text.primary',
              }}
            >
              <Typography variant="body2">
                {new Date(slot.start_time).toLocaleString()} -
                {new Date(slot.end_time).toLocaleString()}
              </Typography>
              {slot.booking && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Booked by: {slot.booking.student.name}
                </Typography>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SlotList;
