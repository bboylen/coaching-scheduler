import React, { useState, useEffect } from "react";
import { Typography, Grid, Paper, Box } from "@mui/material";
import SlotCreator from "./SlotCreator";
import SlotList from "./SlotList";
import BookingList from "./BookingList";
import CompletedCallsList from "./CompletedCallsList";
import { fetchCoachSlots, createSlot, fetchCoachBookings } from "../api";
import { Slot, User, Booking } from "../types";

interface CoachDashboardProps {
  user: User;
}

const CoachDashboard: React.FC<CoachDashboardProps> = ({ user }) => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [completedCalls, setCompletedCalls] = useState<Booking[]>([]);

  useEffect(() => {
    loadSlots();
    loadBookings();
  }, [user]);

  const loadSlots = async () => {
    const fetchedSlots = await fetchCoachSlots(user.id);
    setSlots(fetchedSlots);
  };

  const loadBookings = async () => {
    const fetchedBookings = await fetchCoachBookings(user.id);
    const bookings = fetchedBookings.filter((booking) => !booking.completed);
    const completedCalls = fetchedBookings.filter((booking) => booking.completed);
    setBookings(bookings);
    setCompletedCalls(completedCalls);
  };

  const handleCreateSlot = async (slotData: Omit<Slot, "id">) => {
    await createSlot(slotData);
    loadSlots();
  };

  const handleBookingComplete = () => {
    loadBookings();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <SlotCreator coachId={user.id} onCreateSlot={handleCreateSlot} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={10}>
          <Paper sx={{ p: 2 }}>
            <SlotList slots={slots} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={10}>
          <Paper sx={{ p: 2 }}>
            <BookingList
              bookings={bookings}
              onBookingComplete={handleBookingComplete}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={10}>
          <Paper sx={{ p: 2 }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Completed Calls
              </Typography>
                <CompletedCallsList completedCalls={completedCalls} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CoachDashboard;
