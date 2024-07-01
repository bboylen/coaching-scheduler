import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { Booking } from '../types';

interface CompletedCallsListProps {
  completedCalls: Booking[];
}

const CompletedCallsList: React.FC<CompletedCallsListProps> = ({ completedCalls }) => {
  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        {completedCalls.map(call => (
          <Grid item xs={12} sm={6} md={4} key={call.id}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'primary.light',
                color: 'text.primary',
              }}
            >
              <Typography variant="body2">
                Date: {new Date(call.slot.start_time).toLocaleDateString()}
              </Typography>
              <Typography variant="body2">
                Student: {call.student.name}
              </Typography>
              <Typography variant="body2">
                Satisfaction Rating: {call.satisfaction_rating}
              </Typography>
              <Typography variant="body2">
                Notes: {call.notes}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CompletedCallsList;
