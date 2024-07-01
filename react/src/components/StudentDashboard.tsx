import React, { useState, useEffect } from 'react';
import { Box, Paper, Grid } from '@mui/material';
import AvailableSlots from './AvailableSlots';
import StudentBookingList from './StudentBookingList';
import { fetchAvailableSlots, bookSlot, fetchStudentBookings } from '../api';
import { Slot, User, Booking } from '../types';

interface StudentDashboardProps {
  user: User;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user }) => {
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [studentBookings, setStudentBookings] = useState<Booking[]>([]);

  useEffect(() => {
    loadAvailableSlots();
    loadStudentBookings();
  }, [user.id]);

  const loadAvailableSlots = async () => {
    const slots = await fetchAvailableSlots();
    setAvailableSlots(slots);
  };

  const loadStudentBookings = async () => {
    const bookings = await fetchStudentBookings(user.id);
    setStudentBookings(bookings);
  };

  const handleBookSlot = async (slotId: number) => {
    await bookSlot(slotId, user.id);
    loadAvailableSlots();
    loadStudentBookings();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={10}>
          <Paper sx={{ p: 2 }}>
            <AvailableSlots slots={availableSlots} onBookSlot={handleBookSlot} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={10}>
          <Paper sx={{ p: 2 }}>
            <StudentBookingList bookings={studentBookings} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StudentDashboard;
